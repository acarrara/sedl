import {Board} from './Board';

describe('Dominion', () => {

  const game = new Board(['r', 'b', 'r', 'u'], ['p', 'h', 'm', 'w']);

  describe('borderNorth', () => {

    it('should return borders north', () => {

      expect(game.borderNorth(0)).toBeTruthy();
      expect(game.borderNorth(1)).toBeTruthy();
      expect(game.borderNorth(2)).toBeFalsy();
      expect(game.borderNorth(3)).toBeFalsy();
    });
  });

  describe('borderSouth', () => {

    it('should return borders south', () => {

      expect(game.borderSouth(0)).toBeFalsy();
      expect(game.borderSouth(1)).toBeTruthy();
      expect(game.borderSouth(2)).toBeTruthy();
      expect(game.borderSouth(3)).toBeFalsy();
    });
  });

  describe('borderEast', () => {

    it('should return borders east', () => {

      expect(game.borderEast(0)).toBeTruthy();
      expect(game.borderEast(1)).toBeTruthy();
      expect(game.borderEast(2)).toBeTruthy();
      expect(game.borderEast(3)).toBeFalsy();
    });
  });

  describe('borderWest', () => {

    it('should return borders west', () => {

      expect(game.borderWest(0)).toBeTruthy();
      expect(game.borderWest(1)).toBeTruthy();
      expect(game.borderWest(2)).toBeTruthy();
      expect(game.borderWest(3)).toBeFalsy();
    });
  });
});
