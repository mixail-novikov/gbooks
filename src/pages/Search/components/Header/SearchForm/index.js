import React, { Component } from 'react';

import './style.css';
import microfoneIconPath from './microfone.png';
import SearchIcon from './SearchIcon';

class SearchForm extends Component {
  render() {
    return (
      <form
        className="SearchFormInner"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="SearchFormInner__input"
        />
        <div className="SearchFormInner__buttons">
          <button
            type="button"
            className="SearchFormInner__button SearchFormInner__button_speech"
          >
            <img
              className="SearchFormInner__search-icon"
              src={microfoneIconPath}
            />
          </button>
          <button
            type="submit"
            className="SearchFormInner__button SearchFormInner__button_search"
          >
            <SearchIcon />
          </button>
        </div>
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };
}

export default SearchForm;
