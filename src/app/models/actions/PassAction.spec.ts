import {Actions} from './Actions';
import {Lord} from '../Lord';
import {Region} from '../Region';

describe('PassAction', () => {

  describe('name', () => {

    it('should return Pass as name', () => {

      expect(Actions.PASS.name()).toEqual('Pass');
    });
  });

  describe('shortName', () => {

    it('should return P as short name', () => {

      expect(Actions.PASS.shortName()).toEqual('P');
    });
  });

  describe('can', () => {

    it('should always return true', () => {

      expect(Actions.PASS.can({} as Lord, {} as Region)).toBeTruthy();
    });
  });

  describe('triggered', () => {

    it('should trigger no action', () => {

      expect(Actions.PASS.triggered()).toEqual([]);
    });
  });

  describe('cost', () => {

    it('should cost 0', () => {

      expect(Actions.PASS.cost({} as Region)).toEqual(0);
    });
  });
});
