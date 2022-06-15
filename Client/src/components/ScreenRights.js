import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { useTable, useSortBy } from 'react-table';
import { connect } from 'react-redux';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as BACKEND_URLS from '../utils/BackendUrls';
import * as actions from '../store/actions/Actions';

import * as CONSTANTS from '../utils/AppConstants';

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

function ScreenRights(props) {
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
        Header: 'Screen Name',
        accessor: 'AS_Name',
        filterable: true,
      },
      {
        Header: 'Right to View',
        accessor: 'ASR_RightToView',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Right to Add',
        accessor: 'ASR_RightToAdd',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Right to Edit',
        accessor: 'ASR_RightToEdit',
        filterable: true,
        Cell: (e) => <input type="checkbox" defaultChecked={e.value} />,
      },
      {
        Header: 'Right to Delete',
        accessor: 'ASR_RightToDelete',
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

  const fetchAllScreenRights = () => {
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
          `Error while fetching user screen rights, please try again. ${err}`,
          { autoClose: 2000 }
        );
      });
  };

  const fetchScreenRightsForSelectedUser = () => {
    if (props.users.selected_user) {
      axios
        .get(BACKEND_URLS.GET_ALL_SCREEN_RIGHTS_FOR_AN_USER, {
          params: {
            user_id: props.users.selected_user['U_ID'],
          },
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(
              `Successfully fetched screen rights for selected user.`,
              { autoClose: 2000 }
            );
            props.set_all_screen_rights_for_selected_user(res.data.data);
          }
        })
        .catch((err) => {
          // toast.error(
          //   `Error while fetching screen rights for selected user, please try again. ${err}`,
          //   { autoClose: 2000 }
          // );
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
        toast.err(
          `Error while fetching list of users to populate user dropdown. ${err}`,
          {
            autoClose: 2000,
          }
        );
      });
  };

  useEffect(() => {
    fetchScreenRightsForSelectedUser();
  }, [props.users.selected_user]);

  useEffect(() => {
    fetchAllUsers();
    fetchAllScreenRights();
    fetchScreenRightsForSelectedUser();
  }, []);

  useEffect(() => {
    if (props.users.selected_user != null) {
      setFilteredData(props.screen_rights.screen_rights_for_selected_user);
    }
  }, [props.screen_rights.screen_rights_for_selected_user]);

  const handleChangeInput = (e, row, cell) => {
    filteredData.map((each_screen_rights_row) => {
      if (each_screen_rights_row == row) {
        row[cell.column.id] = e.target.checked;
      }
    });
    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (values.selectedUser && values.selectedUser != '') {
      props.set_selected_user(JSON.parse(values.selectedUser));
    } else {
      props.set_selected_user(null);
    }
  }, [values.selectedUser]);

  const handleEditScreenRights = () => {
    axios
      .put(
        BACKEND_URLS.EDIT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
        {
          screen_rights_mapping_object: filteredData,
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
            `Successfully edited screen rights for selected user.`,
            {
              autoClose: 2000,
            }
          );
          fetchScreenRightsForSelectedUser();
        }
      })
      .catch((err) => {
        toast.err(
          `FAiled to edit screen rights for selected user, please try again. ${err}`,
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
          {props.db_user.user ? (
            props.db_user.user['UT_Name'] === 'AD' ? (
              <button className="greenButton" onClick={handleEditScreenRights}>
                Save Changes
              </button>
            ) : null
          ) : (
            <button
              className="greenButton"
              onClick={handleEditScreenRights}
              disabled={
                props.screen_rights
                  ? props.screen_rights.screen_rights[0]
                    ? props.screen_rights.screen_rights.find(
                        (each_screen_right) => {
                          if (
                            each_screen_right['AS_Name'] ===
                            CONSTANTS.APPLICATION_SCREENS.SCREEN_RIGHTS_WINDOW
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
          )}
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
  users: state.users,
  screen_rights: state.applicationScreenRights,
  db_user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_screen_rights_for_an_user: (screen_rights) =>
    dispatch(actions.set_all_screen_rights_for_an_user(screen_rights)),
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_selected_user: (user) => dispatch(actions.set_user(user)),
  set_all_screen_rights_for_selected_user: (screen_rights) =>
    dispatch(actions.set_all_screen_rights_for_selected_user(screen_rights)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenRights);
