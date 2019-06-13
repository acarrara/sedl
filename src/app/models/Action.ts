import {Board} from './Board';
import {Lord} from './Lord';
import {Region} from './Region';

interface SuperAction {

  name();
}

export interface PassiveAction {

  run(lord: Lord, board: Board);
}

export interface ActiveAction extends SuperAction {

  can(lord: Lord, board: Board, region: Region);

  run(lord: Lord, board: Board, region: Region);

}

export class ColonizeAction implements ActiveAction {

  public can(lord: Lord, board: Board, region: Region) {
    return !region.belongsTo(lord) &&
      lord.canTame() &&
      board.reachableBy(lord, region) &&
      lord.treasure >= region.cost();
  }

  public run(lord: Lord, board: Board, region: Region) {
    lord.treasure -= region.cost();
    const newRegion = region.tamedBy(lord);
    board.change(region, newRegion);
    board.updateNeighbourhood(newRegion);
  }

  name() {
    return 'Colonize';
  }
}

export class ConquerAction implements ActiveAction {

  name() {
    return 'Conquer';
  }

  run(lord: Lord, board: Board, region: Region) {
    lord.treasure -= region.conquerCost();
    const newRegion = region.tamedBy(lord);
    board.change(region, newRegion);
    board.updateNeighbourhood(newRegion);
  }

  can(lord: Lord, board: Board, region: Region) {
    return !region.impregnable && !region.belongsTo(lord) &&
      lord.canTame() &&
      board.reachableBy(lord, region) &&
      lord.treasure >= region.conquerCost();
  }
}

export class EmptyAction implements ActiveAction {
  can(lord: Lord, board: Board, region: Region) {
    return false;
  }

  run(lord: Lord, board: Board, region: Region) {
    // do nothing
  }

  name() {
    return 'Reach';
  }
}

export class FortifyAction implements ActiveAction {
  can(lord: Lord, board: Board, region: Region) {
    return region.belongsTo(lord) &&
      board.reachableBy(lord, region) &&
      region.isFortifiable() &&
      !region.sustenance &&
      lord.treasure >= region.cost();
  }

  run(lord: Lord, board: Board, region: Region) {
    lord.treasure -= region.sustenanceCost();
    region.sustenance = true;
  }

  name() {
    return 'Fortify';
  }
}

export class HarvestAction implements PassiveAction {

  run(lord: Lord, board: Board) {
    lord.treasure = board.regions
      .filter(region => region.belongsTo(lord) && board.reachableBy(lord, region))
      .map(region => region.worth())
      .reduce((previousValue, currentValue) => previousValue + currentValue, lord.treasure);
  }

  name() {
    return 'Harvest';
  }
}


export class SustainAction implements PassiveAction {

  run(lord: Lord, board: Board) {
    let sustenanceCosts = this.calculateSustenanceCosts(board, lord);
    if (sustenanceCosts > lord.treasure) {
      this.abandonFortifications(board, lord);
      sustenanceCosts = this.calculateSustenanceCosts(board, lord);
    }
    lord.treasure = Math.max(lord.treasure - sustenanceCosts, 0);
  }

  private abandonFortifications(board: Board, lord: Lord) {
    board.regions.filter(region => region.sustenance && region.isFortifiable() && region.belongsTo(lord))
      .forEach(region => region.sustenance = false);
  }

  private calculateSustenanceCosts(board: Board, lord: Lord) {
    return board.regions
      .filter(region => region.sustenance && region.belongsTo(lord))
      .map(region => region.sustenanceCost())
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  name() {
    return 'Sustain';
  }
}

export class WithdrawAction implements ActiveAction {
  can(lord: Lord, board: Board, region: Region) {
    return region.belongsTo(lord) &&
      board.reachableBy(lord, region) &&
      region.isFortifiable() &&
      region.sustenance;
  }

  run(lord: Lord, board: Board, region: Region) {
    region.sustenance = false;
  }

  name() {
    return 'Withdraw';
  }
}

export class SettleAction implements ActiveAction {
  can(lord: Lord, board: Board, region: Region) {
    return region.isFortifiable() && region.belongsTo(lord) && lord.canSettle();
  }

  name() {
    return 'Settle';
  }

  run(lord: Lord, board: Board, region: Region) {
    board.change(region, region.settle());
    lord.availableSettlements--;
  }
}

export class DesertAction implements PassiveAction {

  name() {
    return 'Desert';
  }

  run(lord: Lord, board: Board) {
    board.regions.filter(region => region.impregnable && region.belongsTo(lord))
      .forEach(region => region.impregnable = false);
    board.regions.filter(region => region.sustenance && region.belongsTo(lord) && !board.reachableBy(lord, region))
      .forEach(region => region.sustenance = false);
  }
}
