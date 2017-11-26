import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setSearchFilter, filterMap, runSearch } from '../../redux/reducers/newSearch';

import { Dropdown, DropdownItem } from '../Dropdown';

class FilterComponent extends Component {
  constructor(props) {
    super(props);
    if (this.props.initValue !== this.props.value) {
      this.props.onChange(this.props.initValue);
    }
  }

  componentWillReceiveProps({initValue}) {
    if (this.props.initValue !== initValue) {
      this.props.onChange(initValue);
    }
  }

  render() {
    const { initValue, value, onChange, runSearch } = this.props;

    return (
      <div>
        <Dropdown value={value} defaultValue="full" onChange={onChange}>
          {filterMap.map(item => (
            <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
          ))}
        </Dropdown>
        <br />
        <button onClick={runSearch}>RUN</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const searchParams = new URLSearchParams(state.router.location.search);
  const filterFromUrl = searchParams.get('filter');

  return {
    initValue: filterFromUrl,
    value: state.newSearch.filter,
  }
};

const mapDispatchToProps = {
  onChange: setSearchFilter,
  runSearch,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterComponent);
