import {SuperAction} from './SuperAction';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {TriggeredAction} from './TriggeredAction';

export interface ActiveAction extends SuperAction {

  can(lord: Lord, region: Region);

  run(lord: Lord, region: Region);

  cost(region: Region);

  triggered(): TriggeredAction[];

  shortName(): string;
}
