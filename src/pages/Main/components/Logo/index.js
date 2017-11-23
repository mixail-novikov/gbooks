import React, { Component } from 'react';
import { string } from 'prop-types';
import c from 'classnames';

import logoPath from './logo.png';
import './style.css';

class Logo extends Component {
  static propTypes = {
    className: string,
  }

  render() {
    return (
      <div className={c('Logo', this.props.className)}>
        <img className="Logo-image" src={logoPath} />
        <div className="Logo-text">Books</div>
      </div>
    );
  }
}

export default Logo;
