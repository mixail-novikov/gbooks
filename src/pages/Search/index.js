import React, { Component } from 'react';
import { connect } from 'react-redux';

import { restoreSearchState } from '../../redux/reducers/search';

import Header from './components/Header';
import SearchResults from './components/SearchResults';
import BooksList from './components/BooksList';
import SpeechRecognitionPopup from './components/SpeechRecognitionPopup';

import TestComponent from '../../components/TestComponent';
import FilterComponent from '../../components/FilterComponent';

import './style.css';

class Search extends Component {
  componentDidMount() {
    // this.props.restoreSearchState();
  }

  componentDidUpdate({location}) {
    if (this.props.location.search !== location.search) {
      // this.props.restoreSearchState()
    }
  }

  render() {
    return (
      <div className="SearchPage">
        <Header />
        <TestComponent />
        <FilterComponent />
        <div className="SearchPage__content">
          <SearchResults className="SearchPage__results" />
          <BooksList className="SearchPage__books-list" />
        </div>
        <SpeechRecognitionPopup />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { location }) => ({
  // restoreSearchState: () => dispatch(restoreSearchState(location.search)),
});

export default connect(
  null,
  mapDispatchToProps
)(Search);
