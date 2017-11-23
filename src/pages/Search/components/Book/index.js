import React, { Component } from 'react';
import { shape, object, string } from 'prop-types';
import sanitizeHtml from 'sanitize-html';

import './style.css';

class Book extends Component {
  static propTypes = {
    volumeInfo: shape({
      title: string,
    }),
    searchInfo: shape({
      textSnippet: string,
    }),
  };

  render() {
    const { volumeInfo={}, searchInfo={} } = this.props;
    const { title, subtitle, authors=[], publishedDate, previewLink } = volumeInfo;
    const { textSnippet } = searchInfo;

    const description = sanitizeHtml(textSnippet, {
      allowedTags: ['b'],
    });

    return (
      <div className="Book">
        <h2>
          <a target="_blank" href={previewLink}>{title}:{subtitle}</a>
        </h2>
        {authors.join(', ')} - {publishedDate} <a target="_blank" href={previewLink}>Preview</a>
        <br />
        <p dangerouslySetInnerHTML={{__html: description}}/>
      </div>
    );
  }
}

export default Book;
