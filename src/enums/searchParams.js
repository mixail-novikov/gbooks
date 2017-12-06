import * as filterEnum from './filter';
import * as sortingEnum from './sorting';
import * as printType from './printType';

// TODO возможно стоит вынести это куда-то, это не enum, хотя функции-хелперы могут лежать рядом
const createToRoute = (items, defaultValue) => (value) => items.includes(value) && defaultValue !== value ? value : undefined;
const createToState = (items, defaultValue) => (value) => items.includes(value) ? value : defaultValue;

const createToRouteAndToState = (items, defaultValue) => ({
  toRoute: createToRoute(items, defaultValue),
  toState: createToRoute(items, defaultValue),
})

export const relation = [{
  routeKey: "fltr",
  stateKey: "filter",
  ...createToRouteAndToState(filterEnum.itemValues, filterEnum.defaultValue),
}, {
  routeKey: "srt",
  stateKey: "sorting",
  ...createToRouteAndToState(sortingEnum.itemValues, sortingEnum.defaultValue),
}, {
  routeKey: "prnt",
  stateKey: "printType",
  ...createToRouteAndToState(printType.itemValues, printType.defaultValue),
}, {
  routeKey: "trm",
  stateKey: "term",
  toState: (value) => String(value),
  toRoute: (value) => value ? value : undefined,
}];
