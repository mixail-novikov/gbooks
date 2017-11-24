import React, { Component } from 'react';
import { connect } from 'react-redux';

import { restoreSearchState } from '../../redux/reducers/search';

import SearchForm from '../Main/components/SearchForm';
import BooksList from './components/BooksList';

import './style.css';

class Search extends Component {
  componentDidMount() {
    this.props.restoreSearchState();
  }

  componentDidUpdate({location}) {
    if (this.props.location.search !== location.search) {
      this.props.restoreSearchState()
    }
  }

  render() {
    return (
      <div className="Search">
        <SearchForm />
        <BooksList className="Search__books-list" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { location }) => ({
  restoreSearchState: () => dispatch(restoreSearchState(location.search)),
});

export default connect(
  null,
  mapDispatchToProps
)(Search);
