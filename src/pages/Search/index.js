import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startStoreSync, stopStoreSync, runSearch } from '../../redux/reducers/newSearch';
import { selectNoResultsStatus, selectLoadingStatus } from '../../redux/reducers/search';
import { hasBooks } from '../../redux/reducers/books';

import Header from './components/Header';
import SearchResults from './components/SearchResults';
import BooksList from './components/BooksList';
import SpeechRecognitionPopup from './components/SpeechRecognitionPopup';
import NoResults from './components/NoResults';
import FilterComponent from '../../components/FilterComponent';

import spinnerPath from './spinner.svg';

import './style.css';

class Search extends Component {
  render() {
    const { noResults, hasBooks, isLoading } = this.props;

    return (
      <div className="SearchPage">
        {isLoading && <div className="SearchPage__preloader"><img src={spinnerPath} /></div>}
        <Header />
        <FilterComponent />
        <div className="SearchPage__content">
          {hasBooks && (
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
  hasBooks: hasBooks(state),
  isLoading: selectLoadingStatus(state),
})

const mapDispatchToProps = {
  startStoreSync,
  stopStoreSync,
  runSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
