import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  filter,
  printType,
  sorting,
} from '../../../redux/reducers/search';
import { Dropdown, DropdownItem } from '../../Dropdown';

class FilterDropdown extends Component {
  render() {
    const {
      filterValue, onChangeFilter,
      printTypeValue, onChangePrintType,
      sortingValue, onChangeSorting,
    } = this.props;

    return (
      <div>
        <Dropdown value={filterValue} defaultValue={filter.defaultValue} onChange={onChangeFilter}>
          {filter.items.map(item => (
            <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
          ))}
        </Dropdown>

        <Dropdown value={printTypeValue} defaultValue={printType.defaultValue} onChange={onChangePrintType}>
          {printType.items.map(item => (
            <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
          ))}
        </Dropdown>

        <Dropdown value={sortingValue} defaultValue={sorting.defaultValue} onChange={onChangeSorting}>
          {sorting.items.map(item => (
            <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
          ))}
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterValue: filter.select(state),
    printTypeValue: printType.select(state),
    sortingValue: sorting.select(state),
  }
};

const mapDispatchToProps = {
  onChangeFilter: filter.set,
  onChangePrintType: printType.set,
  onChangeSorting: sorting.set,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterDropdown);
