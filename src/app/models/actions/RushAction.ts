import {ActiveAction} from './ActiveAction';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {TriggeredAction} from './TriggeredAction';

export class RushAction implements ActiveAction {

  public can(lord: Lord, region: Region) {
    return !lord.rushed;
  }

  public cost(region: Region) {
    return 0;
  }

  public name() {
    return 'Rush';
  }

  public run(lord: Lord, region: Region) {
    lord.treasure += Math.floor(lord.worth() / 5);
    lord.rushed = true;
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'R';
  }
}
