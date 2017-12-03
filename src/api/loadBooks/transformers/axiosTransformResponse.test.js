import transformResponse from './axiosTransformResponse';
import createTransformFunction from './axiosCreateTransformFunction';

jest.mock('./axiosCreateTransformFunction');

describe('axiosTransformResponse', () => {
  it('must be defined as a function', () => {
    expect(transformResponse).toBeDefined();
    expect(transformResponse).toBeInstanceOf(Function);
  });

  it('must return array or transformers', () => {
    const startTime = 1;
    expect(transformResponse(startTime)).toBeInstanceOf(Array);
    expect(createTransformFunction).toHaveBeenCalledWith(startTime);
  });
});
