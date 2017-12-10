import React, { Component } from 'react';
import c from 'classnames';
import { string } from 'prop-types';
import { connect } from 'react-redux';

import { selectors } from '../../../../redux/reducers/search/results';

import './style.css';

class SearchResults extends Component {
  static propTypes = {
    className: string,
  };

  render() {
    const { className, count, time } = this.props;

    return (
      <div className={c('SearchResults', className)}>
        About {count} results ({(time / 1000).toFixed(2)} seconds)
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: selectors.selectResultsCount(state),
  time: selectors.selectResponseTime(state),
});

export default connect(mapStateToProps)(SearchResults);
