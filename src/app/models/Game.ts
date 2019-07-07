import {Board} from './Board';
import {Lord} from './Lord';
import {Actions} from './Actions';
import {Region} from './Region';
import {ActiveAction} from './Action';
import {Log} from './Log';

export class Game {

  private static WIN_BY_MONEY_THRESHOLD = 500;
  private static STEP_INTERVAL = 500;

  public winner: Lord;

  constructor(public name: string, public board: Board, public lords: Lord[], public lordIndex = 0, public history: string[] = []) {
    this.lords.map(lord => lord.board = board);
  }

  public currentLord() {
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

  public record(log: string) {
    this.history.push(log);
  }

  public lordAt(region: Region) {
    const lordId = region.lord;
    if (lordId === 'u') {
      return Lord.UNKNOWN;
    }
    const lordIndex = this.lords.findIndex(lord => lord.id === lordId);
    return this.lords[lordIndex];
  }

  public shiftLord() {
    this.lordIndex = (this.lordIndex + 1) % this.lords.length;
  }

  public applyHistory() {
    this.history
      .map(logAsString => Log.deserialize(logAsString))
      .forEach(log => this.applyAction(log));
  }

  public applySteppedHistory(onSuccess: () => void, onComplete: () => void) {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.history.length) {
        const hydrated = Log.deserialize(this.history[index]);
        this.applyAction(hydrated);
        index += 1;
        onSuccess();
      } else {
        onComplete();
        clearInterval(interval);
      }
    }, Game.STEP_INTERVAL);
  }

  private winGame() {
    this.winner = this.currentLord();
  }

  private otherLords() {
    return this.lords.filter(lord => lord !== this.currentLord());
  }

  private applyAction(log: Log) {
    this.lordIndex = this.lords.findIndex(lord => lord.id === log.lordId);
    const action: ActiveAction = log.action;
    if (action === Actions.RUSH) {
      this.currentLord().rush();
    } else if (action === Actions.PASS) {
      this.pass();
    } else if (action === Actions.SETTLE) {
      this.currentLord().settle(this.board.regions[log.index]);
    } else {
      const region = this.board.regions[log.index];
      this.currentLord().activeAction(region, this.lordAt(region));
    }
  }
}
