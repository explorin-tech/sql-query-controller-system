import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { useTable, useSortBy } from 'react-table';

import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as BACKEND_URLS from '../utils/BackendUrls';

import * as CONSTANTS from '../utils/AppConstants';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

import 'react-tabs/style/react-tabs.css';

import '../static/css/tabs.css';

const PopulateUsers = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <option key={user[CONSTANTS.USER.U_ID]} value={JSON.stringify(user)}>
            {user[CONSTANTS.USER.U_FirstName]} {user[CONSTANTS.USER.U_LastName]}{' '}
            ({user[CONSTANTS.USER.UT_Name]})
          </option>
        );
      })}
    </>
  );
};

function DatabaseRights(props) {
  toast.configure();
  const [filteredData, setFilteredData] = useState([]);

  const [values, setValues] = useState({
    selectedUser: JSON.stringify(props.users.selected_user),
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Application Name',
        accessor: 'MA_Name',
        filterable: true,
      },
      {
        Header: 'Database Name',
        accessor: 'DBAM_DBName',
        filterable: true,
      },
      {
        Header: 'Database Type',
        accessor: 'DBT_Name',
        filterable: true,
      },
      {
        Header: 'Right to Read',
        accessor: 'UP_RightToRead',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Right to Create',
        accessor: 'UP_RightToCreate',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Right to Insert',
        accessor: 'UP_RightToInsert',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Right to Update',
        accessor: 'UP_RightToUpdate',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Right to Delete',
        accessor: 'UP_RightToDelete',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Approval not Required',
        accessor: 'UP_ApprovalNotRequired',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
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

  const fetchAllUserPermissions = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_USER_PERMISSION_MAPPING_FOR_AN_USER, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_user_permissions(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserPermissionsForSelectedUser = () => {
    if (props.users.selected_user) {
      axios
        .get(BACKEND_URLS.GET_ALL_USER_PERMISSION_MAPPING_FOR_AN_USER, {
          params: {
            user_id: props.users.selected_user['U_ID'],
          },
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(`Successfully fetched the user permission rights.`, {
              autoClose: 2000,
            });
            props.set_user_permissions_for_selected_user(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFilteredData([]);
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
        toast.error(`Failed to fetch list of all users. ${err}`, {
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    fetchUserPermissionsForSelectedUser();
  }, [props.users.selected_user]);

  useEffect(() => {
    if (values.selectedUser && values.selectedUser != '') {
      props.set_selected_user(JSON.parse(values.selectedUser));
    } else {
      props.set_selected_user(null);
    }
  }, [values.selectedUser]);

  useEffect(() => {
    if (props.users.selected_user != null) {
      setFilteredData(
        props.user_permissions.user_permissions_for_selected_user
      );
    }
  }, [props.user_permissions.user_permissions_for_selected_user]);

  useEffect(() => {
    fetchAllUsers();
    fetchAllDatabases();
    fetchAllUserPermissions();
    fetchUserPermissionsForSelectedUser();
  }, []);

  const handleChangeInput = (e, row, cell) => {
    filteredData.map((each_permission_rights_row) => {
      if (each_permission_rights_row == row) {
        row[cell.column.id] = e.target.checked;
      }
    });
    setFilteredData(filteredData);
  };

  const handleEditUserPermissions = () => {
    axios
      .put(
        BACKEND_URLS.EDIT_USER_PERMISSIONS_MAPPING_FOR_AN_USER,
        {
          user_permissions_mapping_object: filteredData,
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            `Successfully edited user permissions rights for selected user.`,
            {
              autoClose: 2000,
            }
          );
          fetchAllUserPermissions();
          fetchUserPermissionsForSelectedUser();
        }
      })
      .catch((err) => {
        toast.err(
          `Failed to edit screen rights for selected user, please try again. ${err}`,
          {
            autoClose: 2000,
          }
        );
      });
  };

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
        </div>
        <div className="buttonDiv">
          <button
            className="greenButton"
            onClick={handleEditUserPermissions}
            disabled={
              props.screen_rights
                ? props.screen_rights.screen_rights[0]
                  ? props.screen_rights.screen_rights.find(
                      (each_screen_right) => {
                        if (
                          each_screen_right['AS_Name'] ===
                          CONSTANTS.APPLICATION_SCREENS.DATABASE_RIGHTS_WINDOW
                        ) {
                          return !each_screen_right['ASR_RightToEdit'];
                        }
                      }
                    )
                  : true
                : true
            }
          >
            Save Changes
          </button>
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
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          onClick={(e) => {
                            handleChangeInput(e, row.original, cell);
                          }}
                        >
                          {cell.render('Cell')}
                        </td>
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
  databases: state.databases,
  users: state.users,
  user_permissions: state.userPermissions,
  screen_rights: state.applicationScreenRights,
  db_user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  set_databases: (databases) => dispatch(actions.set_databases(databases)),
  set_user_permissions: (user_permissions) =>
    dispatch(actions.set_all_user_permission_rights(user_permissions)),
  set_user_permissions_for_selected_user: (user_permission_rights) =>
    dispatch(
      actions.set_all_user_permission_rights_for_selected_user(
        user_permission_rights
      )
    ),
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_selected_user: (user) => dispatch(actions.set_user(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseRights);
