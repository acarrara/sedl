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

  private store: Store = new LocalStore();

  public save(game: Game): void {
    this.store.save(StorageService.SEDL_GAME_KEY, JSON.stringify({
      lords: game.lords,
      world: game.board.world,
      politics: game.board.regions.map(region => region.lord)
    }, (key, value) => key === 'board' ? undefined : value));
  }

  public saveHistory(history: string[]) {
    this.store.save(StorageService.SEDL_HISTORY_KEY, JSON.stringify(history));
  }

  public load(): Game {
    if (this.store.has(StorageService.SEDL_GAME_KEY)) {
      const loaded: any = JSON.parse(this.store.load(StorageService.SEDL_GAME_KEY));
      const {lords, world, politics} = loaded;
      const game = new Game(
        new Board(world, politics),
        lords.map(current =>
          new Lord(current.id, current.name, current.color, current.treasure, current.rushed, current.availableSettlements)),
        0,
        []);
      game.history = JSON.parse(this.store.load(StorageService.SEDL_HISTORY_KEY));
      return game;
    }
    const defaultGame = game3();
    this.save(defaultGame);
    return defaultGame;
  }
}
