import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startStoreSync, stopStoreSync } from '../../redux/reducers/newSearch';
import { selectNoResultsStatus, selectLoadingStatus } from '../../redux/reducers/search';

import Header from './components/Header';
import SearchResults from './components/SearchResults';
import BooksList from './components/BooksList';
import SpeechRecognitionPopup from './components/SpeechRecognitionPopup';
import NoResults from './components/NoResults';
import FilterComponent from '../../components/FilterComponent';


import './style.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.props.startStoreSync();
  }

  componentWillUnmount() {
    this.props.stopStoreSync();
  }

  render() {
    const { noResults, isLoading } = this.props;
    const hasResults = !noResults;

    return (
      <div className="SearchPage">
        {isLoading && <div>L...</div>}
        <Header />
        <FilterComponent />
        <div className="SearchPage__content">
          {hasResults && (
            <div>
              <SearchResults className="SearchPage__results" />
              <BooksList className="SearchPage__books-list" />
            </div>
          )}
          {noResults && <NoResults />}
        </div>
        <SpeechRecognitionPopup />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  noResults: selectNoResultsStatus(state),
  isLoading: selectLoadingStatus(state),
})

const mapDispatchToProps = {
  startStoreSync,
  stopStoreSync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
