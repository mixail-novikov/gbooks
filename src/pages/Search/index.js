import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

import { isFilterPanelVisible as isFilterPanelVisibleSelector, runSearch } from '../../redux/reducers/search';
import { selectNoResultsStatus } from '../../redux/reducers/results/selectors';
import { selectLoadingStatus } from '../../redux/reducers/search/selectors';
import { hasBooks as hasBooksSelector } from '../../redux/reducers/books';

import Header from './components/Header';
import SearchResults from './components/SearchResults';
import BooksList from './components/BooksList';
import SpeechRecognitionPopup from './components/SpeechRecognitionPopup';
import NoResults from './components/NoResults';
import FilterToolbar from '../../components/FilterToolbar';

import spinnerPath from './spinner.svg';

import './style.css';

class Search extends Component {
  static propTypes = {
    noResults: PropTypes.bool.isRequired,
    hasBooks: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isFilterPanelVisible: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    console.log('mounted'); // eslint-disable-line
  }

  render() {
    const {
      noResults, hasBooks, isLoading, isFilterPanelVisible,
    } = this.props;

    return (
      <div className="SearchPage">
        {isLoading && <div className="SearchPage__preloader"><img alt="Loading..." src={spinnerPath} /></div>}
        <Header />
        <div className="SearchPage__content">
          {hasBooks && (
            <div>
              <div className="SearchPage__stuff">
                <ReactCSSTransitionGroup
                  transitionName="SearchPage__results-count"
                  transitionEnter
                  transitionEnterTimeout={220}
                  transitionLeave
                  transitionLeaveTimeout={220}
                >
                  {!isFilterPanelVisible && <SearchResults className="SearchPage__results-count" />}
                </ReactCSSTransitionGroup>
                <div className="SearchPage__filter-panel-wrapper">
                  <ReactCSSTransitionGroup
                    transitionName="SearchPage__filter-panel"
                    transitionEnter
                    transitionEnterTimeout={220}
                    transitionLeave
                    transitionLeaveTimeout={220}
                  >
                    {isFilterPanelVisible && <FilterToolbar className="SearchPage__filter-panel" />}
                  </ReactCSSTransitionGroup>
                </div>
              </div>
              <BooksList className="SearchPage__books-list" />
            </div>
          )}
          {noResults && <NoResults />}
        </div>
        <SpeechRecognitionPopup />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noResults: selectNoResultsStatus(state),
  hasBooks: hasBooksSelector(state),
  isLoading: selectLoadingStatus(state),
  isFilterPanelVisible: isFilterPanelVisibleSelector(state),
});

const mapDispatchToProps = {
  runSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
