import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import BookInfo from './BookInfo';

import './style.css';

class Book extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.string,
    imageUrl: PropTypes.string,
    previewLink: PropTypes.string,
    link: PropTypes.string,
    greenLink: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    description: '',
    authors: [],
    year: '',
    imageUrl: '',
    previewLink: '',
    link: '',
    greenLink: '',
    className: '',
  }

  render() {
    const {
      title, description, imageUrl, link, greenLink, className, authors, year, previewLink,
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div className={c('Book', className)}>
        <h2 className="Book__title">
          <a target="_blank" href={link}>{title}</a>
        </h2>
        <div className="Book__content">
          {imageUrl &&
            <div className="Book__image-holder">
              <img alt={`${title} cover`} className="Book__image" src={imageUrl} />
            </div>
          }
          <div className="Book__text">
            {greenLink && <p className="Book__green-link">{greenLink}</p>}
            <BookInfo authors={authors} year={year} previewLink={previewLink} />
            {description && <p className="Book__description" dangerouslySetInnerHTML={{ __html: description }} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
