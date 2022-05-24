import React, { useState, useEffect, Fragment } from 'react';

import '../static/css/home.css';
import Card from '../common/Card';
import Acrdn from '../common/Accordion';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

import * as CONSTANTS from '../utils/AppConstants';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

function Home(props) {
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const fetchUserPermissions = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_USER_PERMISSION_MAPPING_FOR_AN_USER, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
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
  };

  return (
    <Fragment>
      <div className="homePage">
        <h4>Applications</h4>
        <div className="row">
          {props.user_permissions
            ? props.user_permissions.user_permissions.map((item, index) => {
                if (item['UP_RightToRead']) {
                  return (
                    <Card
                      key={index}
                      appName={item[CONSTANTS.APPLICATION.MA_Name]}
                      db={
                        item[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBName]
                      }
                      type={item['DBT_Name']}
                    />
                  );
                }
              })
            : null}
        </div>
        <h4>Pending for Approval</h4>
        <div className="row">
          <Acrdn data="Hi" />
        </div>
        <h4>Recent Queries</h4>
        <div className="row">
          <Acrdn data="Hi" />
        </div>
      </div>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  user_permissions: state.userPermissions,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_user_permission_rights: (permission_rights) =>
    dispatch(actions.set_all_user_permission_rights(permission_rights)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
