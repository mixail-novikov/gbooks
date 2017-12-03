import { searchParamsToGoogle, transformResponse } from './';

describe('searchParamsToGoogle', () => {
  it('must be defined as a function', () => {
    expect(searchParamsToGoogle).toBeDefined();
    expect(searchParamsToGoogle).toBeInstanceOf(Function)
  });
})

describe('transformResponse', () => {
  it('must be defined as a function', () => {
    expect(transformResponse).toBeDefined();
    expect(transformResponse).toBeInstanceOf(Function)
  });
})
