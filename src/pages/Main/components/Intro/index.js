import React from 'react';
import c from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

const Intro = ({ className }) => (
  <div className={c('Intro', className)}>
    <p className="Intro__p">Search the world&amp;s most comprehensive index of full-text books.</p>
    <a className="Intro__library-link" href="https://books.google.com/books">My library</a>
  </div>
);

Intro.propTypes = {
  className: PropTypes.string,
};

Intro.defaultProps = {
  className: '',
};

export default Intro;
