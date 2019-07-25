export class Land {

  public static LANDS = [
    new Land('m', 3, 10, 'mountain'),
    new Land('f', 2, 6, 'forest'),
    new Land('h', 1, 6, 'hill'),
    new Land('w', 1, 6, 'water'),
    new Land('p', 1, 4, 'plain'),
    new Land('l', 0, 8, 'swamp'),
    new Land('s', 0, 0, 'settlement')
  ];

  constructor(public type: string, public worth: number, public cost: number, public name: string) {
  }
}
