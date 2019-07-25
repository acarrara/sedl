import {Economy} from './Economy';

describe('Economy', () => {

  describe('worth', () => {

    it('should return every land type worth', () => {
      expect(Economy.worth('m')).toEqual(3);
      expect(Economy.worth('f')).toEqual(2);
      expect(Economy.worth('p')).toEqual(1);
      expect(Economy.worth('w')).toEqual(1);
      expect(Economy.worth('h')).toEqual(1);
      expect(Economy.worth('s')).toEqual(0);
    });
  });

  describe('sustenanceCost', () => {

    it('should return every land type sustenance cost', () => {
      expect(Economy.sustenanceCost('m')).toEqual(10);
      expect(Economy.sustenanceCost('f')).toEqual(6);
      expect(Economy.sustenanceCost('p')).toEqual(4);
      expect(Economy.sustenanceCost('w')).toEqual(6);
      expect(Economy.sustenanceCost('h')).toEqual(6);
      expect(Economy.sustenanceCost('s')).toEqual(4);
    });
  });

  describe('cost', () => {

    it('should return every land type cost', () => {
      expect(Economy.cost('m', false)).toEqual(10);
      expect(Economy.cost('f', false)).toEqual(6);
      expect(Economy.cost('p', false)).toEqual(4);
      expect(Economy.cost('w', false)).toEqual(6);
      expect(Economy.cost('h', false)).toEqual(6);
      expect(Economy.cost('s', false)).toEqual(0);
    });
  });

  describe('conquerCost', () => {

    it('should return every land type conquer cost when not fortified', () => {
      expect(Economy.conquerCost('m', false)).toEqual(20);
      expect(Economy.conquerCost('f', false)).toEqual(12);
      expect(Economy.conquerCost('p', false)).toEqual(8);
      expect(Economy.conquerCost('w', false)).toEqual(12);
      expect(Economy.conquerCost('h', false)).toEqual(12);
      expect(Economy.conquerCost('s', false)).toEqual(0);
    });

    it('should return every land type conquer cost when fortified', () => {
      expect(Economy.conquerCost('m', true)).toEqual(60);
      expect(Economy.conquerCost('f', true)).toEqual(36);
      expect(Economy.conquerCost('p', true)).toEqual(24);
      expect(Economy.conquerCost('w', true)).toEqual(36);
      expect(Economy.conquerCost('h', true)).toEqual(36);
      expect(Economy.conquerCost('s', true)).toEqual(0);
    });
  });
});
