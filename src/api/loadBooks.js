// @flow
import axios from 'axios';
import { get } from 'lodash';

import type { FilterValue } from '../enums/filter';
import type { SortingValue } from '../enums/sorting';
import type { PrintTypeValue } from '../enums/printType';

type MapType<Value, GoogleValue> = $ObjMap<$Exact<{[key: Value]: string}>, () => GoogleValue>;

/** filter **/
type GoogleFilterValue = void | "partial" | "full" | "free-ebooks" | "paid-ebooks" | "ebooks";
// Если ошибка типизации, проверить что mapFilter содержит все ключи, перечисленные в FilterValue
const mapFilter: MapType<FilterValue, GoogleFilterValue> = {
  "all": undefined,
  "partial": "partial",
  "ebooks": "ebooks",
  "free-ebooks": "free-ebooks",
};

const transformFilterToGoogle = (value: FilterValue): GoogleFilterValue => mapFilter[value];

/** sorting **/
type GoogleOrderByValue = void | "relevance" | "newest";
// Если ошибка типизации, проверить что mapSorting содержит все ключи, перечисленные в SortingValue
const mapSorting: MapType<SortingValue, GoogleOrderByValue> = {
  "relevance": undefined,
  "newest": "newest",
};

const transformSortingToGoogle = (value: SortingValue): GoogleOrderByValue => mapSorting[value];

/** printType **/
type GooglePrintTypeValue = void | "all" | "books" | "magazines";
// Если ошибка типизации, проверить что mapPrintType содержит все ключи, перечисленные в PrintTypeValue
const mapPrintType: MapType<PrintTypeValue, GooglePrintTypeValue> = {
  "all": undefined,
  "books": "books",
  "magazines": "magazines",
};

const transformPrintTypeToGoogle = (value: PrintTypeValue): GooglePrintTypeValue => mapPrintType[value];

/** -------------------------------------------------------- **/

type SearchParams = {
  filter: FilterValue,
  sorting: SortingValue,
  printType: PrintTypeValue,
  term: string,
};

export const transformToGoogleParams = (searchParams: SearchParams) => {
  if (!searchParams.term) {
    throw Error('term is requires');
  }

  return {
    filter: transformFilterToGoogle(searchParams['filter']),
    orderBy: transformSortingToGoogle(searchParams['sorting']),
    printType: transformPrintTypeToGoogle(searchParams['printType']),
    q: searchParams.term,
  };
};

type LoadBooksResponse = {
  responseTime: number,
  items: Array<any>,
  totalItems: number,
}

type ApiResponseData = {
  totalItems: string,
  items: Array<any>,
};

/*
TODO пришлось изменить дефенишены

оригинальный
transformResponse?: Array<<U>(data: T) => U>;

Идея U понятна - предсказать возвращаемый результат, но

Судя по описанию из доки https://flow.org/en/docs/types/generics/#toc-generics-track-values-around
Flow запрещает переопределять переменную которая определена через generic.
У нас, самих данных этого типа не приходит в функцию.
А создать мы не можем, т.к. Flow запрещает.
Замкнутый круг. Или я что-то не понял.

*/
const createTransformFunction = (startTime) => (data) => {
  if (!data || !data.totalItems) {
    throw Error('No results');
  }

  const { items, totalItems } = data;

  return {
    items,
    totalItems: Number(totalItems),
    responseTime: Date.now() - startTime,
  };
};

export const loadBooks = (searchParams: SearchParams, startTime: number = Date.now()) => {
  const params = transformToGoogleParams(searchParams);

  return axios({
    url: 'https://www.googleapis.com/books/v1/volumes',
    params,
    transformResponse: [].concat(axios.defaults.transformResponse, createTransformFunction(startTime)),
  });
};
