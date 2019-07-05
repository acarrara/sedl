import {Board} from './Board';
import {Lord} from './Lord';
import {Actions} from './Actions';
import {Region} from './Region';
import {ActiveAction} from './Action';

export class Game {

  private static WIN_BY_MONEY_THRESHOLD = 500;

  public winner: Lord;

  constructor(public board: Board, public lords: Lord[], public lordIndex = 0, public history: string[] = []) {
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

  private otherLords() {
    return this.lords.filter(lord => lord !== this.currentLord());
  }

  public shiftLord() {
    this.lordIndex = (this.lordIndex + 1) % this.lords.length;
  }

  private winGame() {
    this.winner = this.currentLord();
  }

  public applyHistory() {
    this.history
      .map(actionAsString => this.hydrate(actionAsString))
      .forEach(hydratedAction => this.applyHydratedAction(hydratedAction));
  }

  public applyHydratedAction(hydratedAction) {
    const lordIndex: number = this.lords.findIndex(lord => lord.id === hydratedAction.lordId);
    this.lordIndex = lordIndex;
    const action: ActiveAction = Actions.lookupByShortName(hydratedAction.shortName);
    const region = this.board.regions[hydratedAction.index];
    if (action === Actions.RUSH) {
      this.currentLord().rush();
    } else if (action === Actions.PASS) {
      this.pass();
    } else if (action === Actions.SETTLE) {
      this.currentLord().settle(region);
    } else {
      this.currentLord().activeAction(region, this.lordAt(region));
    }
  }

  public hydrate(actionAsString) {
    return {
      lordId: actionAsString.substr(0, 2),
      shortName: actionAsString.substr(2, 1),
      index: actionAsString.substr(3)
    };
  }
}
