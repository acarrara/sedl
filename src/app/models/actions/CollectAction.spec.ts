import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Board} from '../Board';

describe('CollectAction', () => {

  const aLord = new Lord('l1');

  beforeEach(() => {
    aLord.board = new Board(['p', 's', 'm', 'h'], ['l1', 'l1', 'l1', 'u']);
    aLord.rushed = false;
    aLord.treasure = 0;
  });

  describe('name', () => {

    it('should return Collect as name', () => {

      expect(Actions.COLLECT.name()).toEqual('Collect');
    });
  });

  describe('run', () => {

    it('should collect all the Lord worth', () => {
      Actions.COLLECT.run(aLord);

      expect(aLord.treasure).toEqual(4);
    });

    it('should collect half the Lord worth when they have rushed', () => {
      aLord.rushed = true;
      Actions.COLLECT.run(aLord);

      expect(aLord.treasure).toEqual(2);
    });
  });
});
