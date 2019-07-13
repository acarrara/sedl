import {PassiveAction} from './PassiveAction';
import {Lord} from '../Lord';

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
