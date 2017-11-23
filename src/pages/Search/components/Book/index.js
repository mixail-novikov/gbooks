import React, { Component } from 'react';
import { shape, object, string } from 'prop-types';
import sanitizeHtml from 'sanitize-html';

import './style.css';

class Book extends Component {
  static propTypes = {
    id: string,
    title: string,
    description: string,
    info: string,
    imageUrl: string,
    previewLink: string,
    link: string,
  };

  render() {
    const { title, description, info, imageUrl, previewLink, link } = this.props;

    return (
      <div className="Book">
        <h2>
          <a target="_blank" href={link}>{title}</a>
        </h2>
        {(info || previewLink) && <p>{info} {previewLink ? <a target="_blank" href={previewLink}>Preview</a> : 'No Preview'}</p>}
        {description && <p dangerouslySetInnerHTML={{__html: description}} />}
        <img src={imageUrl} />
      </div>
    );
  }
}

export default Book;
