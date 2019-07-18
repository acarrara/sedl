import {Board} from './Board';
import {Lord} from './Lord';
import {from} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Region} from './Region';

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

    it('should return false', () => {
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

  describe('getDomain', () => {

    const settlingBoard = new Board([
      'p', 'p', 'p', 'p',
      's', 'p', 'p', 'p',
      'p', 'p', 'p', 'p',
      'p', 'p', 's', 'p'
    ], [
      'r', 'r', 'r', 'u',
      'r', 'r', 'u', 'u',
      'u', 'r', 'u', 'u',
      'u', 'u', 'r', 'u'
    ]);

    it('should return the whole domain', () => {

      const domain: number[] = settlingBoard.getDomain(4, new Lord('r'));

      expect(domain.length).toEqual(6);
      expect(domain).toContain(0);
      expect(domain).toContain(1);
      expect(domain).toContain(2);
      expect(domain).toContain(4);
      expect(domain).toContain(5);
      expect(domain).toContain(9);
    });

    it('should return only the settlement', () => {

      const domain: number[] = settlingBoard.getDomain(14, new Lord('r'));

      expect(domain.length).toEqual(0);
    });

  });

  describe('getNeighbours', () => {

    const settlingBoard = new Board([
      'p', 'p', 'p', 'p',
      's', 'p', 'p', 'p',
      'p', 'p', 'p', 'p',
      'p', 'p', 's', 'p'
    ], [
      'r', 'r', 'r', 'u',
      'r', 'r', 'u', 'u',
      'u', 'r', 'u', 'u',
      'u', 'u', 'r', 'u'
    ]);

    it('should return 4 neighbours', () => {
      const neighbours = settlingBoard.getNeighbours(settlingBoard.regions[5]);

      expect(neighbours.length).toEqual(4);
      expect(neighbours).toContain(settlingBoard.regions[1]);
      expect(neighbours).toContain(settlingBoard.regions[4]);
      expect(neighbours).toContain(settlingBoard.regions[6]);
      expect(neighbours).toContain(settlingBoard.regions[9]);
    });

    it('should return 3 neighbours', () => {
      const neighbours = settlingBoard.getNeighbours(settlingBoard.regions[2]);

      expect(neighbours.length).toEqual(4);
      expect(neighbours).toContain(settlingBoard.regions[1]);
      expect(neighbours).toContain(settlingBoard.regions[3]);
      expect(neighbours).toContain(settlingBoard.regions[6]);
      expect(neighbours).toContain(Region.UNCHARTED);
    });

    it('should return 2 neighbours', () => {
      const neighbours = settlingBoard.getNeighbours(settlingBoard.regions[0]);

      expect(neighbours.length).toEqual(4);
      expect(neighbours).toContain(settlingBoard.regions[1]);
      expect(neighbours).toContain(settlingBoard.regions[4]);
      expect(neighbours).toContain(Region.UNCHARTED);
    });
  });

  xit('should compute needed header letters', () => {
    const sources: string[] = ['SEDL!', 'Land worths and costs'];

    const allChars: Set<string> = new Set<string>();

    from(sources).pipe(
      flatMap(source => from(source.split('')))
    ).subscribe(char => allChars.add(char));

    const result: string = [...allChars]
      .filter(value => value !== ' ')
      .reduce((previousValue, currentValue) => previousValue.concat(currentValue), '');

    console.log(result);
  });

});
