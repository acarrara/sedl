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
      lordIndex: game.lordIndex
    }, (key, value) => key === 'board' ? undefined : value));
  }

  public load(): Game {
    if (localStorage.getItem(StorageService.SEDL_KEY) !== null) {
      const loaded: any = JSON.parse(localStorage.getItem(StorageService.SEDL_KEY));
      const {lords, world, politics, lordIndex} = loaded;
      return new Game(
        new Board(world, politics),
        lords.map(current =>
          new Lord(current.id, current.name, current.color, current.treasure, current.rushed, current.availableSettlements)),
        lordIndex);
    }
    return game3();
  }
}
