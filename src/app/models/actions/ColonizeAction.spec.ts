import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {Board} from '../Board';

describe('ColonizeAction', () => {

  describe('name', () => {

    it('should return Colonize as name', () => {

      expect(Actions.COLONIZE.name()).toEqual('Colonize');
    });
  });

  describe('shortName', () => {

    it('should return L as short name', () => {

      expect(Actions.COLONIZE.shortName()).toEqual('L');
    });
  });

  describe('can', () => {

    it('should return false when Lord cannot reach', () => {

      expect(Actions.COLONIZE.can({
          canReach: (region: Region) => false,
          canTame: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          belongsTo: (lord: Lord) => false,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when Lord cannot tame', () => {

      expect(Actions.COLONIZE.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => false,
          treasure: 100
        } as Lord,
        {
          belongsTo: (lord: Lord) => false,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when region belongs to Lord', () => {

      expect(Actions.COLONIZE.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          belongsTo: (lord: Lord) => true,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when Lord cannot pay', () => {

      expect(Actions.COLONIZE.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => true,
          treasure: 0
        } as Lord,
        {
          belongsTo: (lord: Lord) => false,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return true when Lord can colonize', () => {

      expect(Actions.COLONIZE.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          belongsTo: (lord: Lord) => false,
          cost: () => 4
        } as Region)).toBeTruthy();
    });
  });

  describe('triggered', () => {

    it('should trigger no action', () => {

      expect(Actions.COLONIZE.triggered()).toEqual([]);
    });
  });

  describe('cost', () => {

    it('should cost the base cost for the region', () => {

      expect(Actions.COLONIZE.cost({
        cost: () => 4
      } as Region)).toEqual(4);
    });
  });

  describe('run', () => {

    it('should colonize the selected region', () => {
      const aLord = new Lord('l1');
      aLord.treasure = 40;
      aLord.board = new Board(['p', 's', 'm', 'h'], ['u', 'l1', 'l1', 'l2']);

      Actions.COLONIZE.run(aLord, aLord.board.regions[0]);

      expect(aLord.board.regions[0].belongsTo(aLord)).toBeTruthy();
      expect(aLord.board.regions[0].impregnable).toBeTruthy();
      expect(aLord.treasure).toEqual(36);
    });
  });
});
