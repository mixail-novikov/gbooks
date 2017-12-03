import searchParamsToGoogle from './searchParamsToGoogle';

describe('searchParamsToGoogle', () => {
  it('must be defined as a function', () => {
    expect(searchParamsToGoogle).toBeDefined();
    expect(searchParamsToGoogle).toBeInstanceOf(Function);
  });

  describe('Throw error cases', () => {
    it('no arguments passed', () => {
      expect(() => searchParamsToGoogle()).toThrow();
    });

    it('term is undefined', () => {
      expect(() => searchParamsToGoogle({})).toThrow();
    })
  });

  describe('Transformaion rules', () => {
    it('regular state', () => {
      const input = {
        filter: "ebooks",
        sorting: "newest",
        printType: "books",
        term: "term"
      }

      const expected = {
        filter: "ebooks",
        orderBy: "newest",
        printType: "books",
        q: "term",
      }

      expect(searchParamsToGoogle(input)).toEqual(expected);
    })

    it('it must transform only known properties', () => {
      const input = {
        filter: "ebooks",
        sorting: "newest",
        printType: "books",
        term: "term",
        "unknownProp": "someValue"
      }

      const expected = {
        filter: "ebooks",
        orderBy: "newest",
        printType: "books",
        q: "term",
      }

      expect(searchParamsToGoogle(input)).toEqual(expected);
    })

    it('it must reset property to undefined if value unknown', () => {
      const input = {
        filter: "unknownValue",
        sorting: "newest",
        printType: "books",
        term: "term"
      }

      const expected = {
        filter: undefined,
        orderBy: "newest",
        printType: "books",
        q: "term",
      }

      expect(searchParamsToGoogle(input)).toEqual(expected);
    })
  })
});
