import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as URLS from './utils/ApplicationUrls';

import { ProtectedRoutes } from './protectedRoutes';
import SignIn from './containers/SignIn';
import Dashboard from './containers/Dashboard';

import './static/css/base.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={URLS.SIGN_PAGE} exact component={SignIn} />
        <ProtectedRoutes path={URLS.DASHBOARD_PAGE} component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
