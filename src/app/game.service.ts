import {Injectable} from '@angular/core';
import {Lord} from './models/Lord';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from './models/Region';
import {Game} from './models/Game';
import {StorageService} from './storage.service';

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

  private game: Game;

  constructor(private storage: StorageService) {
  }

  public load(): void {
    this.game = this.storage.load();

    this.regionsSubject = new BehaviorSubject(this.game.board.regions);
    this.lordSubject = new BehaviorSubject(this.game.lords[0]);
    this.actionsSubject = new BehaviorSubject({});
    this.gameSubject = new BehaviorSubject(this.game);

    this.regions$ = this.regionsSubject.asObservable();
    this.lord$ = this.lordSubject.asObservable();
    this.actions$ = this.actionsSubject.asObservable();
    this.game$ = this.gameSubject.asObservable();
  }

  public action(region: Region) {
    const regionLord: Lord = this.game.lordAt(region);
    if (this.game.currentLord().activeAction(region, regionLord)) {
      this.regionsSubject.next(this.game.board.regions);
      this.actionsSubject.next({});
    }
  }

  public newGame(game: Game) {
    this.game = game;
    this.gameSubject.next(game);
    this.lordSubject.next(game.lords[0]);
    this.regionsSubject.next(game.board.regions);
  }

  public start() {
    this.load();
    this.lordSubject.next(this.game.currentLord());
    this.actionsSubject.next(this.game.currentLord());
    this.storage.save(this.game);
  }

  public pass(): void {
    this.game.pass();
    this.lordSubject.next(this.game.currentLord());
    this.actionsSubject.next(this.game.currentLord());
    this.storage.save(this.game);
  }

  public settle(region: Region) {
    if (this.game.currentLord().settle(region)) {
      this.regionsSubject.next(this.game.board.regions);
      this.actionsSubject.next({});
    }
  }

  public rush() {
    if (this.game.currentLord().rush()) {
      this.actionsSubject.next({});
    }
  }
}
