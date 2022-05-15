import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ProtectedRoutes } from './protectedRoutes';
import SignIn from './components/SignIn';
import Dashboard from './containers/Dashboard';

import './static/css/base.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <ProtectedRoutes path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
