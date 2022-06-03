import React, { useState, useEffect, Fragment } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddApplication from '../components/AddApplication';
import AddDatabase from '../components/AddDatabase';
import AddUser from '../components/UserWindow';
import Home from '../components/Home';
import Navbar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import ScreenRights from '../components/ScreenRights';
import DatabaseRights from '../components/DatabaseRights';
import DraftQueries from '../components/DraftQueries';
import History from '../components/History';
import QueryWindow from '../components/QueryWindow';
import * as actions from '../store/actions/Actions';
import * as BACKEND_URLS from '../utils/BackendUrls';
import * as APPLICATION_URLS from '../utils/ApplicationUrls';

import '../static/css/dashboard.css';
import '../static/css/table.css';

function Dashboard(props) {
  const history = useHistory();
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.db_user.user == null) {
      if (localStorage.getItem('token')) {
        axios
          .get(BACKEND_URLS.GET_USER_DETAILS, {
            headers: { token: localStorage.getItem('token') },
          })
          .then((res) => {
            if (res.status === 200) {
              if (props.db_user.is_authentication === false) {
                props.login_success();
              }
              props.set_db_user(res.data.data[0]);
            }
          })
          .catch(function (error) {
            if (error.response) {
              setError(error.response.data.message);
            }
          });
      } else {
        history.push(APPLICATION_URLS.SIGN_PAGE);
      }
    }
  }, []);
  return (
    <Fragment>
      <div className="dashboard">
        <Navbar />
        <div className="dashboardContainer">
          <Sidebar />
          <div className="dashboardContent">
            <Switch>
              <Route
                exact
                path={APPLICATION_URLS.QUERY_WINDOW}
                component={QueryWindow}
              />
              <Route
                exact
                path={APPLICATION_URLS.APPLICATION_PAGE}
                component={AddApplication}
              />
              <Route
                exact
                path={APPLICATION_URLS.DATABASE_PAGE}
                component={AddDatabase}
              />
              <Route
                exact
                path={APPLICATION_URLS.SCREEN_RIGHTS}
                component={ScreenRights}
              />
              <Route
                exact
                path={APPLICATION_URLS.DB_RIGHTS}
                component={DatabaseRights}
              />
              <Route
                exact
                path={APPLICATION_URLS.USER_WINDOW}
                component={AddUser}
              />
              <Route
                exact
                path={APPLICATION_URLS.DRAFT_QUERIES_WINDOW}
                component={DraftQueries}
              />
              <Route
                exact
                path={APPLICATION_URLS.HISTORY_WINDOW}
                component={History}
              />
              <Route
                exact
                path={APPLICATION_URLS.DASHBOARD_PAGE}
                component={Home}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  db_user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  login_success: () => dispatch(actions.login_success()),
  set_db_user: (user) => dispatch(actions.set_db_user(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
