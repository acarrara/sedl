import {ActiveAction} from './ActiveAction';
import {Region} from '../Region';
import {Lord} from '../Lord';
import {TriggeredAction} from './TriggeredAction';

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
