import {Injectable} from '@angular/core';
import {Lord} from './models/Lord';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from './models/Region';
import {WorthOf} from './models/resources';
import {board, lords} from './models/game';

@Injectable()
export class GameService {

  private lordIndex = 0;

  private regionsSubject: BehaviorSubject<Region[]> = new BehaviorSubject(board.regions);
  private lordSubject: BehaviorSubject<Lord> = new BehaviorSubject(lords[0]);

  public readonly regions$: Observable<Region[]> = this.regionsSubject.asObservable();
  public readonly lord$: Observable<Lord> = this.lordSubject.asObservable();

  public lords: Lord[] = lords;

  conquer(i: number) {
    if (board.conquer(i, this.currentLord())) {
      this.regionsSubject.next(board.regions);
    }
  }

  public pass(): void {
    this.harvest();
    this.lordIndex = (this.lordIndex + 1) % lords.length;
    this.lordSubject.next(lords[this.lordIndex]);
  }

  private currentLord() {
    return this.lordSubject.getValue();
  }

  private harvest() {
    this.currentLord().treasure =
      this.regionsSubject.getValue()
        .filter(region => region.lord === this.currentLord().id)
        .map(region => WorthOf(region.type))
        .reduce((previousValue, currentValue) => previousValue + currentValue, this.currentLord().treasure);
  }

  public seeds(): string[] {
    return board.map;
  }

  public dimension(): number {
    return Math.sqrt(board.regions.length);
  }
}
