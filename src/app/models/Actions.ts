import {
  Action,
  ColonizeAction,
  ConquerAction,
  DesertAction,
  EmptyAction,
  FortifyAction,
  HarvestAction,
  SettleAction,
  SustainAction,
  WithdrawAction
} from './Action';

export class Actions {

  public static COLONIZE: Action = new ColonizeAction();
  public static CONQUER: Action = new ConquerAction();
  public static EMPTY: Action = new EmptyAction();
  public static FORTIFY: Action = new FortifyAction();
  public static WITHDRAW: Action = new WithdrawAction();
  public static SETTLE: Action = new SettleAction();

  public static HARVEST: Action = new HarvestAction();
  public static SUSTAIN: Action = new SustainAction();
  public static DESERT: Action = new DesertAction();

  public static getPassiveActions = (): Action[] => [Actions.DESERT, Actions.HARVEST, Actions.SUSTAIN];

}
