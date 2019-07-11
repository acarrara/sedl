import {Board} from './Board';
import {Lord} from './Lord';
import {from} from 'rxjs';
import {flatMap} from 'rxjs/operators';

describe('Board', () => {

  const board = new Board(['p', 'h', 'm', 'w'], ['r', 'b', 'r', 'u']);

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
      'p', 'p', 'p', 'p',
      's', 'p', 'p', 'p',
      'p', 'p', 'p', 'p',
      'p', 'p', 'p', 'p'
    ], [
      'r', 'u', 'r', 'u',
      'r', 'r', 'u', 'u',
      'u', 'u', 'u', 'u',
      'u', 'u', 'u', 'u'
    ]);
    const lord = new Lord('r', '', '', 0);
    lord.board = settlingBoard;

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

  xit('should compute needed header letters', () => {
    const sources: string[] = ['SEDL!', 'Actions', 'Harvesting', 'Sustaining', 'Colonize', 'Conquer', 'Fortify',
      'Settle', 'Rush', 'Terrain values', 'Plain', 'Water', 'Hill', 'Mountain', 'Settlement', 'Forest'];

    const allChars: Set<string> = new Set<string>();

    from(sources).pipe(
      flatMap(source => from(source.split('')))
    ).subscribe(char => allChars.add(char));

    const set: string = [...allChars]
      .filter(value => value !== ' ')
      .reduce((previousValue, currentValue) => previousValue.concat(currentValue), '');

    console.log(set);
  });

});
