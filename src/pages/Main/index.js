import React from 'react';

import SearchForm from './components/SearchForm';
import Logo from './components/Logo';
import Intro from './components/Intro';

import './style.css';

const Main = () => (
  <div className="MainPage">
    <Logo className="MainPage__logo" />
    <SearchForm className="MainPage__search-form" />
    <Intro className="MainPage__intro" />
  </div>
);

export default Main;
