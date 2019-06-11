import {Region} from './Region';
import {Borders} from './Borders';
import {Grid} from './Grid';
import {Lord} from './Lord';

export class Board {

  public grid: Grid;

  public world: string[];
  public regions: Region[];

  constructor(regions: string[], world: string[]) {
    this.grid = new Grid(Math.sqrt(regions.length));
    this.world = world;
    this.arrangeRegions(regions);
  }

  public arrangeRegions(regionsAsStrings: string[]) {
    this.regions = regionsAsStrings.map((lord, i) => new Region(lord, this.world[i]));
    this.regions.forEach((region, i) => region.borders = this.borders(i));
  }

  public updateNeighbourhood(i: number) {
    this.grid.getNeighbourhood(i).forEach(current => {
      this.regions[current] = this.regions[current].copy();
      this.regions[current].borders = this.borders(current);
    });
  }

  public reachableBy(lord: Lord, i: number) {
    return this.isReachable(lord, i, []);
  }

  private isReachable(lord: Lord, i: number, visited: number[]) {
    if (visited.indexOf(i) !== -1) {
      return false;
    }
    if (this.regions[i].belongsTo(lord) && this.regions[i].is('s')) {
      return true;
    }
    if (this.regions[i].belongsTo(lord)) {
      visited.push(i);
    }
    return this.grid.getNeighbours(i)
      .filter(current => this.regions[current].belongsTo(lord))
      .some(current => this.isReachable(lord, current, visited));
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
