import axios from 'axios';

import loadBooks from './';
import { transformResponse, searchParamsToGoogle } from './transformers';

jest.mock('axios');
jest.mock('./transformers');

describe('loadBooks', () => {
  it('must be defined as a function', () => {
    expect(loadBooks).toBeDefined();
    expect(loadBooks).toBeInstanceOf(Function);
  });

  it('properly run axios', () => {
    const searchParams = {};
    loadBooks(searchParams);

    expect(axios).toHaveBeenCalled();
    expect(searchParamsToGoogle).toHaveBeenCalledWith(searchParams);
    expect(transformResponse).toHaveBeenCalled();
  });
});
