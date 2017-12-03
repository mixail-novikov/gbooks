// @flow
import axios from 'axios';

import type { SearchParams } from './transformers/types';
import { transformResponse, searchParamsToGoogle} from './transformers';

export default (
  searchParams: SearchParams,
  startTime: number = Date.now()
) => axios({
  url: 'https://www.googleapis.com/books/v1/volumes',
  params: searchParamsToGoogle(searchParams),
  transformResponse: transformResponse(startTime),
});
