import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {Board} from '../Board';

describe('RushAction', () => {

  describe('name', () => {

    it('should return Rush as name', () => {

      expect(Actions.RUSH.name()).toEqual('Rush');
    });
  });

  describe('shortName', () => {

    it('should return P as short name', () => {

      expect(Actions.RUSH.shortName()).toEqual('R');
    });
  });

  describe('can', () => {

    it('should return true when lord has not rushed', () => {

      expect(Actions.RUSH.can({} as Lord, {} as Region)).toBeTruthy();
    });

    it('should return false when lord has rushed', () => {

      expect(Actions.RUSH.can({rushed: true} as Lord, {} as Region)).toBeFalsy();
    });
  });

  describe('triggered', () => {

    it('should trigger no action', () => {

      expect(Actions.RUSH.triggered()).toEqual([]);
    });
  });

  describe('cost', () => {

    it('should cost 0', () => {

      expect(Actions.RUSH.cost({} as Region)).toEqual(0);
    });
  });

  describe('run', () => {

    it('should add 20% of the Lord worth to the treasure', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['p', 's', 'm', 'h'], ['l1', 'l1', 'l1', 'l1']);

      Actions.RUSH.run(aLord, undefined);

      expect(aLord.rushed).toBeTruthy();
      expect(aLord.treasure).toEqual(1);
    });
  });
});
