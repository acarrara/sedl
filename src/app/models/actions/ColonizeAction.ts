import {ActiveAction} from './ActiveAction';
import {Region} from '../Region';
import {Lord} from '../Lord';
import {TriggeredAction} from './TriggeredAction';

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
