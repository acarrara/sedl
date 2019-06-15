import {Region} from './Region';
import {Actions} from './Actions';
import {Board} from './Board';
import {ActiveAction, PassiveAction} from './Action';

export class Lord {

  public static UNKNOWN: Lord = new Lord('u', 'unknown', 'unknown', 0, null);

  private static REGIONS_PER_SETTLEMENT = 100;

  availableSettlements = 2;

  constructor(public id: string, public name: string, public color: string, public treasure: number, public board: Board) {
  }

  activeActionOn(region: Region) {
    if (this.board.getNeighbours(region).every(neighbour => !neighbour.belongsTo(this))) {
      return Actions.EMPTY;
    } else if (region.lord === Region.UNCHARTED.lord) {
      return Actions.COLONIZE;
    } else if (region.belongsTo(this) && !region.sustenance) {
      return Actions.FORTIFY;
    } else if (region.belongsTo(this) && region.sustenance) {
      return Actions.WITHDRAW;
    } else {
      return Actions.CONQUER;
    }
  }

  public activeAction(region: Region) {
    const action: ActiveAction = this.activeActionOn(region);
    const canAct = action.can(this, region);
    if (canAct) {
      this.runAction(action, region);
    }
    return canAct;
  }

  public passiveAction(action: PassiveAction) {
    action.run(this);
  }

  private runAction(action: ActiveAction, region: Region) {
    action.run(this, region);
  }

  canTame() {
    const tamedRegions = this.board.regions.filter(region => region.belongsTo(this));
    const settlements = tamedRegions.filter(region => region.isSettlement()).length;
    return tamedRegions.length < settlements * Lord.REGIONS_PER_SETTLEMENT;
  }

  canReach(region: Region) {
    return this.board.reachableBy(this, region);
  }

  settle(region: Region) {
    const canAct = Actions.SETTLE.can(this, region);
    if (canAct) {
      this.runAction(Actions.SETTLE, region);
    }
    return canAct;
  }

  canSettle(): boolean {
    return this.availableSettlements > 0;
  }

  canPlay(): boolean {
    return this.board.regions.some(region => region.isSettlement() && region.belongsTo(this));
  }

  worth() {
    return this.board.regions
      .filter(region => region.belongsTo(this) && this.canReach(region))
      .map(region => region.worth())
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  debt() {
    return this.board.regions
      .filter(region => region.sustenance && region.belongsTo(this))
      .map(region => region.sustenanceCost())
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  settlements() {
    return this.board.regions
      .filter(region => region.isSettlement() && region.belongsTo(this))
      .reduce(previousValue => previousValue + 1, 0);
  }
}
