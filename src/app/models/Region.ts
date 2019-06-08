import {Borders} from './Borders';

export class Region {

  public static UNCHARTED: Region = new Region('u', '');

  public borders: Borders;

  constructor(public lord: string, public type: string) {
    this.lord = lord;
  }

  hasSameOwner(other: Region) {
    return other !== undefined && this.lord !== Region.UNCHARTED.lord && other.lord !== this.lord;
  }

  equals(other: Region) {
    return other !== undefined && this.lord === other.lord && this.borders.equals(other.borders);
  }
}
