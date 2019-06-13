import {Borders} from './Borders';
import {Lord} from './Lord';

export class Region {

  public static UNCHARTED: Region = new Region('u', '', false, true);

  public borders: Borders;
  public sustenance: boolean;

  constructor(public lord: string, public type: string, sustenance: boolean, public impregnable: boolean) {
    this.sustenance = type === 's' || !!sustenance;
  }

  public tamedBy(lord: Lord) {
    return new Region(lord.id, this.type, !this.isFortifiable() && this.sustenance, true);
  }

  public copy() {
    return new Region(this.lord, this.type, this.sustenance, this.impregnable);
  }

  public hasSameOwner(other: Region) {
    return other !== undefined && this.lord !== Region.UNCHARTED.lord && other.lord !== this.lord;
  }

  public equals(other: Region) {
    return other !== undefined && this.lord === other.lord && this.borders.equals(other.borders);
  }

  public belongsTo(lord: Lord) {
    return this.lord === lord.id;
  }

  public is(type: string) {
    return this.type === type;
  }

  public conquerCost() {
    return this.cost() * 2;
  }

  public isFortifiable() {
    return this.type !== 's' && this.type !== 'w';
  }

  public cost() {
    return this.baseCost() * (this.sustenance as any + 1);
  }

  public sustenanceCost(): number {
    if (this.type === 's') {
      return 4;
    } else {
      return this.baseCost();
    }
  }

  public worth() {
    switch (this.type) {
      case 'm':
        return 3;
      case 'f':
        return 2;
      case 'p':
        return 1;
      case 'h':
        return 1;
      case 'w':
        return 1;
      case 's':
        return 0;
      default:
        return 0;
    }
  }

  private baseCost() {
    switch (this.type) {
      case 'm':
        return 10;
      case 'f':
        return 8;
      case 'p':
        return 4;
      case 'h':
        return 6;
      case 'w':
        return 6;
      case 's':
        return 0;
      default:
        return 0;
    }
  }

  settle() {
    const region = new Region(this.lord, 's', false, true);
    region.borders = this.borders;
    return region;
  }
}
