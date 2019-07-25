import {Region} from './Region';
import {Lord} from './Lord';
import {Borders} from './Borders';

describe('Region', () => {

  describe('isSettlement', () => {

    it('should return true when it is a settlement', () => {
      expect(new Region('lord', 's', false, false).isSettlement()).toBeTruthy();
    });

    it('should return false when it is not a settlement', () => {
      expect(new Region('lord', 'p', false, false).isSettlement()).toBeFalsy();
    });
  });

  describe('isFortifiable', () => {

    it('should return false when it is a settlement', () => {
      expect(new Region('lord', 's', false, false).isFortifiable()).toBeFalsy();
    });

    it('should return false when it is water', () => {
      expect(new Region('lord', 'w', false, false).isFortifiable()).toBeFalsy();
    });

    it('should return true when it is not a settlement nor water', () => {
      expect(new Region('lord', 'p', false, false).isFortifiable()).toBeTruthy();
    });
  });

  describe('belongsTo', () => {

    it('should return true when it belongs to the Lord', () => {
      const aRegion = new Region('lord', 'p', false, false);
      const aLord = new Lord('lord');

      expect(aRegion.belongsTo(aLord)).toBeTruthy();
    });

    it('should return false when it does not belong to the Lord', () => {
      const aRegion = new Region('lord', 'p', false, false);
      const aLord = new Lord('anotherLord');

      expect(aRegion.belongsTo(aLord)).toBeFalsy();
    });
  });

  describe('copy', () => {

    it('should return a copy of the region', () => {
      const aRegion = new Region('lord', 'p', false, false);

      const copiedRegion = aRegion.copy();

      expect(copiedRegion).toEqual(aRegion);
    });
  });

  describe('hasDifferentOwner', () => {
    const aRegion = new Region('lord', 'p', false, false);

    it('should return false when other region is undefined', () => {
      expect(aRegion.hasDifferentOwner(undefined)).toBeFalsy();
    });

    it('should return true when other region is uncharted', () => {
      expect(aRegion.hasDifferentOwner(Region.UNCHARTED)).toBeTruthy();
    });

    it('should return true when other region has different owner', () => {
      expect(aRegion.hasDifferentOwner(new Region('anotherLord', 'p', false, false))).toBeTruthy();
    });

    it('should return false when other region has same owner', () => {
      expect(aRegion.hasDifferentOwner(new Region('lord', 'p', false, false))).toBeFalsy();
    });
  });

  describe('settle', () => {

    it('should return a new Region with type settlement', () => {
      const aRegion = new Region('lord', 'p', false, false);
      aRegion.borders = new Borders(true, false, true, false);
      const expected = new Region('lord', 's', false, true);
      expected.borders = new Borders(true, false, true, false);

      const settledRegion = aRegion.settle();

      expect(settledRegion).toEqual(expected);
    });
  });

  describe('equals', () => {
    const aRegion = new Region('lord', 'p', false, false);
    aRegion.borders = new Borders(false, true, false, false);

    it('should return false when other is undefined', () => {
      expect(aRegion.equals(undefined)).toBeFalsy();
    });

    it('should return false when other belongs to different lord', () => {
      expect(aRegion.equals(new Region('anotherLord', 'p', false, false))).toBeFalsy();
    });

    it('should return false when other belongs to same lord with different borders', () => {
      const anotherRegion = new Region('lord', 'p', false, false);
      anotherRegion.borders = new Borders(false, false, false, false);
      expect(aRegion.equals(anotherRegion)).toBeFalsy();
    });

    it('should return true when other belongs to same lord and has same borders', () => {
      const anotherRegion = new Region('lord', 'p', false, false);
      anotherRegion.borders = new Borders(false, true, false, false);
      expect(aRegion.equals(anotherRegion)).toBeTruthy();
    });
  });

  describe('tamedBy', () => {
    const aRegion = new Region('lord', 'p', false, false);

    it('should return a new impregnable region with different lord', () => {
      const tamedRegion = aRegion.tamedBy(new Lord('anotherLord'));

      expect(tamedRegion).toEqual(new Region('anotherLord', 'p', false, true));
    });
  });

  describe('sustenanceCost', () => {

    it('should return the sustenance cost', () => {
      const aRegion = new Region('lord', 'p', false, false);

      expect(aRegion.sustenanceCost()).toEqual(4);
    });
  });

  describe('conquerCost', () => {

    it('should return the conquer cost', () => {
      const aRegion = new Region('lord', 'p', false, false);

      expect(aRegion.conquerCost()).toEqual(8);
    });

    it('should return the conquer cost when fortified', () => {
      const aRegion = new Region('lord', 'p', true, false);

      expect(aRegion.conquerCost()).toEqual(24);
    });
  });

  describe('worth', () => {

    it('should return the worth', () => {
      const aRegion = new Region('lord', 'p', true, false);

      expect(aRegion.worth()).toEqual(1);
    });
  });

  describe('cost', () => {

    it('should return the colonization cost', () => {
      const aRegion = new Region('lord', 'p', false, false);

      expect(aRegion.cost()).toEqual(4);
    });
  });
});
