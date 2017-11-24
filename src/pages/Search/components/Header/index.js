import React, { Component } from 'react';
import SearchForm from './SearchForm';

import LogoImage from '../../../../components/Logo';
import './style.css';

class Header extends Component {
  render() {
    return (
      <div className="SearchHeader">
        <div className="SearchHeader__logo-holder">
          <LogoImage className="SearchHeader__logo" />
        </div>
        <div className="SearchHeader__content-holder">
          <SearchForm />
        </div>
      </div>
    );
  }
}

export default Header;
