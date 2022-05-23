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

  const fetchAllDatabases = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_MAPPED_DATABASES, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_databases(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllDatabases();
  }, []);
  return (
    <Fragment>
      <div className="homePage">
        <h4>Applications</h4>
        <div className="row">
          {props.databases
            ? props.databases.databases.map((item, index) => {
                return (
                  <Card
                    key={index}
                    appName={
                      item[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_MA_Name]
                    }
                    db={
                      item[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBName]
                    }
                    type={
                      item[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBT_Name]
                    }
                  />
                );
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
  databases: state.databases,
});

const mapDispatchToProps = (dispatch) => ({
  set_databases: (databases) => dispatch(actions.set_databases(databases)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
