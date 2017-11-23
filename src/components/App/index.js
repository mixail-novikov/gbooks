import React, { Component } from 'react';
import SearchForm from '../SearchForm';
import AppLogo from '../AppLogo';
import AppIntro from '../AppIntro';

import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppLogo className="App__logo" />
        <SearchForm className="App__search-form" />
        <AppIntro className="App__intro" />
      </div>
    );
  }
}

export default App;
