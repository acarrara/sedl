import {Log} from './Log';
import {Actions} from './actions/Actions';

describe('Log', () => {

  describe('deserialize', () => {

    it('should return a new log from a string', () => {
      const source = 'l1L12';

      expect(Log.deserialize(source)).toEqual(new Log('l1', Actions.COLONIZE, 12));
    });

    it('should return a new log from a string without index', () => {
      const source = 'l1R';

      expect(Log.deserialize(source)).toEqual(new Log('l1', Actions.RUSH));
    });
  });

  describe('serialize', () => {

    it('should serialize action with index', () => {
      const log: Log = new Log('l1', Actions.CONQUER, 12);

      expect(log.serialize()).toEqual('l1Q12');
    });

    it('should serialize action without index', () => {
      const log: Log = new Log('l1', Actions.RUSH);

      expect(log.serialize()).toEqual('l1R');
    });
  });
});
