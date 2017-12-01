import React, { Component } from 'react';
import { connect } from 'react-redux';
import c from 'classnames';

import {
  filter,
  printType,
  sorting,
} from '../../redux/reducers/search';
import { Dropdown, DropdownItem } from '../Dropdown';
import FilterDropdown from './FilterDropdown';

class FilterToolbar extends Component {
  render() {
    const { className } = this.props;

    return (
      <div className={c('FilterToolbar', className)}>
        <FilterDropdown
          selector={filter.select}
          onChange={filter.set}
          defaultValue={filter.defaultValue}
          items={filter.items}
        />

        <FilterDropdown
          selector={printType.select}
          onChange={printType.set}
          defaultValue={printType.defaultValue}
          items={printType.items}
        />

        <FilterDropdown
          selector={sorting.select}
          onChange={sorting.set}
          defaultValue={sorting.defaultValue}
          items={sorting.items}
        />
      </div>
    );
  }
}

export default FilterToolbar;
