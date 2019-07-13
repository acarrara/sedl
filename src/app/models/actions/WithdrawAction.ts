import {ActiveAction} from './ActiveAction';
import {Region} from '../Region';
import {Lord} from '../Lord';
import {TriggeredAction} from './TriggeredAction';

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
