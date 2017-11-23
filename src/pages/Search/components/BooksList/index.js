import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';

import './style.css';

import Book from '../Book';
import { selectBooks } from '../../../../redux/reducers/books';

class BooksList extends Component {
  static propTypes = {
    books: array,
  };

  render() {
    const { books } = this.props;
    return (
      <div className="BooksList">
        {books.map(book => <Book key={book.id} {...book} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: selectBooks(state),
});

export default connect(
  mapStateToProps,
)(BooksList);
