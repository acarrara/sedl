import {Board} from './Board';
import {Lord} from './Lord';

export class Game {
  constructor(public board: Board, public lords: Lord[]) {
  }
}
