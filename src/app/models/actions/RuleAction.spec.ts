import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Board} from '../Board';

describe('RuleAction', () => {

  describe('name', () => {

    it('should have Rule as name', () => {
      expect(Actions.RULE.name()).toEqual('Rule');
    });
  });

  describe('isTriggered', () => {

    it('should not be triggered when conquered region is not a settlement', () => {
      const rulingLord = new Lord('l1');
      const ruledLord = new Lord('l2');
      rulingLord.board = new Board(['s', 'p', 'p', 'p'], ['l1', 'l1', 'l2', 'l2']);

      expect(Actions.RULE.isTriggered(rulingLord, ruledLord, 1)).toBeFalsy();
    });

    it('should not be triggered when conquered region is a reachable settlement', () => {
      const rulingLord = new Lord('l1');
      const ruledLord = new Lord('l2');
      rulingLord.board = new Board(['s', 'p', 'p', 's'], ['l1', 'l1', 'l2', 'l2']);

      expect(Actions.RULE.isTriggered(rulingLord, ruledLord, 0)).toBeFalsy();
    });

    it('should be triggered', () => {
      const rulingLord = new Lord('l1');
      const ruledLord = new Lord('l2');
      rulingLord.board = new Board(['s', 'p', 'p', 'p'], ['l1', 'l1', 'l1', 'l2']);

      expect(Actions.RULE.isTriggered(rulingLord, ruledLord, 0)).toBeTruthy();
    });
  });

  describe('run', () => {

    it('should rule the domain', () => {
      const rulingLord = new Lord('l1');
      const ruledLord = new Lord('l2');
      rulingLord.board = new Board(['p', 's', 'p', 's'], ['l2', 'l1', 'l2', 'l1']);

      Actions.RULE.run(rulingLord, ruledLord, 1);

      expect(rulingLord.board.regions[0].belongsTo(rulingLord)).toBeTruthy();
      expect(rulingLord.board.regions[1].belongsTo(rulingLord)).toBeTruthy();
      expect(rulingLord.board.regions[2].belongsTo(rulingLord)).toBeTruthy();
      expect(rulingLord.board.regions[3].belongsTo(rulingLord)).toBeTruthy();
    });
  });
});
