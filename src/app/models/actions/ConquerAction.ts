import {ActiveAction} from './ActiveAction';
import {TriggeredAction} from './TriggeredAction';
import {Region} from '../Region';
import {Lord} from '../Lord';

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
