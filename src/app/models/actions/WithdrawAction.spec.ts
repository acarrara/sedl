import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {Board} from '../Board';

describe('WithdrawAction', () => {

  describe('name', () => {

    it('should return Withdraw as name', () => {

      expect(Actions.WITHDRAW.name()).toEqual('Withdraw');
    });
  });

  describe('shortName', () => {

    it('should return W as short name', () => {

      expect(Actions.WITHDRAW.shortName()).toEqual('W');
    });
  });

  describe('can', () => {

    it('should return false when the Lord cannot reach the region', () => {

      expect(Actions.WITHDRAW.can({
          canReach: (region: Region) => false
        } as Lord,
        {
          sustenance: true,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true
        } as Region)).toBeFalsy();
    });

    it('should return false when region is not fortified', () => {

      expect(Actions.WITHDRAW.can({
          canReach: (region: Region) => true
        } as Lord,
        {
          sustenance: false,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true
        } as Region)).toBeFalsy();
    });

    it('should return false when region is not fortifiable', () => {

      expect(Actions.WITHDRAW.can({
          canReach: (region: Region) => true
        } as Lord,
        {
          sustenance: false,
          isFortifiable: () => false,
          belongsTo: (lord: Lord) => true
        } as Region)).toBeFalsy();
    });

    it('should return false when region does not belong to Lord', () => {

      expect(Actions.WITHDRAW.can({
          canReach: (region: Region) => true
        } as Lord,
        {
          sustenance: true,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => false
        } as Region)
      ).toBeFalsy();
    });

    it('should return true when Lord can withdraw', () => {

      expect(Actions.WITHDRAW.can({
          canReach: (region: Region) => true
        } as Lord,
        {
          sustenance: true,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true
        } as Region)
      ).toBeTruthy();
    });
  });

  describe('triggered', () => {

    it('should trigger no action', () => {

      expect(Actions.WITHDRAW.triggered()).toEqual([]);
    });
  });

  describe('cost', () => {

    it('should cost 0', () => {

      expect(Actions.WITHDRAW.cost({} as Region)).toEqual(0);
    });
  });

  describe('run', () => {

    it('should withdraw the selected region', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['p', 's', 'm', 'h'], ['l1', 'l1', 'l1', 'l1']);
      aLord.board.regions[0].sustenance = true;

      Actions.WITHDRAW.run(aLord, aLord.board.regions[0]);

      expect(aLord.board.regions[0].sustenance).toBeFalsy();
    });
  });
});
