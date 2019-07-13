import {Game} from './Game';
import {Board} from './Board';
import {Lord} from './Lord';
import {Statistics} from './Statistics';

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


  describe('pass', () => {

    it('should make the current lord win the game when it has more than 500 coins', () => {
      const lords: Lord[] = [new Lord('l1'), new Lord('l2', 'lord', 'aColor', 600)];
      const game: Game = new Game('aGame', new Board(['s', 'p', 'p', 's'], ['l1', 'u', 'u', 'l2']), lords);

      game.pass();

      expect(game.winner).toBe(lords[1]);
    });

    it('should pass the turn when no one wins', () => {
      const lords: Lord[] = [new Lord('l1'), new Lord('l2')];
      const game: Game = new Game('aGame', new Board(['s', 'p', 'p', 's'], ['l1', 'u', 'u', 'l2']), lords);

      game.pass();

      expect(game.currentLord()).toBe(lords[1]);
      expect(game.winner).toBeUndefined();
    });

    it('should make the current lord win the game', () => {
      const lords: Lord[] = [new Lord('l1'), new Lord('l2', 'lord', 'aColor', 600)];
      const game: Game = new Game('aGame', new Board(['s', 'p', 'p', 'p'], ['l1', 'u', 'u', 'l2']), lords);

      game.pass();

      expect(game.winner).toBe(lords[0]);
    });
  });

  describe('applyHistory', () => {

    it('should apply history', () => {
      const lords: Lord[] = [new Lord('l1'), new Lord('l2', 'lord', 'aColor', 600)];
      const game: Game = new Game('aGame', new Board(['s', 'p', 'p', 's'], ['l1', 'u', 'u', 'l2']), lords);
      game.history = ['l1R', 'l1P', 'l2L2', 'l2S2', 'l2L1', 'l2Q0', 'l2P'];

      game.applyHistory();

      expect(game.winner).toBe(lords[1]);
      expect(game.board.regions[0].lord).toEqual('l2');
      expect(game.board.regions[1].lord).toEqual('l2');
      expect(game.board.regions[2].lord).toEqual('l2');
      expect(lords[1].treasure).toEqual(577);
    });
  });

  describe('buildStatistics', () => {

    it('should build statistics object', () => {
      const lords: Lord[] = [new Lord('l1'), new Lord('l2', 'lord', 'aColor', 600)];
      const game: Game = new Game('aGame', new Board(['s', 'p', 'p', 's'], ['l1', 'u', 'u', 'l2']), lords);
      game.history = ['l1R', 'l1P', 'l2L2', 'l2S2', 'l2L1', 'l2Q0', 'l2P'];
      const expected = new Statistics();
      expected.xSteps = 2;
      expected.ySteps = 4;
      expected.series[lords[0].id] = [1, 0, 0];
      expected.series[lords[1].id] = [1, 4, 4];

      const stats = game.buildStatistics();

      expect(stats).toEqual(expected);
    });
  });
});

