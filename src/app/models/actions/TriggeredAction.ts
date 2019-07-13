import {SuperAction} from './SuperAction';
import {Lord} from '../Lord';

export interface TriggeredAction extends SuperAction {

  run(rulingLord: Lord, ruledLord: Lord, index: number);

  isTriggered(rulingLord: Lord, ruledLord: Lord, index: number);
}
