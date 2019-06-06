import {Dominion} from './Dominion';
import {Borders} from './Borders';
import {Grid} from './Grid';
import {Conqueror} from './Conqueror';
import {costOf} from './resources';

export class Board {

  public grid: Grid;

  public map: string[];
  public dominions: Dominion[];

  private source: string[];

  constructor(source: string[], map: string[]) {
    this.grid = new Grid(Math.sqrt(source.length));
    this.source = source;
    this.map = map;
    this.arrangeDominions();
  }

  conquer(i: number, conqueror: Conqueror) {
    const canConquer = this.canConquer(i, conqueror);
    if (canConquer) {
      conqueror.treasure -= costOf(this.dominions[i].type);
      this.source[i] = conqueror.id;
      this.updateDominions(i);
    }
    return canConquer;
  }

  public arrangeDominions() {
    this.dominions = this.source.map((conqueror, i) => new Dominion(conqueror, this.map[i]));
    this.dominions.forEach((dominion, i) => dominion.borders = this.borders(i));
  }

  public updateDominions(i: number) {
    const toUpdate = this.grid.getNeighbourhood(i);
    toUpdate.forEach(current => {
      this.dominions[current] = new Dominion(this.source[current], this.map[current]);
    });
    toUpdate.forEach(current => {
      this.dominions[current].borders = this.borders(current);
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
    return this.dominions[position].hasSameOwner(this.getSafeDominion(other));
  }

  private getSafeDominion(other: number) {
    return this.grid.outOfBoundaries(other) ? Dominion.UNCHARTED : this.dominions[other];
  }


  private borders(position: number): Borders {
    return new Borders(this.borderNorth(position), this.borderEast(position), this.borderSouth(position), this.borderWest(position));
  }

  private canConquer(i: number, conqueror: Conqueror) {
    return this.dominions[i].type !== 's' &&
      this.dominions[i].conqueror !== conqueror.id &&
      this.getNeighbours(i).some(dominion => dominion.conqueror === conqueror.id) &&
      conqueror.treasure >= costOf(this.dominions[i].type);
  }

  private getNeighbours(i: number) {
    return [
      this.getSafeDominion(this.grid.north(i)),
      this.getSafeDominion(this.grid.east(i)),
      this.getSafeDominion(this.grid.south(i)),
      this.getSafeDominion(this.grid.west(i))
    ];
  }
}
