import {Region} from './Region';
import {Borders} from './Borders';
import {Grid} from './Grid';
import {Lord} from './Lord';

export class Board {

  public grid: Grid;

  public map: string[];
  public regions: Region[];

  regionsAsStrings: string[];

  constructor(regionsAsStrings: string[], map: string[]) {
    this.grid = new Grid(Math.sqrt(regionsAsStrings.length));
    this.regionsAsStrings = regionsAsStrings;
    this.map = map;
    this.arrangeRegions();
  }

  public arrangeRegions() {
    this.regions = this.regionsAsStrings.map((lord, i) => new Region(lord, this.map[i]));
    this.regions.forEach((region, i) => region.borders = this.borders(i));
  }

  public updateNeighbourhood(i: number) {
    const toUpdate = this.grid.getNeighbourhood(i);
    toUpdate.forEach(current => {
      this.regions[current] = this.regions[current].copy();
      this.regions[current].borders = this.borders(current);
    });
  }

  public reachableBy(lord: Lord, i: number) {
    return this.getNeighbours(i).some(neighbour => neighbour.belongsTo(lord));
  }

  public borderNorth(position: number): boolean {
    return this.borderAt(position, this.grid.north(position));
  }

  public borderSouth(position: number): boolean {
    return this.borderAt(position, this.grid.south(position));
  }

  public borderEast(position: number): boolean {
    return this.borderAt(position, this.grid.east(position));
  }

  public borderWest(position: number): boolean {
    return this.borderAt(position, this.grid.west(position));
  }

  public borderAt(position: number, other: number): boolean {
    return this.regions[position].hasSameOwner(this.getSafeRegion(other));
  }

  private getSafeRegion(other: number) {
    return this.grid.outOfBoundaries(other) ? Region.UNCHARTED : this.regions[other];
  }

  private borders(position: number): Borders {
    return new Borders(this.borderNorth(position), this.borderEast(position), this.borderSouth(position), this.borderWest(position));
  }

  getNeighbours(i: number) {
    return [
      this.getSafeRegion(this.grid.north(i)),
      this.getSafeRegion(this.grid.east(i)),
      this.getSafeRegion(this.grid.south(i)),
      this.getSafeRegion(this.grid.west(i))
    ];
  }

}
