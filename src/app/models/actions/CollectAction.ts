import {PassiveAction} from './PassiveAction';
import {Lord} from '../Lord';

export class CollectAction implements PassiveAction {

  public run(lord: Lord) {
    const worth = lord.worth();
    const collected = lord.rushed ? Math.floor(worth / 2) : worth;
    lord.treasure += collected;
    lord.rushed = false;
  }

  public name() {
    return 'Collect';
  }
}
