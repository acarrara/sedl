import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Board} from '../Board';

describe('DesertAction', () => {

  describe('name', () => {

    it('should return Desert as name', () => {

      expect(Actions.DESERT.name()).toEqual('Desert');
    });
  });

  describe('run', () => {

    it('should desert all the Lord fortifications', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['p', 'm', 'm', 'h'], ['l1', 'l1', 'l1', 'u']);
      aLord.board.regions[1].impregnable = true;
      aLord.board.regions[2].sustenance = true;

      Actions.DESERT.run(aLord);

      expect(aLord.board.regions.some(region => region.sustenance)).toBeFalsy();
      expect(aLord.board.regions.some(region => region.impregnable)).toBeFalsy();
    });
  });
});
