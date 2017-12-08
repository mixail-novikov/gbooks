import createTransformFunction from './axiosCreateTransformFunction';

describe('createTransformFunction', () => {
  it('must be defined as a function', () => {
    expect(createTransformFunction).toBeDefined();
    expect(createTransformFunction).toBeInstanceOf(Function);
  });

  it('must return function', () => {
    expect(createTransformFunction()).toBeInstanceOf(Function);
  });

  describe('Transformation', () => {
    let startTime;
    let func;

    beforeEach(() => {
      startTime = Date.now();
      func = createTransformFunction(startTime);
    });

    it('must throw error if data not passed', () => {
      expect(() => func()).toThrow();
    });

    it('must throw error if totalItems is falsy', () => {
      expect(() => func({})).toThrow();
      expect(() => func({ totalItems: 0 })).toThrow();
    });

    it('must convert totalItems to Number type', () => {
      const actualResult = func({ totalItems: '1' });
      expect(actualResult.totalItems).toEqual(1);
    });

    it('must pass through items', () => {
      const items = [1, 2];
      const actualResult = func({ totalItems: 1, items });
      expect(actualResult.items).toBe(items);
    });

    it('must compute responseTime', () => {
      const finishTime = Date.now() + 1000;
      const actualResult = func({ totalItems: 1 }, {}, finishTime);
      expect(actualResult.responseTime).toEqual(finishTime - startTime);
    });
  });
});
