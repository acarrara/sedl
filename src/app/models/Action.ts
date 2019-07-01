import {Lord} from './Lord';
import {Region} from './Region';
import {Board} from './Board';

interface SuperAction {

  name();
}

export interface TriggeredAction extends SuperAction {

  run(rulingLord: Lord, ruledLord: Lord, index: number);

  isTriggered(rulingLord: Lord, ruledLord: Lord, index: number);
}

export interface PassiveAction {

  run(lord: Lord);
}

export interface ActiveAction extends SuperAction {

  can(lord: Lord, region: Region);

  run(lord: Lord, region: Region);

  cost(region: Region);

  triggered(): TriggeredAction[];
}

export class ColonizeAction implements ActiveAction {

  cost(region: Region) {
    return region.cost();
  }

  public can(lord: Lord, region: Region) {
    return !region.belongsTo(lord) &&
      lord.canTame() &&
      lord.canReach(region) &&
      lord.treasure >= this.cost(region);
  }

  public run(lord: Lord, region: Region) {
    lord.treasure -= this.cost(region);
    const newRegion = region.tamedBy(lord);
    lord.board.change(region, newRegion);
    lord.board.updateNeighbourhood(newRegion);
  }

  name() {
    return 'Colonize';
  }

  triggered(): TriggeredAction[] {
    return [];
  }
}

export class ConquerAction implements ActiveAction {

  constructor(private triggeredActions: TriggeredAction[]) {
  }

  cost(region: Region) {
    return region.conquerCost();
  }

  name() {
    return 'Conquer';
  }

  run(lord: Lord, region: Region) {
    lord.treasure -= this.cost(region);
    const newRegion = region.tamedBy(lord);
    lord.board.change(region, newRegion);
    lord.board.updateNeighbourhood(newRegion);
  }

  can(lord: Lord, region: Region) {
    return !region.impregnable && !region.belongsTo(lord) &&
      lord.canTame() &&
      lord.canReach(region) &&
      lord.treasure >= this.cost(region);
  }

  triggered(): TriggeredAction[] {
    return this.triggeredActions;
  }
}

export class EmptyAction implements ActiveAction {

  cost(region: Region) {
    return 0;
  }

  can(lord: Lord, region: Region) {
    return false;
  }

  run(lord: Lord, region: Region) {
    // do nothing
  }

  name() {
    return 'Reach';
  }

  triggered(): TriggeredAction[] {
    return [];
  }
}

export class FortifyAction implements ActiveAction {

  cost(region: Region) {
    return region.cost();
  }

  can(lord: Lord, region: Region) {
    return !region.sustenance &&
      !region.impregnable &&
      region.isFortifiable() &&
      region.belongsTo(lord) &&
      lord.canReach(region) &&
      lord.treasure >= this.cost(region);
  }

  run(lord: Lord, region: Region) {
    lord.treasure -= region.sustenanceCost();
    region.sustenance = true;
  }

  name() {
    return 'Fortify';
  }

  triggered(): TriggeredAction[] {
    return [];
  }
}

export class HarvestAction implements PassiveAction {

  run(lord: Lord) {
    const worth = lord.worth();
    const harvested = lord.rushed ? Math.floor(worth / 2) : worth;
    lord.treasure += harvested;
    lord.rushed = false;
  }

  name() {
    return 'Harvest';
  }
}

export class SustainAction implements PassiveAction {

  run(lord: Lord) {
    if (lord.debt() > lord.treasure) {
      this.abandonFortifications(lord);
    }
    lord.treasure = Math.max(lord.treasure - lord.debt(), 0);
  }

  private abandonFortifications(lord: Lord) {
    lord.board.regions.filter(region => region.sustenance && region.isFortifiable() && region.belongsTo(lord))
      .forEach(region => region.sustenance = false);
  }

  name() {
    return 'Sustain';
  }
}

export class WithdrawAction implements ActiveAction {

  cost(region: Region) {
    return 0;
  }

  can(lord: Lord, region: Region) {
    return region.belongsTo(lord) &&
      lord.canReach(region) &&
      region.isFortifiable() &&
      region.sustenance;
  }

  run(lord: Lord, region: Region) {
    region.sustenance = false;
  }

  name() {
    return 'Withdraw';
  }

  triggered(): TriggeredAction[] {
    return [];
  }
}

export class SettleAction implements ActiveAction {

  cost(region: Region) {
    return 0;
  }

  can(lord: Lord, region: Region) {
    return region.isFortifiable() && region.belongsTo(lord) && lord.canSettle();
  }

  name() {
    return 'Settle';
  }

  run(lord: Lord, region: Region) {
    lord.board.change(region, region.settle());
    lord.availableSettlements--;
  }

  triggered(): TriggeredAction[] {
    return [];
  }
}

export class DesertAction implements PassiveAction {

  name() {
    return 'Desert';
  }

  run(lord: Lord) {
    lord.board.regions.filter(region => region.impregnable && region.belongsTo(lord))
      .forEach(region => region.impregnable = false);
    lord.board.regions.filter(region => region.sustenance && region.belongsTo(lord) && !lord.canReach(region))
      .forEach(region => region.sustenance = false);
  }
}

export class RushAction implements ActiveAction {
  can(lord: Lord, region: Region) {
    return !lord.rushed;
  }

  cost(region: Region) {
    return 0;
  }

  name() {
    return 'Rush';
  }

  run(lord: Lord, region: Region) {
    lord.treasure += Math.floor(lord.worth() / 5);
    lord.rushed = true;
  }

  triggered(): TriggeredAction[] {
    return [];
  }
}

export class RuleAction implements TriggeredAction {

  name() {
    'Rule';
  }

  run(rulingLord: Lord, ruledLord: Lord, index: number) {
    const board: Board = rulingLord.board;
    board.getDomain(index, ruledLord).forEach(current => {
      const region = board.regions[current];
      const newRegion = region.tamedBy(rulingLord);
      board.change(region, newRegion);
      board.updateNeighbourhood(newRegion);
    });
  }

  isTriggered(rulingLord: Lord, ruledLord: Lord, index: number) {
    const {board: {regions: {[index]: region}}, board} = rulingLord;
    return region.isSettlement() &&
      !board.reachableBy(ruledLord, region);
  }
}
