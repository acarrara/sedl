import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';
import {Board} from '../Board';

describe('FortifyAction', () => {

  describe('name', () => {

    it('should return Fortify as name', () => {

      expect(Actions.FORTIFY.name()).toEqual('Fortify');
    });
  });

  describe('shortName', () => {

    it('should return F as short name', () => {

      expect(Actions.FORTIFY.shortName()).toEqual('F');
    });
  });

  describe('can', () => {

    it('should return false when the Lord cannot reach the region', () => {

      expect(Actions.FORTIFY.can({
          canReach: (region: Region) => false,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          sustenance: false,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when region is impregnable', () => {

      expect(Actions.FORTIFY.can({
          canReach: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: true,
          sustenance: false,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when region is already fortified', () => {

      expect(Actions.FORTIFY.can({
          canReach: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          sustenance: true,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when region is not fortifiable', () => {

      expect(Actions.FORTIFY.can({
          canReach: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          sustenance: false,
          isFortifiable: () => false,
          belongsTo: (lord: Lord) => true,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when region does not belong to Lord', () => {

      expect(Actions.FORTIFY.can({
          canReach: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          sustenance: false,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => false,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return false when Lord cannot pay', () => {

      expect(Actions.FORTIFY.can({
          canReach: (region: Region) => true,
          treasure: 0
        } as Lord,
        {
          impregnable: false,
          sustenance: false,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true,
          cost: () => 4
        } as Region)).toBeFalsy();
    });

    it('should return true when Lord can fortify', () => {

      expect(Actions.FORTIFY.can({
          canReach: (region: Region) => true,
          treasure: 100
        } as Lord,
        {
          impregnable: false,
          sustenance: false,
          isFortifiable: () => true,
          belongsTo: (lord: Lord) => true,
          cost: () => 4
        } as Region)).toBeTruthy();
    });
  });

  describe('triggered', () => {

    it('should trigger no action', () => {

      expect(Actions.FORTIFY.triggered()).toEqual([]);
    });
  });

  describe('cost', () => {

    it('should cost the sustenance cost for the region', () => {

      expect(Actions.FORTIFY.cost({
        cost: () => 4
      } as Region)).toEqual(4);
    });
  });

  describe('run', () => {

    it('should fortify the selected region', () => {
      const aLord = new Lord('l1');
      aLord.treasure = 40;
      aLord.board = new Board(['p', 's', 'm', 'h'], ['l1', 'l1', 'l1', 'l1']);

      Actions.FORTIFY.run(aLord, aLord.board.regions[0]);

      expect(aLord.board.regions[0].sustenance).toBeTruthy();
      expect(aLord.treasure).toEqual(36);
    });
  });
});
