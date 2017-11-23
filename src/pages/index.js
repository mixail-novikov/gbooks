import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import MainPage from './Main';
import SearchPage from './Search';

class Pages extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/search" component={SearchPage} />
      </Switch>
    );
  }
}

export default Pages;
