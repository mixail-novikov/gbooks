import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, string } from 'prop-types';
import c from 'classnames';

import './style.css';

import Book from '../Book';
import { selectBooks } from '../../../../redux/reducers/books';

class BooksList extends Component {
  static propTypes = {
    books: array,
    className: string,
  };

  render() {
    const { books, className } = this.props;
    return (
      <div className={c('BooksList', className)}>
        {books.map((book, id) => <Book className="BooksList__item" key={id} {...book} />)}
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
