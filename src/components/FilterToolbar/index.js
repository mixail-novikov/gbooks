import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { Dropdown, DropdownItem } from '../Dropdown';
import FilterDropdown from './FilterDropdown';

class FilterToolbar extends Component {
  render() {
    const { className } = this.props;

    console.log(selectSearchFilter)

    return (
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
  }
}

export default FilterToolbar;
