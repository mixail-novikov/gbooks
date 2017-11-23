import React, { Component } from 'react';
import { string } from 'prop-types';
import c from 'classnames';

import logoPath from './logo.png';
import './style.css';

class AppLogo extends Component {
  static propTypes = {
    className: string,
  }

  render() {
    return (
      <div className={c('AppLogo', this.props.className)}>
        <img className="AppLogo-image" src={logoPath} />
        <div className="AppLogo-text">Books</div>
      </div>
    );
  }
}

export default AppLogo;
