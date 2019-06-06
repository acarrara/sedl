import {Grid} from './Grid';

describe('Grid', () => {

  describe('getNeighbourhood', () => {

    it('should return neighbourhood when inside the grid', () => {
      const grid: Grid = new Grid(10);

      const neighbourhood = grid.getNeighbourhood(25);

      expect(neighbourhood.length).toEqual(5);
      expect(neighbourhood).toContain(25);
      expect(neighbourhood).toContain(26);
      expect(neighbourhood).toContain(24);
      expect(neighbourhood).toContain(15);
      expect(neighbourhood).toContain(35);
    });

    it('should return neighbourhood when on the grid top border', () => {
      const grid: Grid = new Grid(10);

      const neighbourhood = grid.getNeighbourhood(5);

      expect(neighbourhood.length).toEqual(4);
      expect(neighbourhood).toContain(5);
      expect(neighbourhood).toContain(6);
      expect(neighbourhood).toContain(4);
      expect(neighbourhood).toContain(15);
    });

    it('should return neighbourhood when on the grid bottom border', () => {
      const grid: Grid = new Grid(10);

      const neighbourhood = grid.getNeighbourhood(95);

      expect(neighbourhood.length).toEqual(4);
      expect(neighbourhood).toContain(95);
      expect(neighbourhood).toContain(96);
      expect(neighbourhood).toContain(94);
      expect(neighbourhood).toContain(85);
    });

    it('should return neighbourhood when on the grid west border', () => {
      const grid: Grid = new Grid(10);

      const neighbourhood = grid.getNeighbourhood(10);

      expect(neighbourhood.length).toEqual(4);
      expect(neighbourhood).toContain(10);
      expect(neighbourhood).toContain(11);
      expect(neighbourhood).toContain(0);
      expect(neighbourhood).toContain(20);
    });

    it('should return neighbourhood when next of the grid west border', () => {
      const grid: Grid = new Grid(10);

      const neighbourhood = grid.getNeighbourhood(11);

      expect(neighbourhood.length).toEqual(5);
      expect(neighbourhood).toContain(11);
      expect(neighbourhood).toContain(10);
      expect(neighbourhood).toContain(12);
      expect(neighbourhood).toContain(1);
      expect(neighbourhood).toContain(21);
    });

  });

});
