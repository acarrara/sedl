import {ActiveAction} from './ActiveAction';
import {Region} from '../Region';
import {Lord} from '../Lord';
import {TriggeredAction} from './TriggeredAction';

export class EmptyAction implements ActiveAction {

  public cost(region: Region) {
    return 0;
  }

  public can(lord: Lord, region: Region) {
    return false;
  }

  public run(lord: Lord, region: Region) {
    // do nothing
  }

  public name() {
    return 'Reach';
  }

  public triggered(): TriggeredAction[] {
    return [];
  }

  public shortName(): string {
    return 'E';
  }
}
