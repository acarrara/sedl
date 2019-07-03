import {Injectable} from '@angular/core';
import {Game} from './models/Game';
import {Lord} from './models/Lord';
import {Board} from './models/Board';
import {game3} from './data/game3';

@Injectable()
export class StorageService {

  private static SEDL_KEY = 'sedl.game';

  public save(game: Game): void {
    localStorage.setItem(StorageService.SEDL_KEY, JSON.stringify({
      lords: game.lords,
      world: game.board.world,
      politics: game.board.regions.map(region => region.lord),
      lordIndex: game.lordIndex,
      history: game.history,
      details: game.board.regions.map(region => ({impregnable: region.impregnable, sustenance: region.sustenance}))
    }, (key, value) => key === 'board' ? undefined : value));
  }

  public load(): Game {
    if (localStorage.getItem(StorageService.SEDL_KEY) !== null) {
      const loaded: any = JSON.parse(localStorage.getItem(StorageService.SEDL_KEY));
      const {lords, world, politics, lordIndex, history, details} = loaded;
      const game = new Game(
        new Board(world, politics),
        lords.map(current =>
          new Lord(current.id, current.name, current.color, current.treasure, current.rushed, current.availableSettlements)),
        lordIndex,
        history);
      game.board.regions.forEach((region, index) => ({
        impregnable: region.impregnable,
        sustenance: region.sustenance
      } = details[index]));
      return game;
    }
    return game3();
  }
}
