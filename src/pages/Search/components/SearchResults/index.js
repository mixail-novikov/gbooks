import React from 'react';
import c from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectResultsCount, selectResponseTime } from '../../../../redux/reducers/results';

import './style.css';

const SearchResults = ({ className, count, time }) => (
  <div className={c('SearchResults', className)}>
    About {count} results ({(time / 1000).toFixed(2)} seconds)
  </div>
);

SearchResults.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

SearchResults.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  count: selectResultsCount(state),
  time: selectResponseTime(state),
});

export default connect(mapStateToProps)(SearchResults);
