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

  shortName(): string;
}

export class ColonizeAction implements ActiveAction {

  public cost(region: Region) {
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

  public name() {
    return 'Colonize';
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'L';
  }
}

export class ConquerAction implements ActiveAction {

  constructor(private triggeredActions: TriggeredAction[]) {
  }

  public cost(region: Region) {
    return region.conquerCost();
  }

  public name() {
    return 'Conquer';
  }

  public run(lord: Lord, region: Region) {
    lord.treasure -= this.cost(region);
    const newRegion = region.tamedBy(lord);
    lord.board.change(region, newRegion);
    lord.board.updateNeighbourhood(newRegion);
  }

  public can(lord: Lord, region: Region) {
    return !region.impregnable && !region.belongsTo(lord) &&
      lord.canTame() &&
      lord.canReach(region) &&
      lord.treasure >= this.cost(region);
  }

  public triggered(): TriggeredAction[] {
    return this.triggeredActions;
  }

  public shortName(): string {
    return 'Q';
  }
}

export class EmptyAction implements ActiveAction {

  public cost(region: Region) {
    return 0;
  }

  public can(lord: Lord, region: Region) {
    return false;
  }

  public run(lord: Lord, region: Region) {
    // do nothing
  }

  public name() {
    return 'Reach';
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'E';
  }
}

export class FortifyAction implements ActiveAction {

  public cost(region: Region) {
    return region.cost();
  }

  public can(lord: Lord, region: Region) {
    return !region.sustenance &&
      !region.impregnable &&
      region.isFortifiable() &&
      region.belongsTo(lord) &&
      lord.canReach(region) &&
      lord.treasure >= this.cost(region);
  }

  public run(lord: Lord, region: Region) {
    lord.treasure -= region.sustenanceCost();
    region.sustenance = true;
  }

  public name() {
    return 'Fortify';
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'F';
  }
}

export class HarvestAction implements PassiveAction {

  public run(lord: Lord) {
    const worth = lord.worth();
    const harvested = lord.rushed ? Math.floor(worth / 2) : worth;
    lord.treasure += harvested;
    lord.rushed = false;
  }

  public name() {
    return 'Harvest';
  }
}

export class SustainAction implements PassiveAction {

  public run(lord: Lord) {
    if (lord.debt() > lord.treasure) {
      this.abandonFortifications(lord);
    }
    lord.treasure = Math.max(lord.treasure - lord.debt(), 0);
  }

  public name() {
    return 'Sustain';
  }

  private abandonFortifications(lord: Lord) {
    lord.board.regions.filter(region => region.sustenance && region.isFortifiable() && region.belongsTo(lord))
      .forEach(region => region.sustenance = false);
  }
}

export class WithdrawAction implements ActiveAction {

  public cost(region: Region) {
    return 0;
  }

  public can(lord: Lord, region: Region) {
    return region.belongsTo(lord) &&
      lord.canReach(region) &&
      region.isFortifiable() &&
      region.sustenance;
  }

  public run(lord: Lord, region: Region) {
    region.sustenance = false;
  }

  public name() {
    return 'Withdraw';
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'W';
  }
}

export class SettleAction implements ActiveAction {

  public cost(region: Region) {
    return 0;
  }

  public can(lord: Lord, region: Region) {
    return region.isFortifiable() && region.belongsTo(lord) && lord.canSettle();
  }

  public name() {
    return 'Settle';
  }

  public run(lord: Lord, region: Region) {
    lord.board.change(region, region.settle());
    lord.availableSettlements--;
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'S';
  }
}

export class DesertAction implements PassiveAction {

  public name() {
    return 'Desert';
  }

  public run(lord: Lord) {
    lord.board.regions.filter(region => region.impregnable && region.belongsTo(lord))
      .forEach(region => region.impregnable = false);
    lord.board.regions.filter(region => region.sustenance && region.belongsTo(lord) && !lord.canReach(region))
      .forEach(region => region.sustenance = false);
  }
}

export class RushAction implements ActiveAction {
  public can(lord: Lord, region: Region) {
    return !lord.rushed;
  }

  public cost(region: Region) {
    return 0;
  }

  public name() {
    return 'Rush';
  }

  public run(lord: Lord, region: Region) {
    lord.treasure += Math.floor(lord.worth() / 5);
    lord.rushed = true;
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'R';
  }
}

export class RuleAction implements TriggeredAction {

  public name() {
    'Rule';
  }

  public run(rulingLord: Lord, ruledLord: Lord, index: number) {
    const board: Board = rulingLord.board;
    board.getDomain(index, ruledLord).forEach(current => {
      const region = board.regions[current];
      const newRegion = region.tamedBy(rulingLord);
      board.change(region, newRegion);
      board.updateNeighbourhood(newRegion);
    });
  }

  public isTriggered(rulingLord: Lord, ruledLord: Lord, index: number) {
    const {board: {regions: {[index]: region}}, board} = rulingLord;
    return region.isSettlement() &&
      !board.reachableBy(ruledLord, region);
  }
}

export class PassAction implements ActiveAction {

  public can(lord: Lord, region: Region) {
    return true;
  }

  public cost(region: Region) {
    return 0;
  }

  public name() {
    'Pass';
  }

  public run(lord: Lord, region: Region) {
  }

  public shortName(): string {
    return 'P';
  }

  public triggered(): TriggeredAction[] {
    return [];
  }
}
