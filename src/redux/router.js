import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const basename = process.env.NODE_ENV === 'production'
  ? '/gbooks'
  : '';

export const history = createHistory({
  basename,
});

export const routerMiddleware = createRouterMiddleware(history);
