import { items, defaultValue } from '../../../enums/filter';
import { createSearchParamSetter, createSearchParamSelector } from './';

export { items, defaultValue};

const allowedValues = items.map(item => item.key);

// export const set = createSearchParamSetter('filter');
// export const select = createSearchParamSelector('filter');
