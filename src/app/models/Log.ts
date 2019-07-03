import {ActiveAction} from './Action';

export class Log {

  constructor(public action: ActiveAction, public index?: number) {
  }

  serialize(id: string) {
    return id + this.action.shortName() + (this.index === undefined ? '' : this.index);
  }
}
