import {PassiveAction} from './PassiveAction';
import {Lord} from '../Lord';

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
