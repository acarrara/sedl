import {Board} from './Board';
import {Lord} from './Lord';
import {costOf, sustenanceOf, worthOf} from './resources';

export interface Action {

  can(lord: Lord, board: Board, i: number);

  run(lord: Lord, board: Board, i?: number);

  name();

}

export class ColonizeAction implements Action {

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

  name() {
    return 'Colonize';
  }
}

export class ConquerAction implements Action {

  name() {
    return 'Conquer';
  }

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

export class EmptyAction implements Action {
  can(lord: Lord, board: Board, i: number) {
    return false;
  }

  run(lord: Lord, board: Board, i: number) {
    // do nothing
  }

  name() {
    return 'Unreachable';
  }
}

export class FortifyAction implements Action {
  can(lord: Lord, board: Board, i: number) {
    const region = board.regions[i];
    return region.type !== 'w' && !region.sustenance && lord.treasure >= costOf(region);
  }

  run(lord: Lord, board: Board, i: number) {
    lord.treasure -= sustenanceOf(board.regions[i]);
    board.regions[i].sustenance = true;
    board.rebuildGrid();
  }

  name() {
    return 'Fortify';
  }
}

export class HarvestAction implements Action {
  can(lord: Lord, board: Board, i: number) {
    return true;
  }

  run(lord: Lord, board: Board, i: number) {
    lord.treasure = board.regions
      .filter(region => region.lord === lord.id)
      .map(region => worthOf(region.type))
      .reduce((previousValue, currentValue) => previousValue + currentValue, lord.treasure);
  }

  name() {
    return 'Harvest';
  }
}


export class SustainAction implements Action {
  can(lord: Lord, board: Board, i: number) {
    return true;
  }

  run(lord: Lord, board: Board, i: number) {
    lord.treasure = board.regions
      .filter(region => region.lord === lord.id && region.sustenance)
      .map(region => costOf(region))
      .reduce((previousValue, currentValue) => previousValue - currentValue, lord.treasure);
  }

  name() {
    return 'Sustain';
  }
}

export class WithdrawAction implements Action {
  can(lord: Lord, board: Board, i: number) {
    return board.regions[i].lord === lord.id && board.regions[i].type !== 's' && board.regions[i].sustenance;
  }

  run(lord: Lord, board: Board, i?: number) {
    board.regions[i].sustenance = false;
  }

  name() {
    return 'Withdraw';
  }
}
