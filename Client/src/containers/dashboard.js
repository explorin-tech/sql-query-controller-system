import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddApplication from '../components/AddApplication';
import AddDatabase from '../components/AddDatabase';
import AddUser from '../components/UserWindow';
import Home from '../components/Home';
import Navbar from '../common/NavBar';
import Sidebar from '../common/SideBar';

import '../static/css/dashboard.css';
import '../static/css/table.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboardContainer">
        <Sidebar />
        <div className="dashboardContent">
          <Switch>
            <Route exact path="/home" render={(props) => <Home />} />
            <Route exact path="/application" component={AddApplication} />
            <Route exact path="/database" component={AddDatabase} />
            <Route exact path="/user" component={AddUser} />
            {/* <Route exact path="/query" component={AddUser} />
            <Route exact path="/draft" component={AddUser} /> */}
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
