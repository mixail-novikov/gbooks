import React, { Component } from 'react';
import SearchForm from '../SearchForm';
import AppLogo from '../AppLogo';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppLogo />
        <SearchForm />
      </div>
    );
  }
}

export default App;
