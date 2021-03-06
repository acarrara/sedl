import {Region} from './Region';
import {Borders} from './Borders';
import {Grid} from './Grid';
import {Lord} from './Lord';

export class Board {

  public grid: Grid;

  public world: string[];
  public regions: Region[];

  constructor(world: string[], politics: string[]) {
    this.grid = new Grid(Math.sqrt(politics.length));
    this.world = [...world];
    this.arrangeRegions(politics);
  }

  public arrangeRegions(regionsAsStrings: string[]) {
    this.regions = regionsAsStrings.map((lord, i) => new Region(lord, this.world[i], false, false));
    this.regions.forEach((region, i) => region.borders = this.borders(i));
  }

  public updateNeighbourhood(region: Region) {
    const i: number = this.regions.indexOf(region);
    this.grid.getNeighbourhood(i).forEach(current => {
      this.regions[current] = this.regions[current].copy();
      this.regions[current].borders = this.borders(current);
    });
  }

  public getDomain(index: number, lord: Lord): number[] {
    const visited: Set<number> = new Set();
    this.visit(index, lord, visited);
    return [...visited];
  }

  public reachableBy(lord: Lord, region: Region) {
    return this.isReachable(lord, region, []);
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
    return this.regions[position].hasDifferentOwner(this.getSafeRegion(other));
  }

  public getNeighbours(region: Region) {
    const i: number = this.regions.indexOf(region);
    return [
      this.getSafeRegion(this.grid.north(i)),
      this.getSafeRegion(this.grid.east(i)),
      this.getSafeRegion(this.grid.south(i)),
      this.getSafeRegion(this.grid.west(i))
    ];
  }

  public change(region: Region, newRegion: Region) {
    const i: number = this.regions.indexOf(region);
    this.regions[i] = newRegion;
    this.world[i] = newRegion.type;
  }

  private visit(index: number, lord: Lord, visited: Set<number>) {
    this.grid.getNeighbours(index)
      .filter(current => !visited.has(current) && this.regions[current].belongsTo(lord))
      .forEach(current => {
        visited.add(current);
        this.visit(current, lord, visited);
      });
  }

  private isReachable(lord: Lord, region: Region, visited: Region[]) {
    if (visited.indexOf(region) !== -1) {
      return false;
    }
    if (region.belongsTo(lord) && region.isSettlement()) {
      return true;
    }
    if (region.belongsTo(lord)) {
      visited.push(region);
    }
    return this.grid.getNeighbours(this.regions.indexOf(region))
      .map(current => this.regions[current])
      .filter(current => current.belongsTo(lord))
      .some(current => this.isReachable(lord, current, visited));
  }

  private getSafeRegion(other: number) {
    return this.grid.outOfBoundaries(other) ? Region.UNCHARTED : this.regions[other];
  }

  private borders(position: number): Borders {
    return new Borders(this.borderNorth(position), this.borderEast(position), this.borderSouth(position), this.borderWest(position));
  }

}
