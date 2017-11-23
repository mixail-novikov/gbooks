import React, { Component } from 'react';
import searchIcon from './search.png';
import './style.css';

class SearchForm extends Component {
  render() {
    return (
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <input className="SearchForm__input" autoFocus type="text" size="66" />
        <button className="SearchForm__button" type="submit">
          <img className="SearchForm__button-icon" src={searchIcon} />
        </button>
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };
}

export default SearchForm;
