import React, { Component } from 'react';

import SearchForm from './components/SearchForm';
import Logo from './components/Logo';
import Intro from './components/Intro';

import './style.css';

class Main extends Component {
  render() {
    return (
      <div className="MainPage">
        <Logo className="MainPage__logo" />
        <SearchForm className="MainPage__search-form" />
        <Intro className="MainPage__intro" />
      </div>
    );
  }
}

export default Main;
