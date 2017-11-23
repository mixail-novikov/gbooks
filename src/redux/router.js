import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export const routerMiddleware = createRouterMiddleware(history);
