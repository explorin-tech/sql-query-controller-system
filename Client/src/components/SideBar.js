import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { MenuItem } from '../common/MenuItem';
import * as BACKEND_URLS from '../utils/BackendUrls';
import * as actions from '../store/actions/Actions';

import '../static/css/sideBar.css';

function Sidebar(props) {
  const history = useHistory();
  const [error, setError] = useState('');

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
        if (err.response) {
          setError(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    fetchScreenRights();
  }, []);
  return (
    <Fragment>
      <div className="sideBar">
        <div className="sideBarUpper">
          {props.screen_rights.screen_rights[0] ? (
            <>
              <MenuItem
                to="/"
                image={require('../static/images/dummy.png')}
                title="Home"
              />
              {props.screen_rights.screen_rights.find((each_screen_right) => {
                if (each_screen_right['AS_Name'] === 'Query Window') {
                  return each_screen_right['ASR_RightToView'];
                }
              }) ? (
                <MenuItem
                  to="/query"
                  image={require('../static/images/dummy.png')}
                  title="Query Window"
                />
              ) : null}

              {props.screen_rights.screen_rights.find((each_screen_right) => {
                if (
                  each_screen_right['AS_Name'] === 'Master Application Window'
                ) {
                  return each_screen_right['ASR_RightToView'];
                }
              }) ? (
                <MenuItem
                  to="/application"
                  image={require('../static/images/dummy.png')}
                  title="Add Application"
                />
              ) : null}

              {props.screen_rights.screen_rights.find((each_screen_right) => {
                if (
                  each_screen_right['AS_Name'] === 'Database Mapping Window'
                ) {
                  return each_screen_right['ASR_RightToView'];
                }
              }) ? (
                <MenuItem
                  to="/database"
                  image={require('../static/images/dummy.png')}
                  title="Add Database"
                />
              ) : null}

              {props.screen_rights.screen_rights.find((each_screen_right) => {
                if (each_screen_right['AS_Name'] === 'Screen Rights') {
                  return each_screen_right['ASR_RightToView'];
                }
              }) ? (
                <MenuItem
                  to="/screen_rights"
                  image={require('../static/images/dummy.png')}
                  title="Screen Rights"
                />
              ) : null}

              {props.screen_rights.screen_rights.find((each_screen_right) => {
                if (each_screen_right['AS_Name'] === 'User Permissions') {
                  return each_screen_right['ASR_RightToView'];
                }
              }) ? (
                <MenuItem
                  to="/database_rights"
                  image={require('../static/images/dummy.png')}
                  title="Database Rights"
                />
              ) : null}

              {props.screen_rights.screen_rights.find((each_screen_right) => {
                if (each_screen_right['AS_Name'] === 'User Window') {
                  return each_screen_right['ASR_RightToView'];
                }
              }) ? (
                <MenuItem
                  to="/user"
                  image={require('../static/images/dummy.png')}
                  title="User Window"
                />
              ) : null}

              {props.screen_rights.screen_rights.find((each_screen_right) => {
                if (each_screen_right['AS_Name'] === 'Query Window') {
                  return each_screen_right['ASR_RightToView'];
                }
              }) ? (
                <MenuItem
                  to="/draft_queries"
                  image={require('../static/images/dummy.png')}
                  title="Open Draft Queries"
                />
              ) : null}
            </>
          ) : null}
        </div>
        <div className="sideBarLower">
          <button
            className="blueButton"
            onClick={() => history.push('/history')}
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
