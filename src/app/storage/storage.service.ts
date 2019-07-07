import {Injectable} from '@angular/core';
import {Game} from '../models/Game';
import {Board} from '../models/Board';
import {Lord} from '../models/Lord';
import {game3} from '../data/game3';
import {Store} from './Store';
import {LocalStore} from './LocalStore';

@Injectable()
export class StorageService {

  private static SEDL_GAME_KEY = 'sedl.game';
  private static SEDL_HISTORY_KEY = 'sedl.history';
  private static SEDL_CUSTOM_KEY_PREFIX = 'sedl.custom.';

  private store: Store = new LocalStore();

  public save(game: Game): void {
    this.saveWithKey(StorageService.SEDL_GAME_KEY, game);
  }

  private saveWithKey(key: string, game: Game) {
    this.store.save(key, JSON.stringify({
      name: game.name,
      lords: game.lords,
      world: game.board.world,
      politics: game.board.regions.map(region => region.lord)
    }, (current, value) => current === 'board' ? undefined : value));
  }

  public saveHistory(history: string[]) {
    this.store.save(StorageService.SEDL_HISTORY_KEY, JSON.stringify(history));
  }

  public load(): Game {
    if (this.store.has(StorageService.SEDL_GAME_KEY)) {
      const game = this.loadWithKey(StorageService.SEDL_GAME_KEY);
      game.history = JSON.parse(this.store.load(StorageService.SEDL_HISTORY_KEY));
      return game;
    }
    const defaultGame = game3();
    this.save(defaultGame);
    return defaultGame;
  }

  private loadWithKey(key: string) {
    const loaded: any = JSON.parse(this.store.load(key));
    const {name, lords, world, politics} = loaded;
    const game = new Game(
      name,
      new Board(world, politics),
      lords.map(current =>
        new Lord(current.id, current.name, current.color, current.treasure, current.rushed, current.availableSettlements)),
      0,
      []);
    return game;
  }

  saveCreatedGame(game: Game) {
    this.saveWithKey(StorageService.SEDL_CUSTOM_KEY_PREFIX + game.name, game);
  }

  loadCreatedGames(): Game[] {
    return this.store.keys()
      .filter(key => key.startsWith(StorageService.SEDL_CUSTOM_KEY_PREFIX))
      .map(key => this.loadWithKey(key));
  }
}
