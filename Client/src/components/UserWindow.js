import React, { Fragment, useMemo, useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import { useTable, useSortBy } from 'react-table';
import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as CONSTANTS from '../utils/AppConstants';

import * as BACKEND_URLS from '../utils/BackendUrls';

import AddModal from '../common/AddModal';
import EditModal from '../common/EditModal';
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
  } else {
    return (
      <>
        <option value={CONSTANTS.USER_TYPES.DEV}>Dev</option>
      </>
    );
  }
};

function AddUser(props) {
  toast.configure();
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'U_Email',
        filterable: true,
      },
      {
        Header: 'First Name',
        accessor: 'U_FirstName',
        filterable: true,
      },
      {
        Header: 'Last Name',
        accessor: 'U_LastName',
        filterable: true,
      },
      {
        Header: 'User Type',
        accessor: 'UT_Name',
        filterable: true,
      },
      {
        Header: 'Is Active Direct User',
        accessor: 'U_IsActDrtUser',
        filterable: true,
        Cell: (e) => (
          <input disabled type="checkbox" defaultChecked={e.value} />
        ),
      },
      {
        Header: 'Is Active',
        accessor: 'U_IsActive',
        filterable: true,
        Cell: (e) => (
          <input disabled type="checkbox" defaultChecked={e.value} />
        ),
      },
    ],
    [filteredData]
  );

  const data = useMemo(() => filteredData, [filteredData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = tableInstance;

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: CONSTANTS.USER_TYPES.DEV,
    isActive: 'true',
    isActiveDirectUser: 'true',
    selectedUser: JSON.stringify(props.users.selected_user),
    userID: '',
    userTypeID: '',
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
              first_name: values.firstName.trim(),
              last_name: values.lastName.trim(),
              email: values.email.toLowerCase().trim(),
              password: values.password.trim(),
              user_type_id: CONSTANTS.USER_TYPE_ID_MAPPING[values.userType],
              is_active: 'true',
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
            toast.success(`Successfully added new user.`, { autoClose: 2000 });
            fetchAllUsers();
            setAddModalShow(false);
            setValues({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              userType: CONSTANTS.USER_TYPES.DEV,
              isActive: 'true',
              isActiveDirectUser: 'true',
              userTypeID: '',
            });
          }
        })
        .catch((err) => {
          toast.error(`Failed to add new user. ${err.response.data.message}`, {
            autoClose: 2000,
          });
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
        toast.error(
          `Failed to fetch list of all users. ${err.response.data.message}`,
          {
            autoClose: 2000,
          }
        );
      });
  };

  useEffect(() => {
    setFilteredData(props.users.users);
  }, [props.users.users]);

  const selectEditUser = (user) => {
    setValues({
      userID: user['U_ID'],
      firstName: user['U_FirstName'],
      lastName: user['U_LastName'],
      email: user['U_Email'],
      password: user['U_Password'],
      userType: user['UT_Name'],
      userTypeID: user['U_UT_ID'],
      isActive: user['U_IsActive'],
      isActiveDirectUser: user['U_IsActDrtUser'],
    });
    setEditModalShow(true);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_USER_DETAILS,
        {
          user: {
            user_id: values.userID,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            email: values.email.toLowerCase().trim(),
            user_type_id: CONSTANTS.USER_TYPE_ID_MAPPING[values.userType],
            is_active: values.isActive,
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
          toast.success(`Successfully edited the user details.`, {
            autoClose: 2000,
          });
          fetchAllUsers();
          setEditModalShow(false);
          setValues({
            userID: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userType: CONSTANTS.USER_TYPES.DEV,
            isActive: 'true',
            isActiveDirectUser: 'true',
            userTypeID: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit user details, please try again. ${err.response.data.message}`,
          {
            autoClose: 2000,
          }
        );
      });
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_AN_USER, {
        params: {
          user_id: values.userID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the user.`, {
            autoClose: 2000,
          });
          fetchAllUsers();
          setEditModalShow(false);
          setValues({
            userID: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userType: CONSTANTS.USER_TYPES.DEV,
            isActiveDirectUser: 'true',
            isActive: 'true',
            userTypeID: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the user, please try again. ${err.response.data.message}`,
          {
            autoClose: 2000,
          }
        );
      });
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (values.selectedUser && values.selectedUser != '') {
      props.set_selected_user(JSON.parse(values.selectedUser));
    } else {
      props.set_selected_user(null);
    }
  }, [values.selectedUser]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
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
                        required
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
                        required
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
                        required
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
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="submit"
                className="greenButton"
                disabled={
                  props.screen_rights
                    ? props.screen_rights.screen_rights.find(
                        (each_screen_right) => {
                          if (
                            each_screen_right['AS_Name'] ===
                            CONSTANTS.APPLICATION_SCREENS.USER_WINDOW
                          ) {
                            return !each_screen_right['ASR_RightToAdd'];
                          }
                        }
                      )
                    : true
                }
              >
                Save Changes
              </button>
            </form>
          </AddModal>
          <EditModal
            editModalShow={editModalShow}
            setEditModalShow={setEditModalShow}
            title="Edit User"
          >
            <form onSubmit={handleEditUser}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>First Name</span>
                      <input
                        type="text"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        required
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
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Is Active</span>
                      <select
                        onChange={handleChange('isActive')}
                        value={values.isActive}
                      >
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
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
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="submit"
                className="greenButton"
                disabled={
                  props.screen_rights
                    ? props.screen_rights.screen_rights.find(
                        (each_screen_right) => {
                          if (
                            each_screen_right['AS_Name'] ===
                            CONSTANTS.APPLICATION_SCREENS.USER_WINDOW
                          ) {
                            return !each_screen_right['ASR_RightToEdit'];
                          }
                        }
                      )
                    : true
                }
              >
                Save Changes
              </button>
              <button
                onClick={handleDeleteUser}
                className="redButton"
                disabled={
                  props.screen_rights
                    ? props.screen_rights.screen_rights.find(
                        (each_screen_right) => {
                          if (
                            each_screen_right['AS_Name'] ===
                            CONSTANTS.APPLICATION_SCREENS.USER_WINDOW
                          ) {
                            return !each_screen_right['ASR_RightToDelete'];
                          }
                        }
                      )
                    : true
                }
              >
                Delete
              </button>
            </form>
          </EditModal>
          {props.db_user.user ? (
            <div>
              <button
                className="blueButton"
                onClick={() => {
                  setAddModalShow(true);
                  setValues({
                    userID: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    userType: CONSTANTS.USER_TYPES.DEV,
                    isActiveDirectUser: 'true',
                    isActive: 'true',
                    userTypeID: '',
                  });
                }}
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
        <div className="selectTable">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="tableHeading"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                    >
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fas fa-angle-down sortIcon"></i>
                          ) : (
                            <i className="fas fa-angle-up sortIcon"></i>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    onClick={() => {
                      selectEditUser(row.original);
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  db_user: state.auth,
  users: state.users,
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_selected_user: (user) => dispatch(actions.set_user(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
