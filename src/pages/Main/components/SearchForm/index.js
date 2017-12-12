import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import { connect } from 'react-redux';

import { selectTerm, setTerm, runSearch } from '../../../../redux/reducers/search';

import searchIcon from './search.png';
import './style.css';

class SearchForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    term: PropTypes.string,
    onTermChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    term: '',
    onTermChange: () => {},
    onSubmit: () => {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  handleTermChange = (e) => {
    this.props.onTermChange(e.target.value);
  };

  render() {
    const { className, term } = this.props;

    /* eslint-disable jsx-a11y/no-autofocus */
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
          <img alt="Search Button" className="SearchForm__button-icon" src={searchIcon} />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  term: selectTerm(state),
});

const mapDispatchToProps = {
  onTermChange: setTerm,
  onSubmit: runSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);
