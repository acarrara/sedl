import {
  ActiveAction,
  ColonizeAction,
  ConquerAction,
  DesertAction,
  EmptyAction,
  FortifyAction,
  HarvestAction,
  PassiveAction,
  SettleAction,
  SustainAction,
  WithdrawAction
} from './Action';

export class Actions {

  public static COLONIZE: ActiveAction = new ColonizeAction();
  public static CONQUER: ActiveAction = new ConquerAction();
  public static EMPTY: ActiveAction = new EmptyAction();
  public static FORTIFY: ActiveAction = new FortifyAction();
  public static WITHDRAW: ActiveAction = new WithdrawAction();
  public static SETTLE: ActiveAction = new SettleAction();

  public static HARVEST: PassiveAction = new HarvestAction();
  public static SUSTAIN: PassiveAction = new SustainAction();
  public static DESERT: PassiveAction = new DesertAction();

  public static getPassiveActions = (): PassiveAction[] => [Actions.DESERT, Actions.HARVEST, Actions.SUSTAIN];

}
