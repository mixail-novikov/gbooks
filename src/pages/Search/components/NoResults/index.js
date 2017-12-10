import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resultsSelectors } from '../../../../redux/reducers/search';
import './style.css';

const NoResults = ({ searchTerm }) => (
  <div className="NoResults">
    <p>
      Your search - <strong>{searchTerm}</strong> - did not match any book results.
      <a href="/">Reset search tools</a>
    </p>
    <p>Suggestions:</p>
    <ul>
      <li>Make sure that all words are spelled correctly.</li>
      <li>Try different keywords.</li>
      <li>Try more general keywords.</li>
      <li>Try fewer keywords.</li>
    </ul>
  </div>
);

NoResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  searchTerm: resultsSelectors.selectNoResultsTerm(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoResults);
