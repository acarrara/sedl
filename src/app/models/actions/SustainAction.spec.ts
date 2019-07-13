import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Board} from '../Board';

describe('SustainAction', () => {

  describe('name', () => {

    it('should return Sustain as name', () => {

      expect(Actions.SUSTAIN.name()).toEqual('Sustain');
    });
  });

  describe('run', () => {

    it('should sustain all the Lord fortifications', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['p', 'm', 'm', 'h'], ['l1', 'l1', 'l1', 'u']);
      aLord.treasure = 10;
      aLord.board.regions[1].impregnable = true;
      aLord.board.regions[2].sustenance = true;

      Actions.SUSTAIN.run(aLord);

      expect(aLord.board.regions[1].impregnable).toBeTruthy();
      expect(aLord.board.regions[2].sustenance).toBeTruthy();
      expect(aLord.treasure).toEqual(0);
    });

    it('should abandon all the Lord fortifications', () => {
      const aLord = new Lord('l1');
      aLord.board = new Board(['p', 'm', 'm', 'h'], ['l1', 'l1', 'l1', 'u']);
      aLord.treasure = 0;
      aLord.board.regions[1].sustenance = true;
      aLord.board.regions[2].sustenance = true;

      Actions.SUSTAIN.run(aLord);

      expect(aLord.board.regions[1].sustenance).toBeFalsy();
      expect(aLord.board.regions[2].sustenance).toBeFalsy();
      expect(aLord.treasure).toEqual(0);
    });
  });
});
