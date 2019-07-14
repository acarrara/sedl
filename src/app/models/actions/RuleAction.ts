import {TriggeredAction} from './TriggeredAction';
import {Lord} from '../Lord';
import {Board} from '../Board';

export class RuleAction implements TriggeredAction {

  public name() {
    return 'Rule';
  }

  public run(rulingLord: Lord, ruledLord: Lord, index: number) {
    const board: Board = rulingLord.board;
    board.getDomain(index, ruledLord).forEach(current => {
      const region = board.regions[current];
      const newRegion = region.tamedBy(rulingLord);
      board.change(region, newRegion);
      board.updateNeighbourhood(newRegion);
    });
  }

  public isTriggered(rulingLord: Lord, ruledLord: Lord, index: number) {
    const {board: {regions: {[index]: region}}, board} = rulingLord;
    return region.isSettlement() &&
      !board.reachableBy(ruledLord, region);
  }
}
