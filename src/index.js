import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';

import Pages from './pages';
// import registerServiceWorker from './registerServiceWorker';
import createStore from './redux';

const { store, runSaga, history } = createStore();
runSaga();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Pages />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'),
);

// registerServiceWorker();
