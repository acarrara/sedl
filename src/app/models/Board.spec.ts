import {Board} from './Board';
import {Lord} from './Lord';

describe('Board', () => {

  const board = new Board(['r', 'b', 'r', 'u'], ['p', 'h', 'm', 'w']);

  describe('borderNorth', () => {

    it('should return borders north', () => {

      expect(board.borderNorth(0)).toBeTruthy();
      expect(board.borderNorth(1)).toBeTruthy();
      expect(board.borderNorth(2)).toBeFalsy();
      expect(board.borderNorth(3)).toBeFalsy();
    });
  });

  describe('borderSouth', () => {

    it('should return borders south', () => {

      expect(board.borderSouth(0)).toBeFalsy();
      expect(board.borderSouth(1)).toBeTruthy();
      expect(board.borderSouth(2)).toBeTruthy();
      expect(board.borderSouth(3)).toBeFalsy();
    });
  });

  describe('borderEast', () => {

    it('should return borders east', () => {

      expect(board.borderEast(0)).toBeTruthy();
      expect(board.borderEast(1)).toBeTruthy();
      expect(board.borderEast(2)).toBeTruthy();
      expect(board.borderEast(3)).toBeFalsy();
    });
  });

  describe('borderWest', () => {

    it('should return borders west', () => {

      expect(board.borderWest(0)).toBeTruthy();
      expect(board.borderWest(1)).toBeTruthy();
      expect(board.borderWest(2)).toBeTruthy();
      expect(board.borderWest(3)).toBeFalsy();
    });
  });

  describe('canSettle', () => {

    const settlingBoard = new Board([
      'r', 'u', 'r', 'u',
      'r', 'r', 'u', 'u',
      'u', 'u', 'u', 'u',
      'u', 'u', 'u', 'u'
    ], [
      'p', 'p', 'p', 'p',
      's', 'p', 'p', 'p',
      'p', 'p', 'p', 'p',
      'p', 'p', 'p', 'p'
    ]);
    const lord = new Lord('r', '', '', 0, settlingBoard);

    it('should return false', () => {
      const canSettle = settlingBoard.reachableBy(lord, settlingBoard.regions[11]);

      expect(canSettle).toBeFalsy();
    });

    it('should return true', () => {
      const canSettle = settlingBoard.reachableBy(lord, settlingBoard.regions[10]);

      expect(canSettle).toBeFalsy();
    });

    it('should return true', () => {
      const canSettle = settlingBoard.reachableBy(lord, settlingBoard.regions[1]);

      expect(canSettle).toBeTruthy();
    });

    it('should return false', () => {
      const canSettle = settlingBoard.reachableBy(lord, settlingBoard.regions[3]);

      expect(canSettle).toBeFalsy();
    });

    it('should return true', () => {
      const canSettle = settlingBoard.reachableBy(lord, settlingBoard.regions[0]);

      expect(canSettle).toBeTruthy();
    });

  });
});
