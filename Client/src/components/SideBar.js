import React, { useState, useEffect, Fragment } from 'react';
import { MenuItem } from '../common/MenuItem';

import '../static/css/sideBar.css';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

function Sidebar(props) {
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

  const checkRights = (index) => {
    return props?.screen_rights?.screen_rights?.[index]?.['ASR_RightToView'];
  }

  return (
    <Fragment>
      <div className="sideBar">
        <div className="sideBarUpper">
          <MenuItem
            to="/"
            image={require('../static/images/dummy.png')}
            title="Home"
          />
          {checkRights(3) &&
            <MenuItem
              to="/query"
              image={require('../static/images/dummy.png')}
              title="Query Window"
            />
          }
          {checkRights(1) &&
            <MenuItem
              to="/application"
              image={require('../static/images/dummy.png')}
              title="Add Application"
            />
          }
          {checkRights(2) &&
            <MenuItem
              to="/database"
              image={require('../static/images/dummy.png')}
              title="Add Database"
            />
          }
          {checkRights(0) &&
            <MenuItem
              to="/user"
              image={require('../static/images/dummy.png')}
              title="User Window"
            />
          }
          {checkRights(3) &&
            <MenuItem
              to="/draft"
              image={require('../static/images/dummy.png')}
              title="Open Draft Queries"
            />
          }
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
