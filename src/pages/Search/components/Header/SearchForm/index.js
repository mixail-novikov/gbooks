import React, { Component } from 'react';
import { connect } from 'react-redux';
import c from 'classnames';
import PropTypes from 'prop-types';

import { selectTerm, setTerm, runSearch } from '../../../../../redux/reducers/search';
import { openSpeechPopup } from '../../../../../redux/reducers/speech';

import './style.css';
import microfoneIconPath from './microfone.png';
import SearchIcon from './SearchIcon';

class SearchForm extends Component {
  static propTypes = {
    term: PropTypes.string,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    onTermChange: PropTypes.func,
    onMicrophoneClick: PropTypes.func,
  };

  static defaultProps = {
    term: '',
    className: '',
    onSubmit: () => {},
    onTermChange: () => {},
    onMicrophoneClick: () => {},
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  handleTermChange = (e) => {
    this.props.onTermChange(e.target.value);
  }

  render() {
    const { term, onMicrophoneClick, className } = this.props;

    return (
      <form
        className={c('SearchFormInner', className)}
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
            onClick={onMicrophoneClick}
          >
            <img
              alt="Speech Recognition"
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
}

const mapStateToProps = state => ({
  term: selectTerm(state),
});

const mapDispatchToProps = {
  onTermChange: setTerm,
  onSubmit: runSearch,
  onMicrophoneClick: openSpeechPopup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);
