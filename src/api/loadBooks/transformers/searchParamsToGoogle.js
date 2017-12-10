import type { FilterValue } from '../../../enums/filter';
import type { PrintTypeValue } from '../../../enums/printType';
import type { SortingValue } from '../../../enums/sorting';
import type { SearchParams } from './types';

type MapType<Value, GoogleValue> = $ObjMap<$Exact<{[key: Value]: string}>, () => GoogleValue>;

/** filter * */
type GoogleFilterValue = void | "partial" | "full" | "free-ebooks" | "paid-ebooks" | "ebooks";
// Если ошибка типизации, проверить что mapFilter содержит все ключи, перечисленные в FilterValue
const mapFilter: MapType<FilterValue, GoogleFilterValue> = {
  all: undefined,
  partial: 'partial',
  ebooks: 'ebooks',
  'free-ebooks': 'free-ebooks',
};
const transformFilter = (value: FilterValue): GoogleFilterValue => mapFilter[value];

/** printType * */
type GooglePrintTypeValue = void | "all" | "books" | "magazines";
// Если ошибка типизации, проверить что mapPrintType содержит все ключи, перечисленные в PrintTypeValue
const mapPrintType: MapType<PrintTypeValue, GooglePrintTypeValue> = {
  all: undefined,
  books: 'books',
  magazines: 'magazines',
};

const transformPrintType = (value: PrintTypeValue): GooglePrintTypeValue => mapPrintType[value];

/** sorting * */
type GoogleOrderByValue = void | "relevance" | "newest";
// Если ошибка типизации, проверить что mapSorting содержит все ключи, перечисленные в SortingValue
const mapSorting: MapType<SortingValue, GoogleOrderByValue> = {
  relevance: undefined,
  newest: 'newest',
};

const transformSorting = (value: SortingValue): GoogleOrderByValue => mapSorting[value];

/** main transformation * */
type GoogleParams = {
  filter: GoogleFilterValue,
  printType: GooglePrintTypeValue,
  orderBy: GoogleOrderByValue,
  q: string,
}

function transformSearchParamsToGoogle(searchParams: SearchParams): GoogleParams {
  if (!searchParams || !searchParams.term) {
    throw Error('term is requires');
  }

  return {
    filter: transformFilter(searchParams.filter),
    orderBy: transformSorting(searchParams.sorting),
    printType: transformPrintType(searchParams.printType),
    q: searchParams.term,
  };
}

export default transformSearchParamsToGoogle;
