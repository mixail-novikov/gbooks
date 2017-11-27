import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setSearchFilter, filterMap, filterDefaultValue,
  setPrintType, printTypeMap, printTypeDefaultValue,
  setSorting, sortingMap, sortingDefaultValue,
} from '../../../redux/reducers/newSearch';
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
        <Dropdown value={filterValue} defaultValue={filterDefaultValue} onChange={onChangeFilter}>
          {filterMap.map(item => (
            <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
          ))}
        </Dropdown>

        <Dropdown value={printTypeValue} defaultValue={printTypeDefaultValue} onChange={onChangePrintType}>
          {printTypeMap.map(item => (
            <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
          ))}
        </Dropdown>

        <Dropdown value={sortingValue} defaultValue={sortingDefaultValue} onChange={onChangeSorting}>
          {sortingMap.map(item => (
            <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
          ))}
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterValue: state.newSearch.filter,
    printTypeValue: state.newSearch.printType,
    sortingValue: state.newSearch.orderBy,
  }
};

const mapDispatchToProps = {
  onChangeFilter: setSearchFilter,
  onChangePrintType: setPrintType,
  onChangeSorting: setSorting,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterDropdown);
