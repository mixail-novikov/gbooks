import { flow } from 'lodash';

import { selectPrintType, selectSearchFilter, selectSorting } from '../search';
import {
  filter as filterEnum,
  sorting as sortingEnum,
  printType as printTypeEnum,
} from '../../../enums';

const selectPanel = state => state.filterPanel;

const selectIsTouched = flow(selectPanel, panelState => panelState.touched);
const selectIsVisible = flow(selectPanel, panelState => panelState.visible);

const computeFilterPanelVisibility = (state) => {
  const isPrintTypeSelected = selectPrintType(state) !== printTypeEnum.defaultValue;
  const isFilterSelected = selectSearchFilter(state) !== filterEnum.defaultValue;
  const isSortingSelected = selectSorting(state) !== sortingEnum.defaultValue;

  return isPrintTypeSelected || isFilterSelected || isSortingSelected;
};

export const selectFilterPanelVisibility = (state) => {
  if (selectIsTouched(state)) {
    return selectIsVisible(state);
  }

  return computeFilterPanelVisibility(state);
};
