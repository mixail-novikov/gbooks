import React, { Component } from 'react';
import { string } from 'prop-types';
import c from 'classnames';

import LogoImage from '../../../../components/Logo';
import './style.css';

class Logo extends Component {
  static propTypes = {
    className: string,
  }

  render() {
    return (
      <div className={c('Logo', this.props.className)}>
        <LogoImage className="Logo-image" />
        <div className="Logo-text">Books</div>
      </div>
    );
  }
}

export default Logo;
