import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import {
  setPrintType,
  selectPrintType,
  setSorting,
  selectSorting,
  setSearchFilter,
  selectSearchFilter,
} from '../../redux/reducers/search';

import {
  filter as filterEnum,
  printType as printTypeEnum,
  sorting as sortingEnum,
} from '../../enums';

import FilterDropdown from './FilterDropdown';

const FilterToolbar = ({ className }) => (
  <div className={c('FilterToolbar', className)}>
    <FilterDropdown
      selector={selectSearchFilter}
      onChange={setSearchFilter}
      defaultValue={filterEnum.defaultValue}
      items={filterEnum.items}
    />

    <FilterDropdown
      selector={selectPrintType}
      onChange={setPrintType}
      defaultValue={printTypeEnum.defaultValue}
      items={printTypeEnum.items}
    />

    <FilterDropdown
      selector={selectSorting}
      onChange={setSorting}
      defaultValue={sortingEnum.defaultValue}
      items={sortingEnum.items}
    />
  </div>
);

FilterToolbar.propTypes = {
  className: PropTypes.string,
};

FilterToolbar.defaultProps = {
  className: '',
};

export default FilterToolbar;
