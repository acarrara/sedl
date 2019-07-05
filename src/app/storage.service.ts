import {Injectable} from '@angular/core';
import {Game} from './models/Game';
import {Lord} from './models/Lord';
import {Board} from './models/Board';
import {game3} from './data/game3';

@Injectable()
export class StorageService {

  private static SEDL_GAME_KEY = 'sedl.game';
  private static SEDL_HISTORY_KEY = 'sedl.history';

  public save(game: Game): void {
    localStorage.setItem(StorageService.SEDL_GAME_KEY, JSON.stringify({
      lords: game.lords,
      world: game.board.world,
      politics: game.board.regions.map(region => region.lord)
    }, (key, value) => key === 'board' ? undefined : value));
  }

  public saveHistory(history: string[]) {
    localStorage.setItem(StorageService.SEDL_HISTORY_KEY, JSON.stringify(history));
  }

  public load(): Game {
    if (localStorage.getItem(StorageService.SEDL_GAME_KEY) !== null) {
      const loaded: any = JSON.parse(localStorage.getItem(StorageService.SEDL_GAME_KEY));
      const {lords, world, politics} = loaded;
      const game = new Game(
        new Board(world, politics),
        lords.map(current =>
          new Lord(current.id, current.name, current.color, current.treasure, current.rushed, current.availableSettlements)),
        0,
        []);
      game.history = JSON.parse(localStorage.getItem(StorageService.SEDL_HISTORY_KEY));
      game.applyHistory();
      return game;
    }
    const defaultGame = game3();
    this.save(defaultGame);
    return defaultGame;
  }
}
