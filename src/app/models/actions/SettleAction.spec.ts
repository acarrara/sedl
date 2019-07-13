import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {Board} from '../Board';

describe('SettleAction', () => {

  describe('name', () => {

    it('should return Settle as name', () => {

      expect(Actions.SETTLE.name()).toEqual('Settle');
    });
  });

  describe('shortName', () => {

    it('should return S as short name', () => {

      expect(Actions.SETTLE.shortName()).toEqual('S');
    });
  });

  describe('can', () => {

    it('should return false when region is not fortifiable', () => {

      expect(Actions.SETTLE.can({} as Lord,
        {
          isFortifiable: () => false
        } as Region)
      ).toBeFalsy();
    });

    it('should return false when region does not belong to Lord', () => {

      expect(Actions.SETTLE.can({} as Lord,
        {
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => false
        } as Region)
      ).toBeFalsy();
    });

    it('should return false when Lord cannot settle', () => {

      expect(Actions.SETTLE.can({
          canSettle: () => false
        } as Lord,
        {
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true
        } as Region)
      ).toBeFalsy();
    });

    it('should return true when Lord can settle', () => {

      expect(Actions.SETTLE.can({
          canSettle: () => true
        } as Lord,
        {
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true
        } as Region)
      ).toBeTruthy();
    });
  });

  describe('triggered', () => {

    it('should trigger no action', () => {

      expect(Actions.SETTLE.triggered()).toEqual([]);
    });
  });

  describe('cost', () => {

    it('should cost 0', () => {

      expect(Actions.SETTLE.cost({} as Region)).toEqual(0);
    });
  });

  describe('run', () => {

    it('should settle the selected region', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['p', 's', 'm', 'h'], ['l1', 'l1', 'l1', 'l1']);

      Actions.SETTLE.run(aLord, aLord.board.regions[0]);

      expect(aLord.board.regions[0].isSettlement()).toBeTruthy();
      expect(aLord.availableSettlements).toEqual(1);
    });
  });
});
