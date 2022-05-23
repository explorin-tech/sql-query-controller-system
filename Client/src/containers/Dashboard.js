import React, { useState, useEffect, Fragment } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

import AddApplication from '../components/AddApplication';
import AddDatabase from '../components/AddDatabase';
import AddUser from '../components/UserWindow';
import Home from '../components/Home';
import Navbar from '../components/NavBar';
import Sidebar from '../components/SideBar';

import '../static/css/dashboard.css';
import '../static/css/table.css';

import * as APPLICATION_URLS from '../utils/ApplicationUrls';

function Dashboard(props) {
  const [error, setError] = useState('');

  const history = useHistory();

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

              // set user into redux
              props.set_db_user(res.data.data[0]);

              // set screen rights into redux

              axios
                .get(BACKEND_URLS.GET_ALL_SCREEN_RIGHTS_FOR_AN_USER, {
                  headers: {
                    token: localStorage.getItem('token'),
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    props.set_all_screen_rights_for_an_user(res.data.data);

                    // now fetch user permissions

                    axios
                      .get(
                        BACKEND_URLS.GET_ALL_USER_PERMISSION_MAPPING_FOR_AN_USER,
                        {
                          headers: {
                            token: localStorage.getItem('token'),
                          },
                        }
                      )
                      .then((res) => {
                        if (res.status === 200) {
                          // set user permissions in redux
                          props.set_all_user_permission_rights(res.data.data);
                        }
                      })
                      .catch((err) => {
                        if (err.response) {
                          setError(error.response.data.message);
                        }
                      });
                  }
                })
                .catch((err) => {
                  if (err.response) {
                    setError(err.response.data.message);
                  }
                });
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
    console.log(props.screen_rights);
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
                path={APPLICATION_URLS.HOME_PAGE}
                render={(props) => <Home />}
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
                path={APPLICATION_URLS.USER_WINDOW}
                component={AddUser}
              />
              {/* <Route exact path="/query" component={AddUser} />
            <Route exact path="/draft" component={AddUser} /> */}
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
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  login_success: () => dispatch(actions.login_success()),
  set_db_user: (user) => dispatch(actions.set_db_user(user)),
  set_all_user_permission_rights: (permission_rights) =>
    dispatch(actions.set_all_user_permission_rights(permission_rights)),
  set_all_screen_rights_for_an_user: (screen_rights) =>
    dispatch(actions.set_all_screen_rights_for_an_user(screen_rights)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
