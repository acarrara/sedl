import {Land} from './Land';

export class Economy {

  private static WORTHS = Land.LANDS.reduce((worths, land) => {
    worths[land.type] = land.worth;
    return worths;
  }, {});

  private static COSTS = Land.LANDS.reduce((costs, land) => {
    costs[land.type] = land.cost;
    return costs;
  }, {});

  private static SUSTENANCES = Object.keys(Economy.COSTS).reduce((o, k) => {
    o[k] = k === 's' ? 4 : Economy.COSTS[k];
    return o;
  }, {});

  public static worth(type: string): number {
    return Economy.WORTHS[type];
  }

  public static cost(type: string, sustenance: boolean) {
    return Economy.baseCost(type) * (sustenance ? 3 : 1);
  }

  public static sustenanceCost(type: string): number {
    return Economy.SUSTENANCES[type];
  }

  public static conquerCost(type: string, sustenance: boolean) {
    return Economy.cost(type, sustenance) * 2;
  }

  private static baseCost(type: string) {
    return Economy.COSTS[type];
  }
}
