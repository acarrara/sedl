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
});
