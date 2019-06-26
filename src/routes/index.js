import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '@pages/login';

let routes = (<Switch>
  <Route path="/" exact component={Login} />
  <Redirect to="/index" />
  <Route path="/login" component={Login} />
  <Route path="/index" component={Login} />
</Switch>);

export default routes;
