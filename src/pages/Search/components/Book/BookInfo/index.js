import React, { Component } from 'react';
import { array, string } from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

class BookInfo extends Component {
  static propTypes = {
    authors: array,
    year: string,
    previewLink: string,
  };

  render() {
    const { authors, year, previewLink } = this.props;

    if ((!authors || !authors.length) && !year && !previewLink) {
      return null;
    }

    return (
      <p className="BookInfo">
        {authors && authors.length > 0 && <span className="BookInfo__item">{this.renderAuthors()}</span>}
        {year && <span className="BookInfo__item">{year}</span>}
        <span className="BookInfo__item">
          {previewLink ? <a target="_blank" href={previewLink}>Preview</a> : 'No Preview'}
        </span>
      </p>
    )
  }

  renderAuthors() {
    const { authors } = this.props;

    return authors.map((author, id) => (
      <span key={id}>
        <Link to={`/search?q=inauthor:${encodeURIComponent(author)}`} onClick={this.handleAuthorClick(author)}>{author}</Link>
        {' '}
      </span>
    ));
  }

  handleAuthorClick = (author) => (e) => {
    e.preventDefault();
    console.log('search author ' + author);
  };
}

export default BookInfo;
