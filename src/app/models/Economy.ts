export class Economy {

  private static WORTHS = {
    m: 3,
    f: 2,
    p: 1,
    h: 1,
    w: 1,
    s: 0
  };

  private static COSTS = {
    m: 10,
    f: 6,
    h: 6,
    w: 6,
    p: 4,
    s: 0
  };

  private static SUSTENANCES = Object.keys(Economy.COSTS).reduce((o, k) => {
    o[k] = k === 's' ? 4 : Economy.COSTS[k];
    return o;
  }, {});

  public static worth(type: string): number {
    return Economy.WORTHS[type];
  }

  public static cost(type: string, sustenance: boolean) {
    return Economy.baseCost(type) * (sustenance as any + 1);
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
