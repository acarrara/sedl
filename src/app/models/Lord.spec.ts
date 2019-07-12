import {Lord} from './Lord';
import {Board} from './Board';

describe('Lord', () => {
  const lord: Lord = new Lord('l1');
  lord.board = new Board(['p', 'p', 's', 's'], ['l1', 'l1', 'l1', 'u']);
  lord.board.regions[0].sustenance = true;

  describe('settlements', () => {

    it('should return the number of the Lord settlements', () => {
      expect(lord.settlements()).toEqual(1);
    });
  });

  describe('worth', () => {

    it('should return the Lord worth', () => {
      expect(lord.worth()).toEqual(2);
    });
  });

  describe('debt', () => {

    it('should return the Lord debt', () => {
      expect(lord.debt()).toEqual(8);
    });
  });

  describe('canPlay', () => {

    it('should return true when Lord has settlements', () => {
      expect(lord.canPlay()).toBeTruthy();
    });

    it('should return false when Lord has no settlements', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['s'], ['u']);

      expect(aLord.canPlay()).toBeFalsy();
    });
  });

  describe('canRush', () => {

    it('should return true when lord has not rushed', () => {
      const aLord = new Lord('l1');

      expect(aLord.canRush()).toBeTruthy();
    });

    it('should return false when lord has rushed', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['s'], ['u']);
      aLord.rush();

      expect(aLord.canRush()).toBeFalsy();
    });
  });

  describe('rush', () => {

    it('should add 20% of worth to the treasure', () => {
      const aLord = new Lord('l1');
      aLord.treasure = 10;
      aLord.board = new Board(['s', 'm', 'm', 'm'], ['l1', 'l1', 'l1', 'l1']);

      aLord.rush();

      expect(aLord.treasure).toEqual(11);
    });
  });

  describe('canSettle', () => {

    it('should return true when Lord has still available settlements', () => {
      const aLord = new Lord('l1');

      expect(aLord.canSettle()).toBeTruthy();
    });

    it('should return false when Lord has no available settlements', () => {
      const aLord = new Lord('l1');
      aLord.availableSettlements = 0;

      expect(aLord.canSettle()).toBeFalsy();
    });
  });

  describe('settle', () => {

    it('should settle the region', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['s', 'm', 'm', 'm'], ['l1', 'l1', 'l1', 'l1']);

      aLord.settle(aLord.board.regions[1]);

      expect(aLord.board.regions[1].isSettlement()).toBeTruthy();
    });
  });
});
