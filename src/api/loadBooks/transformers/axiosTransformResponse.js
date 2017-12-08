import axios from 'axios';
import createTransformFunction from './axiosCreateTransformFunction';
/*
TODO пришлось изменить дефенишены

оригинальный
transformResponse?: Array<<U>(data: T) => U>;

Идея U понятна - предсказать возвращаемый результат, но

Судя по описанию из доки https://flow.org/en/docs/types/generics/#toc-generics-track-values-around
Flow запрещает переопределять переменную которая описывается через generic.
Данных этого типа не приходит в функцию.
Flow запрещает создание.
Замкнутый круг. Или я что-то не понял.

*/

export default startTime => [].concat(
  axios.defaults.transformResponse,
  createTransformFunction(startTime),
);
