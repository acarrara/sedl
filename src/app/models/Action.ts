import {Board} from './Board';
import {Lord} from './Lord';

export interface Action {

  can(lord: Lord, board: Board, i: number);

  run(lord: Lord, board: Board, i?: number);

  name();

}

export class ColonizeAction implements Action {

  public can(lord: Lord, board: Board, i: number) {
    const region = board.regions[i];
    return !region.belongsTo(lord) &&
      lord.canTame() &&
      board.reachableBy(lord, i) &&
      lord.treasure >= region.cost();
  }

  public run(lord: Lord, board: Board, i: number) {
    const region = board.regions[i];
    lord.treasure -= region.cost();
    board.regions[i] = region.tamedBy(lord);
    board.updateNeighbourhood(i);
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
    lord.treasure -= region.conquerCost();
    board.regions[i] = region.tamedBy(lord);
    board.updateNeighbourhood(i);
  }

  can(lord: Lord, board: Board, i: number) {
    const region = board.regions[i];
    return !region.belongsTo(lord) &&
      lord.canTame() &&
      board.reachableBy(lord, i) &&
      lord.treasure >= region.conquerCost();
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
    return region.belongsTo(lord) &&
      board.reachableBy(lord, i) &&
      region.isFortifiable() &&
      !region.sustenance &&
      lord.treasure >= region.cost();
  }

  run(lord: Lord, board: Board, i: number) {
    lord.treasure -= board.regions[i].sustenanceCost();
    board.regions[i].sustenance = true;
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
      .filter(region => region.belongsTo(lord))
      .map(region => region.worth())
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
      .filter(region => region.belongsTo(lord) && region.sustenance)
      .map(region => region.sustenanceCost())
      .reduce((previousValue, currentValue) => previousValue - currentValue, lord.treasure);
  }

  name() {
    return 'Sustain';
  }
}

export class WithdrawAction implements Action {
  can(lord: Lord, board: Board, i: number) {
    return board.regions[i].belongsTo(lord) &&
      board.reachableBy(lord, i) &&
      board.regions[i].isFortifiable() &&
      board.regions[i].sustenance;
  }

  run(lord: Lord, board: Board, i?: number) {
    board.regions[i].sustenance = false;
  }

  name() {
    return 'Withdraw';
  }
}

export class SettleAction implements Action {
  can(lord: Lord, board: Board, i: number) {
    const region = board.regions[i];
    return region.isFortifiable() && region.belongsTo(lord) && lord.canSettle();
  }

  name() {
    return 'Settle';
  }

  run(lord: Lord, board: Board, i?: number) {
    board.regions[i] = board.regions[i].settle();
    board.world[i] = 's';
  }
}
