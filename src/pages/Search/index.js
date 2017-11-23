import React, { Component } from 'react';

import SearchForm from '../Main/components/SearchForm';
import BooksList from './components/BooksList';

import './style.css';

class Search extends Component {
  render() {
    return (
      <div className="Search">
        <SearchForm />
        <BooksList className="Search__books-list" />
      </div>
    );
  }
}

export default Search;
