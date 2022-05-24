import React, { Fragment, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

import * as CONSTANTS from '../utils/AppConstants';

import * as BACKEND_URLS from '../utils/BackendUrls';

import AddModal from '../common/AddModal';
import DbRights from './DatabaseRights';
import ScreenRights from './ScreenRights';

import '../static/css/tabs.css';
import axios from 'axios';

const RenderOptionsForUserTypes = ({ userType }) => {
  if (userType === CONSTANTS.USER_TYPES.ADMIN) {
    return (
      <>
        <option value={CONSTANTS.USER_TYPES.ADMIN}>Admin</option>
        <option value={CONSTANTS.USER_TYPES.APPLICATION_OWNER}>
          Application Owner
        </option>
        <option value={CONSTANTS.USER_TYPES.DEV}>Dev</option>
      </>
    );
  } else if (userType === CONSTANTS.USER_TYPES.APPLICATION_OWNER) {
    return <option value={CONSTANTS.USER_TYPES.DEV}>Dev</option>;
  }
};

const PopulateUsers = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <option key={user[CONSTANTS.USER.U_ID]} value={JSON.stringify(user)}>
            {user[CONSTANTS.USER.U_FirstName]} {user[CONSTANTS.USER.U_LastName]}
          </option>
        );
      })}
    </>
  );
};

function AddUser(props) {
  const [addModalShow, setAddModalShow] = useState(false);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: CONSTANTS.USER_TYPES.DEV,
    isActiveDirectUser: 'TRUE',
    selectedUser: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_AN_USER,
          {
            user: {
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              password: values.password,
              user_type_id: CONSTANTS.USER_TYPE_ID_MAPPING[values.userType],
              is_active: 'TRUE',
              is_active_direct_user: values.isActiveDirectUser,
            },
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            fetchAllUsers();
            setAddModalShow(false);
            setValues({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              userType: CONSTANTS.USER_TYPES.DEV,
              isActiveDirectUser: 'TRUE',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchAllUsers = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_USERS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        props.set_all_users(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (values.selectedUser != '') {
      props.set_selected_user(JSON.parse(values.selectedUser));
    } else {
      props.set_selected_user(null);
    }
  }, [values.selectedUser]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <div>
            <span className="searchTable">
              <span className="headData"> User </span>
              <select
                onChange={handleChange('selectedUser')}
                value={values.selectedUser}
              >
                <option value={''}>-- Select User --</option>
                {props.users ? (
                  <PopulateUsers users={props.users.users} />
                ) : null}
              </select>
            </span>
          </div>
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add User"
          >
            <form onSubmit={handleAddUser}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>First Name</span>
                      <input
                        type="text"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Last Name</span>
                      <input
                        type="text"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Email</span>
                      <input
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Password</span>
                      <input
                        type="password"
                        value={values.password}
                        onChange={handleChange('password')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>User Role</span>
                      <select
                        onChange={handleChange('userType')}
                        value={values.userType}
                      >
                        {props.db_user.user ? (
                          <RenderOptionsForUserTypes
                            userType={
                              props.db_user.user[
                                CONSTANTS.USER_TYPES_FIELD_NAME
                              ]
                            }
                          />
                        ) : null}
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Is Active Direct User</span>
                      <select
                        onChange={handleChange('isActiveDirectUser')}
                        value={values.isActiveDirectUser}
                      >
                        <option value={'TRUE'}>Yes</option>
                        <option value={'FALSE'}>No</option>
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="greenButton" type="submit">
                Save changes
              </button>
            </form>
          </AddModal>
          {props.db_user.user ? (
            <div>
              <button
                className="blueButton"
                onClick={() => setAddModalShow(true)}
                disabled={
                  props.db_user.user[CONSTANTS.USER_TYPES_FIELD_NAME] ===
                  CONSTANTS.USER_TYPES.DEV
                }
              >
                <i className="fas fa-plus"></i> Add User
              </button>
            </div>
          ) : null}
        </div>
        <Tabs>
          <TabList className="groupTabs">
            <Tab>Screen Rights</Tab>
            <Tab>Database Rights</Tab>
          </TabList>
          <div className="tabPanel">
            <TabPanel>
              <ScreenRights />
            </TabPanel>
            <TabPanel>
              <DbRights />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  db_user: state.auth,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_selected_user: (user) => dispatch(actions.set_user(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
