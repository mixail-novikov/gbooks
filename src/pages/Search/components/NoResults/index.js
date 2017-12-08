import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resultsSelectors, runSearch } from '../../../../redux/reducers/search';
import './style.css';

class NoResults extends Component {
  render() {
    const { searchTerm } = this.props;

    return (
      <div className="NoResults">
        <p>Your search - <strong>{searchTerm}</strong> - did not match any book results. <a href="#">Reset search tools</a></p>
        <p>Suggestions:</p>
        <ul>
          <li>Make sure that all words are spelled correctly.</li>
          <li>Try different keywords.</li>
          <li>Try more general keywords.</li>
          <li>Try fewer keywords.</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: resultsSelectors.selectNoResultsTerm(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoResults);
