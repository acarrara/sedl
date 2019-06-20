import {Injectable} from '@angular/core';
import {Lord} from './models/Lord';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from './models/Region';
import {Actions} from './models/Actions';
import {Game} from './models/Game';

@Injectable()
export class GameService {

  public regions$: Observable<Region[]>;
  public lord$: Observable<Lord>;
  public actions$: Observable<any>;
  public game$: Observable<Game>;

  private regionsSubject: BehaviorSubject<Region[]>;
  private lordSubject: BehaviorSubject<Lord>;
  private actionsSubject: BehaviorSubject<any>;
  private gameSubject: BehaviorSubject<Game>;

  private lordIndex = 0;
  private game: Game;

  public action(region: Region) {
    if (this.currentLord().activeAction(region)) {
      this.regionsSubject.next(this.game.board.regions);
      this.actionsSubject.next({});
    }
  }

  public newGame(game: Game) {
    this.gameSubject.next(game);
    this.lordSubject.next(game.lords[0]);
    this.regionsSubject.next(game.board.regions);
  }

  public start(game: Game) {
    this.game = game;
    this.regionsSubject = new BehaviorSubject(game.board.regions);
    this.lordSubject = new BehaviorSubject(game.lords[0]);
    this.actionsSubject = new BehaviorSubject({});
    this.gameSubject = new BehaviorSubject(game);
    this.regions$ = this.regionsSubject.asObservable();
    this.lord$ = this.lordSubject.asObservable();
    this.actions$ = this.actionsSubject.asObservable();
    this.game$ = this.gameSubject.asObservable();
    this.newGame(game);
    this.lordIndex = -1;
    this.pass();
  }

  public pass(): void {
    this.lordIndex = (this.lordIndex + 1) % this.game.lords.length;
    if (!this.currentLord().canPlay()) {
      const winnerIndex = (this.lordIndex + 1) % this.game.lords.length;
      this.gameSubject.getValue().winner = this.game.lords[winnerIndex];
    }
    Actions.getPassiveActions().forEach(action => this.currentLord().passiveAction(action));
    this.lordSubject.next(this.currentLord());
    this.actionsSubject.next(this.currentLord());
  }

  public lordAt(region: Region) {
    const lordId = region.lord;
    if (lordId === 'u') {
      return Lord.UNKNOWN;
    }
    const lordIndex = this.game.lords.findIndex(lord => lord.id === lordId);
    return this.game.lords[lordIndex];
  }

  public settle(region: Region) {
    if (this.currentLord().settle(region)) {
      this.regionsSubject.next(this.game.board.regions);
      this.actionsSubject.next({});
    }
  }

  public rush() {
    if (this.currentLord().rush()) {
      this.actionsSubject.next({});
    }
  }

  private currentLord() {
    return this.game.lords[this.lordIndex];
  }
}
