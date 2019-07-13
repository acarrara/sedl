import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {Board} from '../Board';

describe('ConquerAction', () => {

  describe('name', () => {

    it('should return Conquer as name', () => {

      expect(Actions.CONQUER.name()).toEqual('Conquer');
    });
  });

  describe('shortName', () => {

    it('should return Q as short name', () => {

      expect(Actions.CONQUER.shortName()).toEqual('Q');
    });
  });

  describe('can', () => {

    it('should return false when Lord cannot reach', () => {

      expect(Actions.CONQUER.can({
          canReach: (region: Region) => false,
          canTame: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          belongsTo: (lord: Lord) => false,
          conquerCost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when Lord cannot tame', () => {

      expect(Actions.CONQUER.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => false,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          belongsTo: (lord: Lord) => false,
          conquerCost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when region belongs to Lord', () => {

      expect(Actions.CONQUER.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          belongsTo: (lord: Lord) => true,
          conquerCost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when Lord cannot pay', () => {

      expect(Actions.CONQUER.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => true,
          treasure: 0
        } as Lord,
        {
          impregnable: false,
          belongsTo: (lord: Lord) => false,
          conquerCost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when region is impregnable', () => {

      expect(Actions.CONQUER.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: true,
          belongsTo: (lord: Lord) => false,
          conquerCost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return true when Lord can conquer', () => {

      expect(Actions.CONQUER.can({
          canReach: (region: Region) => true,
          canTame: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          belongsTo: (lord: Lord) => false,
          conquerCost: () => 4
        } as Region)).toBeTruthy();
    });
  });

  describe('triggered', () => {

    it('should trigger rule action', () => {

      expect(Actions.CONQUER.triggered()).toEqual([Actions.RULE]);
    });
  });

  describe('cost', () => {

    it('should cost the conquer cost for the region', () => {

      expect(Actions.CONQUER.cost({
        conquerCost: () => 4
      } as Region)).toEqual(4);
    });
  });

  describe('run', () => {

    it('should conquer the selected region', () => {
      const aLord = new Lord('l1');
      aLord.treasure = 40;
      aLord.board = new Board(['p', 's', 'm', 'h'], ['u', 'l1', 'l1', 'l2']);

      Actions.CONQUER.run(aLord, aLord.board.regions[3]);

      expect(aLord.board.regions[3].belongsTo(aLord)).toBeTruthy();
      expect(aLord.board.regions[3].impregnable).toBeTruthy();
      expect(aLord.treasure).toEqual(28);
    });
  });
});
