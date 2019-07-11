import {ActiveAction} from './Action';
import {Actions} from './Actions';

export class Log {

  constructor(public lordId: string, public action: ActiveAction, public index?: number) {
  }

  public static deserialize(logAsString: string) {
    return new Log(
      logAsString.substr(0, 2),
      Actions.lookupByShortName(logAsString.substr(2, 1)),
      Number(logAsString.substr(3)));
  }

  public serialize() {
    return this.lordId + this.action.shortName() + (this.index === undefined ? '' : this.index);
  }
}
