import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getSearchLinkByAuthor } from '../../../../../../redux/reducers/search';
import './style.css';

class BookInfo extends Component {
  static propTypes = {
    authors: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.string,
    previewLink: PropTypes.string,
  };

  static defaultProps = {
    authors: [],
    year: '',
    previewLink: '',
  };

  renderAuthors() {
    const { authors } = this.props;

    return authors.map(author => (
      <span key={author}>
        <Link to={getSearchLinkByAuthor(author)}>{author}</Link>
        {' '}
      </span>
    ));
  }

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
    );
  }
}

export default BookInfo;
