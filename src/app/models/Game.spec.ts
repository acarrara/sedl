import {Game} from './Game';
import {Board} from './Board';
import {Lord} from './Lord';

describe('Game', () => {

  describe('currentLord', () => {
    const lords: Lord[] = [new Lord('l1'), new Lord('l2')];
    const game: Game = new Game('aGame', new Board(['p', 'p', 'p', 'p'], ['l1', 'u', 'u', 'l2']), lords);

    it('should return the current lord', () => {
      expect(game.currentLord()).toEqual(lords[0]);
    });
  });

  describe('shiftLord', () => {
    const lords: Lord[] = [new Lord('l1'), new Lord('l2')];
    const game: Game = new Game('aGame', new Board(['p', 'p', 'p', 'p'], ['l1', 'u', 'u', 'l2']), lords);

    it('should shift the current lord', () => {
      game.shiftLord();

      expect(game.currentLord()).toEqual(lords[1]);
    });
  });

  describe('lordAt', () => {
    const lords: Lord[] = [new Lord('l1'), new Lord('l2')];
    const game: Game = new Game('aGame', new Board(['p', 'p', 'p', 'p'], ['l1', 'u', 'u', 'l2']), lords);

    it('should return unknown lord', () => {
      expect(game.lordAt(game.board.regions[1])).toEqual(Lord.UNKNOWN);
    });

    it('should return current lord', () => {
      expect(game.lordAt(game.board.regions[0])).toEqual(lords[0]);
    });
  });

  describe('record', () => {
    const lords: Lord[] = [new Lord('l1'), new Lord('l2')];
    const game: Game = new Game('aGame', new Board(['p', 'p', 'p', 'p'], ['l1', 'u', 'u', 'l2']), lords);

    it('should record action in history', () => {
      game.record('aLog');

      expect(game.history).toEqual(['aLog']);
    });
  });


});
