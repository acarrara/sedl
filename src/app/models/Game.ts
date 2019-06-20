import {Board} from './Board';
import {Lord} from './Lord';

export class Game {

  public winner: Lord;

  constructor(public board: Board, public lords: Lord[]) {
  }
}
