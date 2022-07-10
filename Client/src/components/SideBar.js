import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MenuItem } from '../common/MenuItem';
import * as BACKEND_URLS from '../utils/BackendUrls';
import * as APPLICATION_URLS from '../utils/ApplicationUrls';
import * as CONSTANTS from '../utils/AppConstants';
import * as actions from '../store/actions/Actions';

import '../static/css/sideBar.css';

function Sidebar(props) {
  toast.configure();
  const history = useHistory();

  const fetchScreenRights = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_SCREEN_RIGHTS_FOR_AN_USER, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_screen_rights_for_an_user(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to fetch screen rights ${err.response.data.message}`,
          {
            autoClose: 2000,
          }
        );
      });
  };

  useEffect(() => {
    fetchScreenRights();
  }, []);
  return (
    <Fragment>
      <div className="sideBar">
        {props.db_user.user ? (
          props.db_user.user['UT_Name'] == 'AD' ? (
            <div className="sideBarUpper">
              {props.screen_rights.screen_rights[0] ? (
                <>
                  <MenuItem
                    to={APPLICATION_URLS.DASHBOARD_PAGE}
                    image={require('../static/images/dummy.png')}
                    title="Home"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.ADD_NEW_QUERY}
                    image={require('../static/images/dummy.png')}
                    title="Add new Query"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.APPLICATION_PAGE}
                    image={require('../static/images/dummy.png')}
                    title="Add Application"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.DATABASE_PAGE}
                    image={require('../static/images/dummy.png')}
                    title="Add Database"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.DATABASE_APPLICATION_MAPPING_PAGE}
                    image={require('../static/images/dummy.png')}
                    title="Application-Database Mappings"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.SCREEN_RIGHTS}
                    image={require('../static/images/dummy.png')}
                    title="Screen Rights"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.DB_RIGHTS}
                    image={require('../static/images/dummy.png')}
                    title="Database Rights"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.USER_WINDOW}
                    image={require('../static/images/dummy.png')}
                    title="User Window"
                  />

                  <MenuItem
                    to={APPLICATION_URLS.DRAFT_QUERIES_WINDOW}
                    image={require('../static/images/dummy.png')}
                    title="Open Draft Queries"
                  />
                </>
              ) : null}
            </div>
          ) : (
            <div className="sideBarUpper">
              {props.screen_rights.screen_rights[0] ? (
                <>
                  <MenuItem
                    to={APPLICATION_URLS.DASHBOARD_PAGE}
                    image={require('../static/images/dummy.png')}
                    title="Home"
                  />
                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS.QUERY_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.ADD_NEW_QUERY}
                      image={require('../static/images/dummy.png')}
                      title="Add new Query"
                    />
                  ) : null}

                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS.MASTER_APPLICATION_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.APPLICATION_PAGE}
                      image={require('../static/images/dummy.png')}
                      title="Add Application"
                    />
                  ) : null}

                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS.MASTER_DATABASE_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.DATABASE_PAGE}
                      image={require('../static/images/dummy.png')}
                      title="Add Databases"
                    />
                  ) : null}

                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS
                          .DATABASE_APPLICATION_MAPPING_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.DATABASE_APPLICATION_MAPPING_PAGE}
                      image={require('../static/images/dummy.png')}
                      title="Application-Database Mappings"
                    />
                  ) : null}

                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS.SCREEN_RIGHTS_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.SCREEN_RIGHTS}
                      image={require('../static/images/dummy.png')}
                      title="Screen Rights"
                    />
                  ) : null}

                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS.SCREEN_RIGHTS_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.DB_RIGHTS}
                      image={require('../static/images/dummy.png')}
                      title="Database Rights"
                    />
                  ) : null}

                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS.USER_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.USER_WINDOW}
                      image={require('../static/images/dummy.png')}
                      title="User Window"
                    />
                  ) : null}

                  {props.screen_rights.screen_rights.find(
                    (each_screen_right) => {
                      if (
                        each_screen_right['AS_Name'] ===
                        CONSTANTS.APPLICATION_SCREENS.QUERY_WINDOW
                      ) {
                        return each_screen_right['ASR_RightToView'];
                      }
                    }
                  ) ? (
                    <MenuItem
                      to={APPLICATION_URLS.DRAFT_QUERIES_WINDOW}
                      image={require('../static/images/dummy.png')}
                      title="Open Draft Queries"
                    />
                  ) : null}
                </>
              ) : null}
            </div>
          )
        ) : null}

        <div className="sideBarLower">
          <button
            className="blueButton"
            onClick={() => history.push(APPLICATION_URLS.HISTORY_WINDOW)}
          >
            History
          </button>
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
  set_all_screen_rights_for_an_user: (screen_rights) =>
    dispatch(actions.set_all_screen_rights_for_an_user(screen_rights)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
