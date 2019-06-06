import {Borders} from './Borders';

export class Dominion {

  public static UNCHARTED: Dominion = new Dominion('u', '');

  public borders: Borders;

  constructor(public conqueror: string, public type: string) {
    this.conqueror = conqueror;
  }

  hasSameOwner(other: Dominion) {
    return other !== undefined && this.conqueror !== Dominion.UNCHARTED.conqueror && other.conqueror !== this.conqueror;
  }

  equals(other: Dominion) {
    return other !== undefined && this.conqueror === other.conqueror && this.borders.equals(other.borders);
  }
}
