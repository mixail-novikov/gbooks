import React, { Component } from 'react';
import c from 'classnames';
import { string } from 'prop-types';

import './style.css';

class Intro extends Component {
  static propTypes = {
    className: string,
  };

  render() {
    return (
      <div className={c('Intro', this.props.className)}>
        <p className="Intro__p">Search the world's most comprehensive index of full-text books.</p>
        <a className="Intro__library-link" href="https://books.google.com/books">My library</a>
      </div>
    );
  }
}

export default Intro;
