import React, { Component } from 'react';
import c from 'classnames';
import { string } from 'prop-types';

import './style.css';

class AppIntro extends Component {
  static propTypes = {
    className: string,
  };

  render() {
    return (
      <div className={c('AppIntro', this.props.className)}>
        <p className="AppIntro__p">Search the world's most comprehensive index of full-text books.</p>
        <a className="AppIntro__library-link" href="https://books.google.com/books">My library</a>
      </div>
    );
  }
}

export default AppIntro;
