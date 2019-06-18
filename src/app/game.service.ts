import {Injectable} from '@angular/core';
import {Lord} from './models/Lord';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from './models/Region';
import {Actions} from './models/Actions';
import {Board} from './models/Board';
import {Game} from './models/Game';

@Injectable()
export class GameService {

  public board: Board;
  public lords: Lord[];

  private lordIndex = 0;

  private regionsSubject: BehaviorSubject<Region[]>;
  private lordSubject: BehaviorSubject<Lord>;
  private actionsSubject: BehaviorSubject<any>;

  public regions$: Observable<Region[]>;
  public lord$: Observable<Lord>;
  public actions$: Observable<any>;


  action(region: Region) {
    if (this.currentLord().activeAction(region)) {
      this.regionsSubject.next(this.board.regions);
      this.actionsSubject.next({});
    }
  }

  newGame(game: Game) {
    this.board = game.board;
    this.lords = game.lords;
    this.regionsSubject = new BehaviorSubject(this.board.regions);
    this.lordSubject = new BehaviorSubject(this.lords[0]);
    this.actionsSubject = new BehaviorSubject(null);
    this.regions$ = this.regionsSubject.asObservable();
    this.lord$ = this.lordSubject.asObservable();
    this.actions$ = this.actionsSubject.asObservable();
  }

  public start(game: Game) {
    this.newGame(game);
    this.lordIndex = -1;
    this.pass();
  }

  public pass(): void {
    this.lordIndex = (this.lordIndex + 1) % this.lords.length;
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
      this.regionsSubject.next(this.board.regions);
      this.actionsSubject.next({});
    }
  }

  rush() {
    if (this.currentLord().rush()) {
      this.actionsSubject.next({});
    }
  }
}
