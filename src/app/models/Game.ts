import {Board} from './Board';
import {Lord} from './Lord';
import {Actions} from './Actions';
import {Region} from './Region';

export class Game {

  private static WIN_BY_MONEY_THRESHOLD = 500;

  public winner: Lord;

  constructor(public board: Board, public lords: Lord[], public lordIndex = 0) {
    this.lords.map(lord => lord.board = board);
  }

  currentLord() {
    return this.lords[this.lordIndex];
  }

  public pass() {
    if (this.otherLords().every(otherLord => !otherLord.canPlay())) {
      this.winGame();
    }
    do {
      this.shiftLord();
      Actions.getPassiveActions().forEach(action => this.currentLord().passiveAction(action));
    } while (!this.currentLord().canPlay());

    if (this.currentLord().treasure >= Game.WIN_BY_MONEY_THRESHOLD) {
      this.winGame();
    }
  }

  public lordAt(region: Region) {
    const lordId = region.lord;
    if (lordId === 'u') {
      return Lord.UNKNOWN;
    }
    const lordIndex = this.lords.findIndex(lord => lord.id === lordId);
    return this.lords[lordIndex];
  }

  private otherLords() {
    return this.lords.filter(lord => lord !== this.currentLord());
  }

  public shiftLord() {
    this.lordIndex = (this.lordIndex + 1) % this.lords.length;
  }

  private winGame() {
    this.winner = this.currentLord();
  }
}
