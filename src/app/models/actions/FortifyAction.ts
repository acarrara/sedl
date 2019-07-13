import {ActiveAction} from './ActiveAction';
import {Region} from '../Region';
import {Lord} from '../Lord';
import {TriggeredAction} from './TriggeredAction';

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
