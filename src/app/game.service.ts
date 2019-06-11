import {Injectable} from '@angular/core';
import {Lord} from './models/Lord';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from './models/Region';
import {board, lords} from './models/game';
import {Actions} from './models/Actions';

@Injectable()
export class GameService {

  private lordIndex = 0;

  private regionsSubject: BehaviorSubject<Region[]> = new BehaviorSubject(board.regions);
  private lordSubject: BehaviorSubject<Lord> = new BehaviorSubject(lords[0]);

  public readonly regions$: Observable<Region[]> = this.regionsSubject.asObservable();
  public readonly lord$: Observable<Lord> = this.lordSubject.asObservable();

  public lords: Lord[] = lords;

  action(i: number) {
    if (this.currentLord().activeAction(i)) {
      this.regionsSubject.next(board.regions);
    }
  }

  public start() {
    this.lordIndex = -1;
    this.pass();
  }

  public pass(): void {
    this.lordIndex = (this.lordIndex + 1) % lords.length;
    Actions.getPassiveActions().forEach(action => this.currentLord().passiveAction(action));
    this.lordSubject.next(this.currentLord());
  }

  currentLord() {
    return this.lords[this.lordIndex];
  }

  public seeds(): string[] {
    return board.world;
  }

  public dimension(): number {
    return Math.sqrt(board.regions.length);
  }

  lordAt(i: number) {
    const lordId = this.regionsSubject.getValue()[i].lord;
    if (lordId === 'u') {
      return Lord.UNKNOWN;
    }
    const lordIndex = this.lords.findIndex(lord => lord.id === lordId);
    return this.lords[lordIndex];
  }

  sustenanceAt(i: number) {
    return this.regionsSubject.getValue()[i].sustenance;
  }
}
