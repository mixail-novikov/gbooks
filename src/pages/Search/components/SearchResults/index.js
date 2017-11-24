import React, { Component } from 'react';
import c from 'classnames';
import { string } from 'prop-types';

import './style.css';

class SearchResults extends Component {
  static propTypes = {
    className: string,
  };

  render() {
    const { className } = this.props;

    return (
      <div className={c('SearchResults', className)}>
        About 450,000 results
      </div>
    );
  }
}

export default SearchResults;
