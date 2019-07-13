import {Lord} from '../Lord';
import {SuperAction} from './SuperAction';

export interface PassiveAction extends SuperAction {

  run(lord: Lord);
}
