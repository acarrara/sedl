import {Board} from './Board';
import {Lord} from './Lord';
import {costOf, sustenanceOf, worthOf} from './resources';

export abstract class Action {

  public abstract can(lord: Lord, board: Board, i: number);

  public abstract run(lord: Lord, board: Board, i?: number);

}

export class ColonizeAction extends Action {

  public can(lord: Lord, board: Board, i: number) {
    return board.regions[i].lord !== lord.id &&
      board.getNeighbours(i).some(region => region.lord === lord.id) &&
      lord.treasure >= costOf(board.regions[i]);
  }

  public run(lord: Lord, board: Board, i: number) {
    lord.treasure -= costOf(board.regions[i]);
    board.regionsAsStrings[i] = lord.id;
    board.updateRegions(i);
  }
}

export class ConquerAction extends Action {

  run(lord: Lord, board: Board, i: number) {
    const region = board.regions[i];
    lord.treasure -= costOf(region) * 2;
    board.regionsAsStrings[i] = lord.id;
    if (region.type !== 's') {
      region.sustenance = false;
    }
    board.updateRegions(i);
  }

  can(lord: Lord, board: Board, i: number) {
    return board.regions[i].lord !== lord.id &&
      board.getNeighbours(i).some(region => region.lord === lord.id) &&
      lord.treasure >= costOf(board.regions[i]) * 2;
  }
}

export class EmptyAction extends Action {
  can(lord: Lord, board: Board, i: number) {
    return false;
  }

  run(lord: Lord, board: Board, i: number) {
    // do nothing
  }
}

export class FortifyAction extends Action {
  can(lord: Lord, board: Board, i: number) {
    return !board.regions[i].sustenance && lord.treasure >= costOf(board.regions[i]);
  }

  run(lord: Lord, board: Board, i: number) {
    lord.treasure -= sustenanceOf(board.regions[i]);
    board.regions[i].sustenance = true;
    board.rebuildGrid();
  }
}

export class HarvestAction extends Action {
  can(lord: Lord, board: Board, i: number) {
    return true;
  }

  run(lord: Lord, board: Board, i: number) {
    lord.treasure = board.regions
      .filter(region => region.lord === lord.id)
      .map(region => worthOf(region.type))
      .reduce((previousValue, currentValue) => previousValue + currentValue, lord.treasure);
  }
}


export class SustainAction extends Action {
  can(lord: Lord, board: Board, i: number) {
    return true;
  }

  run(lord: Lord, board: Board, i: number) {
    lord.treasure = board.regions
      .filter(region => region.lord === lord.id && region.sustenance)
      .map(region => costOf(region))
      .reduce((previousValue, currentValue) => previousValue - currentValue, lord.treasure);
  }
}

export class WithdrawAction extends Action {
  can(lord: Lord, board: Board, i: number) {
    return board.regions[i].lord === lord.id && board.regions[i].type !== 's' && board.regions[i].sustenance;
  }

  run(lord: Lord, board: Board, i?: number) {
    board.regions[i].sustenance = false;
  }
}
