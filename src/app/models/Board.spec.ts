import {Board} from './Board';

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
});
