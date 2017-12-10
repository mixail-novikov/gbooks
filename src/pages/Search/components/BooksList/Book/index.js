import React, { Component } from 'react';
import { array, string } from 'prop-types';
import c from 'classnames';
import BookInfo from './BookInfo';

import './style.css';

class Book extends Component {
  static propTypes = {
    id: string,
    title: string,
    description: string,
    authors: array,
    year: string,
    imageUrl: string,
    previewLink: string,
    link: string,
    greenLink: string,
    className: string,
  };

  render() {
    const {
      title, description, imageUrl, link, greenLink, className, authors, year, previewLink,
    } = this.props;

    return (
      <div className={c('Book', className)}>
        <h2 className="Book__title">
          <a target="_blank" href={link}>{title}</a>
        </h2>
        <div className="Book__content">
          {imageUrl && <div className="Book__image-holder">
            <img className="Book__image" src={imageUrl} />
          </div>}
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
