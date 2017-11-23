import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchForm from '../Main/components/SearchForm';
import BooksList from './components/BooksList';

import './style.css';

class Search extends Component {
  render() {
    return (
      <div className="Search">
        <SearchForm />
        <BooksList />
      </div>
    );
  }
}

export default Search;
