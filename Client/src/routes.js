// import { useEffect } from "react";
// import axios from "axios";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ProtectedRoutes } from "./protectedRoutes";
import SignIn from "./components/signIn";
import Dashboard from "./containers/dashboard";

import "./static/base.css";

const Routes = () => {
  // useEffect(() => {
  //   axios
  //     .get("/api/get/applications")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <ProtectedRoutes path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
