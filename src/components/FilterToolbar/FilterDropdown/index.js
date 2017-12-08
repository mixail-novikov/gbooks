import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dropdown, DropdownItem } from '../../Dropdown';

class FilterDropdown extends Component {
  render() {
    const {
      value, onChange, defaultValue, items,
    } = this.props;

    return (
      <Dropdown value={value} defaultValue={defaultValue} onChange={onChange}>
        {items.map(item => (
          <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
        ))}
      </Dropdown>
    );
  }
}

const mapStateToProps = (state, { selector }) => ({
  value: selector(state),
});

const mapDispatchToProps = (dispatch, { onChange }) => ({
  onChange: value => dispatch(onChange(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterDropdown);
