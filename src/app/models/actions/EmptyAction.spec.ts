import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';

describe('EmptyAction', () => {

  describe('name', () => {

    it('should return Empty as name', () => {

      expect(Actions.EMPTY.name()).toEqual('Reach');
    });
  });

  describe('shortName', () => {

    it('should return E as short name', () => {

      expect(Actions.EMPTY.shortName()).toEqual('E');
    });
  });

  describe('can', () => {

    it('should always return false', () => {

      expect(Actions.EMPTY.can({} as Lord, {} as Region)).toBeFalsy();
    });
  });

  describe('triggered', () => {

    it('should trigger no action', () => {

      expect(Actions.EMPTY.triggered()).toEqual([]);
    });
  });

  describe('cost', () => {

    it('should cost 0', () => {

      expect(Actions.EMPTY.cost({} as Region)).toEqual(0);
    });
  });
});
