import {Injectable} from '@angular/core';
import {Lord} from './models/Lord';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from './models/Region';
import {Game} from './models/Game';
import {Actions} from './models/Actions';
import {Log} from './models/Log';
import {StorageService} from './storage/storage.service';

@Injectable()
export class GameService {

  public regions$: Observable<Region[]>;
  public lord$: Observable<Lord>;
  public actions$: Observable<Log>;
  public game$: Observable<Game>;

  private regionsSubject: BehaviorSubject<Region[]>;
  private lordSubject: BehaviorSubject<Lord>;
  private actionsSubject: BehaviorSubject<Log>;
  private gameSubject: BehaviorSubject<Game>;

  private game: Game;

  constructor(private storage: StorageService) {
    this.regionsSubject = new BehaviorSubject(null);
    this.lordSubject = new BehaviorSubject(null);
    this.actionsSubject = new BehaviorSubject(null);
    this.gameSubject = new BehaviorSubject(null);

    this.regions$ = this.regionsSubject.asObservable();
    this.lord$ = this.lordSubject.asObservable();
    this.actions$ = this.actionsSubject.asObservable();
    this.game$ = this.gameSubject.asObservable();
  }

  public load(): void {
    this.game = this.storage.load();
    this.game.applyHistory();
  }

  public action(region: Region) {
    const regionLord: Lord = this.game.lordAt(region);
    const index = this.game.board.regions.indexOf(region);
    const activeAction = this.game.currentLord().activeActionOn(region);
    const activeActionRun = this.game.currentLord().activeAction(region, regionLord);
    if (activeActionRun) {
      this.regionsSubject.next(this.game.board.regions);
      this.actionsSubject.next(new Log(this.game.currentLord().id, activeAction, index));
    }
  }

  public newGame(game: Game) {
    this.game = game;
    this.gameSubject.next(game);
    this.lordSubject.next(game.lords[0]);
    this.regionsSubject.next(game.board.regions);
    this.actionsSubject.next(null);
    this.storage.save(game);
  }

  public start() {
    this.load();
    this.gameSubject.next(this.game);
    this.regionsSubject.next(this.game.board.regions);
    this.lordSubject.next(this.game.currentLord());
  }

  public pass(): void {
    this.actionsSubject.next(new Log(this.game.currentLord().id, Actions.PASS));
    this.storage.saveHistory(this.game.history);
    this.game.pass();
    this.lordSubject.next(this.game.currentLord());
  }

  public settle(region: Region) {
    const index = this.game.board.regions.indexOf(region);
    if (this.game.currentLord().settle(region)) {
      this.regionsSubject.next(this.game.board.regions);
      this.actionsSubject.next(new Log(this.game.currentLord().id, Actions.SETTLE, index));
    }
  }

  public rush() {
    if (this.game.currentLord().rush()) {
      this.actionsSubject.next(new Log(this.game.currentLord().id, Actions.RUSH));
    }
  }
}
