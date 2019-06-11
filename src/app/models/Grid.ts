export class Grid {

  constructor(private dim: number) {
  }

  public north(position: number) {
    const y = position % this.dim;
    const x = Math.floor(position / this.dim);
    return (x - 1) * this.dim + y;
  }

  public south(position: number) {
    const y = position % this.dim;
    const x = Math.floor(position / this.dim);
    return (x + 1) * this.dim + y;
  }

  public east(position: number) {
    if ((position + 1) % this.dim === 0) {
      return -1;
    }
    return position + 1;
  }

  public west(position: number) {
    if (position % this.dim === 0) {
      return -1;
    }
    return position - 1;
  }

  public outOfBoundaries(position: number) {
    return position < 0 || position >= this.dim * this.dim;
  }

  public getNeighbourhood(i: number) {
    return [i, ...this.getNeighbours(i)];
  }

  public getNeighbours(i: number) {
    return [this.north(i), this.east(i), this.south(i), this.west(i)]
      .filter(index => !this.outOfBoundaries(index));
  }
}
