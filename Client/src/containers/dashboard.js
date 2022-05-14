import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../common/components/navBar";
import Sidebar from "../common/components/sideBar";
import AddApplication from "../components/addApplication";
import Home from "../components/home";

import "../static/css/dashboard.css";
import "../static/css/table.css";

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
              path="/home"
              render={(props) => <Home />}
            />
            <Route exact path="/application" component={AddApplication} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
