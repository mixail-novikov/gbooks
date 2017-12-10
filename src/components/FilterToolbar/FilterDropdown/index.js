import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Dropdown, DropdownItem } from '../../Dropdown';

const FilterDropdown = ({
  value,
  onChange,
  defaultValue,
  items,
}) => (
  <Dropdown value={value} defaultValue={defaultValue} onChange={onChange}>
    {items.map(item => (
      <DropdownItem key={item.key} value={item.key}>{item.value}</DropdownItem>
    ))}
  </Dropdown>
);

FilterDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

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
