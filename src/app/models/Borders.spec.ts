import {Borders} from './Borders';

describe('Borders', () => {

  describe('equals', () => {

    it('should return false when other is undefined', () => {
      expect(new Borders(true, true, false, false).equals(undefined)).toBeFalsy();
    });

    it('should return false when other is different', () => {
      const borders = new Borders(true, true, false, false);
      const other = new Borders(true, true, true, false);

      expect(borders.equals(other)).toBeFalsy();
    });

    it('should return true when other is same', () => {
      const borders = new Borders(true, true, false, false);
      const other = new Borders(true, true, false, false);

      expect(borders.equals(other)).toBeTruthy();
    });
  });
});
