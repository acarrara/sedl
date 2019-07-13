import {Region} from './Region';
import {Actions} from './actions/Actions';
import {Board} from './Board';
import {PassiveAction} from './actions/PassiveAction';
import {ActiveAction} from './actions/ActiveAction';

export class Lord {

  public static UNKNOWN: Lord = new Lord('u');

  private static REGIONS_PER_SETTLEMENT = 100;

  public board: Board;

  constructor(public id: string,
              public name = 'unknown',
              public color = 'unknown',
              public treasure = 0,
              public rushed = false,
              public availableSettlements = 2) {
  }

  public activeActionOn(region: Region) {
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

  public activeAction(region: Region, anotherLord: Lord) {
    const action: ActiveAction = this.activeActionOn(region);
    const canAct = action.can(this, region);
    if (canAct) {
      this.runAction(action, region, anotherLord);
    }
    return canAct;
  }

  public passiveAction(action: PassiveAction) {
    action.run(this);
  }

  public canTame() {
    const tamedRegions = this.board.regions.filter(region => region.belongsTo(this));
    const settlements = tamedRegions.filter(region => region.isSettlement()).length;
    return tamedRegions.length < settlements * Lord.REGIONS_PER_SETTLEMENT;
  }

  public canReach(region: Region) {
    return this.board.reachableBy(this, region);
  }

  public settle(region: Region) {
    const canAct = Actions.SETTLE.can(this, region);
    if (canAct) {
      this.runAction(Actions.SETTLE, region);
    }
    return canAct;
  }

  public canSettle(): boolean {
    return this.availableSettlements > 0;
  }

  public rush() {
    const canAct = Actions.RUSH.can(this, undefined);
    if (canAct) {
      this.runAction(Actions.RUSH, undefined);
    }
    return canAct;
  }

  public canPlay(): boolean {
    return this.board.regions.some(region => region.isSettlement() && region.belongsTo(this));
  }

  public worth() {
    return this.board.regions
      .filter(region => region.belongsTo(this) && this.canReach(region))
      .map(region => region.worth())
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  public debt() {
    return this.board.regions
      .filter(region => region.sustenance && region.belongsTo(this))
      .map(region => region.sustenanceCost())
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  public settlements() {
    return this.board.regions
      .filter(region => region.isSettlement() && region.belongsTo(this))
      .reduce(previousValue => previousValue + 1, 0);
  }

  public canRush() {
    return Actions.RUSH.can(this, undefined);
  }

  private runAction(action: ActiveAction, region: Region, currentLord?: Lord) {
    const index = this.board.regions.indexOf(region);
    action.run(this, region);

    action.triggered()
      .filter(current => current.isTriggered(this, currentLord, index))
      .forEach(current => current.run(this, currentLord, index));
  }
}
