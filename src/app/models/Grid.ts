export class Grid {

  constructor(private gridSize: number) {
  }

  public north(position: number) {
    const y = position % this.gridSize;
    const x = Math.floor(position / this.gridSize);
    return (x - 1) * this.gridSize + y;
  }

  public south(position: number) {
    const y = position % this.gridSize;
    const x = Math.floor(position / this.gridSize);
    return (x + 1) * this.gridSize + y;
  }

  public east(position: number) {
    if ((position + 1) % this.gridSize === 0) {
      return -1;
    }
    return position + 1;
  }

  public west(position: number) {
    if (position % this.gridSize === 0) {
      return -1;
    }
    return position - 1;
  }

  public outOfBoundaries(position: number) {
    return position < 0 || position >= this.gridSize * this.gridSize;
  }

  public getNeighbourhood(i: number) {
    return [i, ...this.getNeighbours(i)];
  }

  public getNeighbours(i: number) {
    return [this.north(i), this.east(i), this.south(i), this.west(i)]
      .filter(index => !this.outOfBoundaries(index));
  }

  public size() {
    return this.gridSize;
  }
}
