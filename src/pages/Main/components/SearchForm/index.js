import React, { Component } from 'react';
import { string } from 'prop-types';
import c from 'classnames';

import searchIcon from './search.png';
import './style.css';

class SearchForm extends Component {
  static propTypes = {
    className: string,
  };

  render() {
    return (
      <form className={c('SearchForm', this.props.className)} onSubmit={this.handleSubmit}>
        <input className="SearchForm__input" autoFocus type="text" size="68" />
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
