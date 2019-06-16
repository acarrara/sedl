import {Injectable} from '@angular/core';
import {Lord} from './models/Lord';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from './models/Region';
import {board, lords} from './models/game';
import {Actions} from './models/Actions';
import {Board} from './models/Board';

@Injectable()
export class GameService {

  private lordIndex = 0;

  private regionsSubject: BehaviorSubject<Region[]> = new BehaviorSubject(board.regions);
  private lordSubject: BehaviorSubject<Lord> = new BehaviorSubject(lords[0]);
  private actionsSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  public readonly regions$: Observable<Region[]> = this.regionsSubject.asObservable();
  public readonly lord$: Observable<Lord> = this.lordSubject.asObservable();
  public readonly actions$: Observable<any> = this.actionsSubject.asObservable();

  public lords: Lord[] = lords;

  public board: Board = board;

  action(region: Region) {
    if (this.currentLord().activeAction(region)) {
      this.regionsSubject.next(this.board.regions);
      this.actionsSubject.next({});
    }
  }

  public start() {
    this.lordIndex = -1;
    this.pass();
  }

  public pass(): void {
    this.lordIndex = (this.lordIndex + 1) % lords.length;
    if (!this.currentLord().canPlay()) {
      console.log('You Lost!');
    }
    Actions.getPassiveActions().forEach(action => this.currentLord().passiveAction(action));
    this.lordSubject.next(this.currentLord());
    this.actionsSubject.next(this.currentLord());
  }

  currentLord() {
    return this.lords[this.lordIndex];
  }

  public world(): string[] {
    return this.board.world;
  }

  public dimension(): number {
    return Math.sqrt(this.board.regions.length);
  }

  lordAt(region: Region) {
    const lordId = region.lord;
    if (lordId === 'u') {
      return Lord.UNKNOWN;
    }
    const lordIndex = this.lords.findIndex(lord => lord.id === lordId);
    return this.lords[lordIndex];
  }

  settle(region: Region) {
    if (this.currentLord().settle(region)) {
      this.regionsSubject.next(board.regions);
      this.actionsSubject.next({});
    }
  }

  rush() {
    if (this.currentLord().rush()) {
      this.actionsSubject.next({});
    }
  }
}
