import React, { Component } from 'react';
import { string, func } from 'prop-types';
import c from 'classnames';
import { connect } from 'react-redux';

import { setSearchTerm, selectTerm, runSearch } from '../../../../redux/reducers/search';

import searchIcon from './search.png';
import './style.css';

class SearchForm extends Component {
  static propTypes = {
    className: string,
    term: string,
    onTermChange: func,
    onSubmit: func,
  };

  render() {
    const { className, term } = this.props;

    return (
      <form className={c('SearchForm', className)} onSubmit={this.handleSubmit}>
        <input
          value={term}
          onChange={this.handleTermChange}
          className="SearchForm__input"
          autoFocus
          type="text"
          size="68"
        />
        <button className="SearchForm__button" type="submit">
          <img className="SearchForm__button-icon" src={searchIcon} />
        </button>
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  handleTermChange = (e) => {
    this.props.onTermChange(e.target.value);
  };
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
