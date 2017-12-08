import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { resultsSelectors, isFilterPanelVisible, runSearch } from '../../redux/reducers/search';
import { selectLoadingStatus } from '../../redux/reducers/search/selectors';
import { hasBooks } from '../../redux/reducers/books';

import Header from './components/Header';
import SearchResults from './components/SearchResults';
import BooksList from './components/BooksList';
import SpeechRecognitionPopup from './components/SpeechRecognitionPopup';
import NoResults from './components/NoResults';
import FilterToolbar from '../../components/FilterToolbar';

import spinnerPath from './spinner.svg';

import './style.css';

class Search extends Component {
  render() {
    const {
      noResults, hasBooks, isLoading, isFilterPanelVisible,
    } = this.props;

    return (
      <div className="SearchPage">
        {isLoading && <div className="SearchPage__preloader"><img src={spinnerPath} /></div>}
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
  noResults: resultsSelectors.selectNoResultsStatus(state),
  hasBooks: hasBooks(state),
  isLoading: selectLoadingStatus(state),
  isFilterPanelVisible: isFilterPanelVisible(state),
});

const mapDispatchToProps = {
  runSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
