import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startStoreSync, stopStoreSync } from '../../redux/reducers/newSearch';

import Header from './components/Header';
import SearchResults from './components/SearchResults';
import BooksList from './components/BooksList';
import SpeechRecognitionPopup from './components/SpeechRecognitionPopup';

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
    return (
      <div className="SearchPage">
        <Header />
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

const mapDispatchToProps = {
  startStoreSync,
  stopStoreSync,
};

export default connect(
  null,
  mapDispatchToProps
)(Search);
