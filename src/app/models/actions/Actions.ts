import {TriggeredAction} from './TriggeredAction';
import {PassiveAction} from './PassiveAction';
import {ActiveAction} from './ActiveAction';
import {ColonizeAction} from './ColonizeAction';
import {ConquerAction} from './ConquerAction';
import {EmptyAction} from './EmptyAction';
import {FortifyAction} from './FortifyAction';
import {CollectAction} from './CollectAction';
import {SustainAction} from './SustainAction';
import {WithdrawAction} from './WithdrawAction';
import {SettleAction} from './SettleAction';
import {DesertAction} from './DesertAction';
import {RushAction} from './RushAction';
import {RuleAction} from './RuleAction';
import {PassAction} from './PassAction';

export class Actions {

  public static RULE: TriggeredAction = new RuleAction();

  public static COLONIZE: ActiveAction = new ColonizeAction();
  public static CONQUER: ActiveAction = new ConquerAction([Actions.RULE]);
  public static EMPTY: ActiveAction = new EmptyAction();
  public static FORTIFY: ActiveAction = new FortifyAction();
  public static WITHDRAW: ActiveAction = new WithdrawAction();
  public static SETTLE: ActiveAction = new SettleAction();
  public static RUSH: ActiveAction = new RushAction();
  public static PASS: ActiveAction = new PassAction();

  public static ACTIVE_ACTIONS: {[key: string]: ActiveAction} = {
    [Actions.COLONIZE.shortName()]: Actions.COLONIZE,
    [Actions.CONQUER.shortName()]: Actions.CONQUER,
    [Actions.EMPTY.shortName()]: Actions.EMPTY,
    [Actions.FORTIFY.shortName()]: Actions.FORTIFY,
    [Actions.WITHDRAW.shortName()]: Actions.WITHDRAW,
    [Actions.SETTLE.shortName()]: Actions.SETTLE,
    [Actions.RUSH.shortName()]: Actions.RUSH,
    [Actions.PASS.shortName()]: Actions.PASS
  };

  public static COLLECT: PassiveAction = new CollectAction();
  public static SUSTAIN: PassiveAction = new SustainAction();
  public static DESERT: PassiveAction = new DesertAction();

  public static getPassiveActions = (): PassiveAction[] => [Actions.DESERT, Actions.COLLECT, Actions.SUSTAIN];

  public static lookupByShortName(shortName: string) {
    return this.ACTIVE_ACTIONS[shortName];
  }
}
