import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as URLS from '../utils/ApplicationUrls';

import AddApplication from '../components/AddApplication';
import AddDatabase from '../components/AddDatabase';
import AddUser from '../components/UserWindow';
import Home from '../components/Home';
import Navbar from '../components/NavBar';
import Sidebar from '../components/SideBar';

import '../static/css/dashboard.css';
import '../static/css/table.css';

export default function Dashboard() {
  return (
    <Fragment>
      <div className="dashboard">
        <Navbar />
        <div className="dashboardContainer">
          <Sidebar />
          <div className="dashboardContent">
            <Switch>
              <Route exact path={URLS.HOME_PAGE} render={(props) => <Home />} />
              <Route
                exact
                path={URLS.APPLICATION_PAGE}
                component={AddApplication}
              />
              <Route exact path={URLS.DATABASE_PAGE} component={AddDatabase} />
              <Route exact path={URLS.USER_WINDOW} component={AddUser} />
              {/* <Route exact path="/query" component={AddUser} />
            <Route exact path="/draft" component={AddUser} /> */}
              <Route exact path={URLS.DASHBOARD_PAGE} component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
