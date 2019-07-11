import {Borders} from './Borders';
import {Lord} from './Lord';
import {Economy} from './Economy';

export class Region {

  public static UNCHARTED: Region = new Region('u', '', false, true);

  public borders: Borders;
  public sustenance: boolean;

  constructor(public lord: string, public type: string, sustenance: boolean, public impregnable: boolean) {
    this.sustenance = this.isSettlement() || !!sustenance;
  }

  public tamedBy(lord: Lord) {
    return new Region(lord.id, this.type, !this.isFortifiable() && this.sustenance, true);
  }

  public copy() {
    return new Region(this.lord, this.type, this.sustenance, this.impregnable);
  }

  public hasDifferentOwner(other: Region) {
    return other !== undefined && this.lord !== Region.UNCHARTED.lord && other.lord !== this.lord;
  }

  public equals(other: Region) {
    return other !== undefined && this.lord === other.lord && this.borders.equals(other.borders);
  }

  public belongsTo(lord: Lord) {
    return this.lord === lord.id;
  }

  public isSettlement() {
    return this.type === 's';
  }

  public isFortifiable() {
    return this.type !== 's' && this.type !== 'w';
  }

  public worth() {
    return Economy.worth(this.type);
  }

  public settle() {
    const region = new Region(this.lord, 's', false, true);
    region.borders = this.borders;
    return region;
  }

  public sustenanceCost() {
    return Economy.sustenanceCost(this.type);
  }

  public cost() {
    return Economy.cost(this.type, this.sustenance);
  }

  public conquerCost() {
    return Economy.conquerCost(this.type, this.sustenance);
  }
}
