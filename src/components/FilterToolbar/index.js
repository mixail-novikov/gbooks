import React, { Component } from 'react';

import FilterDropdown from './FilterDropdown';

class FilterToolbar extends Component {
  render() {
    return (
      <div className="FilterToolbar">
        <FilterDropdown />
      </div>
    );
  }
}

export default FilterToolbar;
