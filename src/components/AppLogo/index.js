import React, { Component } from 'react';
import { string } from 'prop-types';

import logoPath from './logo.png';
import './style.css';

class AppLogo extends Component {
  render() {
    return (
      <div className="AppLogo">
        <img className="AppLogo-image" src={logoPath} />
        <div className="AppLogo-text">Books</div>
      </div>
    );
  }
}

export default AppLogo;
