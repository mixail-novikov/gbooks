import React, { Component } from 'react';
import c from 'classnames';

import FilterDropdown from './FilterDropdown';

class FilterToolbar extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={c('FilterToolbar', className)}>
        <FilterDropdown />
      </div>
    );
  }
}

export default FilterToolbar;
