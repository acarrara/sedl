import {ActiveAction} from './ActiveAction';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {TriggeredAction} from './TriggeredAction';

export class PassAction implements ActiveAction {

  public can(lord: Lord, region: Region) {
    return true;
  }

  public cost(region: Region) {
    return 0;
  }

  public name() {
    return 'Pass';
  }

  public run(lord: Lord, region: Region) {
  }

  public shortName(): string {
    return 'P';
  }

  public triggered(): TriggeredAction[] {
    return [];
  }
}
