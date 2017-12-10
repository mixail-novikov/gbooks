// TODO remove this imports when SearchParams type have been moved
import type { FilterValue } from '../../../enums/filter';
import type { SortingValue } from '../../../enums/sorting';
import type { PrintTypeValue } from '../../../enums/printType';

// TODO move to state types
export type SearchParams = {
  filter: FilterValue,
  sorting: SortingValue,
  printType: PrintTypeValue,
  term: string,
};
