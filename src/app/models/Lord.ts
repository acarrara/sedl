import {Region} from './Region';
import {Actions} from './Actions';
import {Board} from './Board';
import {Action} from './Action';

export class Lord {

  public static UNKNOWN: Lord = new Lord('u', 'unknown', 'unknown', 0, null);

  private static REGIONS_PER_SETTLEMENT = 100;
  private static MAX_SETTLEMENTS = 3;

  constructor(public id: string, public name: string, public color: string, public treasure: number, public board: Board) {
  }

  activeActionOn(i: number) {
    const region = this.board.regions[i];
    if (this.board.getNeighbours(i).every(neighbour => !neighbour.belongsTo(this))) {
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

  public activeAction(i: number) {
    const action: Action = this.activeActionOn(i);
    const canAct = action.can(this, this.board, i);
    if (canAct) {
      this.runAction(action, i);
    }
    return canAct;
  }

  public passiveAction(action: Action) {
    action.run(this, this.board);
  }

  private runAction(action: Action, i?: number) {
    action.run(this, this.board, i);
  }

  canTame() {
    const tamedRegions = this.board.regions.filter(region => region.belongsTo(this));
    const settlements = tamedRegions.filter(region => region.is('s')).length;
    return tamedRegions.length < settlements * Lord.REGIONS_PER_SETTLEMENT;
  }

  settle(i: number) {
    const canAct = Actions.SETTLE.can(this, this.board, i);
    if (canAct) {
      this.runAction(Actions.SETTLE, i);
    }
    return canAct;
  }

  canSettle() {
    return this.board.regions.filter(region => region.belongsTo(this) && region.is('s')).length < Lord.MAX_SETTLEMENTS;
  }
}
