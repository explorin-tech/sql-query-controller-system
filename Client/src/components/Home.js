import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import '../static/css/home.css';
import Card from '../common/Card';
import Acrdn from '../common/Accordion';

import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as BACKEND_URLS from '../utils/BackendUrls';

import * as CONSTANTS from '../utils/AppConstants';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

function Home(props) {
  toast.configure();
  const [queriesAwaitingApproval, setQueriesAwaitingApproval] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const history = useHistory();

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
          toast.error(
            `Error while fetching user permissions rights, please try again. ${err.response.data.message}`,
            { autoClose: 2000 }
          );
        }
      });
  };

  const fetchQueriesAwaitingApprovalFromUser = () => {
    axios
      .get(BACKEND_URLS.GET_QUERIES_AWAITING_APPROVAL, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setQueriesAwaitingApproval(res.data.data);
          if (res.data.data.length == 1) {
            history.push(`/query/${res.data.data[0]['Q_ID']}`);
          }
        }
      })
      .catch((err) => {
        toast.error(
          `Error while fetching queries awaiting for your approval :  ${err.response.data.message}`,
          { autoClose: 2000 }
        );
      });
  };

  const fetchRecentQueries = () => {
    axios
      .get(BACKEND_URLS.GET_RECENT_QUERIES, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setRecentQueries(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(
          `Error while fetching recent queries :  ${err.response.data.message}`,
          {
            autoClose: 2000,
          }
        );
      });
  };

  useEffect(() => {
    fetchUserPermissions();
    fetchQueriesAwaitingApprovalFromUser();
    fetchRecentQueries();
  }, []);

  return (
    <Fragment>
      <div className="homePage">
        <div className="row">
          <Acrdn
            data={queriesAwaitingApproval}
            heading={'Queries Pending for Approval'}
          />
        </div>
        <div className="row">
          <Acrdn data={recentQueries} heading={'Recent Queries'} />
        </div>
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
        <br />
        <br />
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
