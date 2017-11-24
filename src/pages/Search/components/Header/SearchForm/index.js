import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setSearchTerm, selectTerm, runSearch } from '../../../../../redux/reducers/search';

import './style.css';
import microfoneIconPath from './microfone.png';
import SearchIcon from './SearchIcon';

class SearchForm extends Component {
  render() {
    const { term } = this.props;

    return (
      <form
        className="SearchFormInner"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="SearchFormInner__input"
          value={term}
          onChange={this.handleTermChange}
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
    this.props.onSubmit();
  };

  handleTermChange = (e) => {
    this.props.onTermChange(e.target.value);
  }
}

const mapStateToProps = (state) => ({
  term: selectTerm(state),
});

const mapDispatchToProps = {
  onTermChange: setSearchTerm,
  onSubmit: runSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
