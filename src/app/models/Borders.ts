export class Borders {

  constructor(public north: boolean, public east: boolean, public south: boolean, public west: boolean) {
  }

  public equals(other: Borders): boolean {
    return other !== undefined &&
      this.north === other.north &&
      this.east === other.east &&
      this.south === other.south &&
      this.west === other.west;
  }
}
