import {Region} from './Region';
import {Borders} from './Borders';
import {Grid} from './Grid';
import {Lord} from './Lord';
import {costOf} from './resources';

export class Board {

  public grid: Grid;

  public map: string[];
  public regions: Region[];

  private regionsAsStrings: string[];

  constructor(regionsAsStrings: string[], map: string[]) {
    this.grid = new Grid(Math.sqrt(regionsAsStrings.length));
    this.regionsAsStrings = regionsAsStrings;
    this.map = map;
    this.arrangeRegions();
  }

  conquer(i: number, lord: Lord) {
    const canConquer = this.canConquer(i, lord);
    if (canConquer) {
      lord.treasure -= costOf(this.regions[i].type);
      this.regionsAsStrings[i] = lord.id;
      this.updateRegions(i);
    }
    return canConquer;
  }

  public arrangeRegions() {
    this.regions = this.regionsAsStrings.map((lord, i) => new Region(lord, this.map[i]));
    this.regions.forEach((region, i) => region.borders = this.borders(i));
  }

  public updateRegions(i: number) {
    const toUpdate = this.grid.getNeighbourhood(i);
    toUpdate.forEach(current => {
      this.regions[current] = new Region(this.regionsAsStrings[current], this.map[current]);
    });
    toUpdate.forEach(current => {
      this.regions[current].borders = this.borders(current);
    });
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

  private canConquer(i: number, lord: Lord) {
    return this.regions[i].type !== 's' &&
      this.regions[i].lord !== lord.id &&
      this.getNeighbours(i).some(region => region.lord === lord.id) &&
      lord.treasure >= costOf(this.regions[i].type);
  }

  private getNeighbours(i: number) {
    return [
      this.getSafeRegion(this.grid.north(i)),
      this.getSafeRegion(this.grid.east(i)),
      this.getSafeRegion(this.grid.south(i)),
      this.getSafeRegion(this.grid.west(i))
    ];
  }
}
