import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "../common/components/navBar";
import Sidebar from "../common/components/sideBar";
import AddApplication from "../components/addApplication";
import Home from "../components/home";

import "../static/css/dashboard.css";

export default function Dashboard() {

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboardContainer">
        <Sidebar />
        <div className="dashboardContent">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home />}
            />
            <Route exact path="/application" component={AddApplication} />
            {/* <Route exact path="/tasks/:id" component={TaxPage} /> */}
          </Switch>
        </div>
      </div>
    </div>
  );
}
