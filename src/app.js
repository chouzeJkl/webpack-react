import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader/root';
import routes from './routes';

const routerConfig = (routes) => {
  return () => (<Router>
    {routes}
  </Router>);
}
export default hot(routerConfig(routes));
