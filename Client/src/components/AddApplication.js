import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import AddModal from '../common/AddModal';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

import * as CONSTANTS from '../utils/AppConstants';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';
import EditModal from '../common/EditModal';

function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="searchTable">
      <span className="headData"> Application </span>{' '}
      <input
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="  Search"
      />
    </span>
  );
}

const PopulateUsers = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <option
            key={user[CONSTANTS.USER.U_ID]}
            value={user[CONSTANTS.USER.U_ID]}
          >
            {user[CONSTANTS.USER.U_FirstName]} {user[CONSTANTS.USER.U_LastName]}{' '}
            ({user[CONSTANTS.USER.UT_Name]})
          </option>
        );
      })}
    </>
  );
};

function AddApplication(props) {
  const [values, setValues] = useState({
    applicationID: '',
    applicationName: '',
    owner1: '',
    owner2: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
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

  const fetchAllApplicationsForAnUser = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_APPLICATIONS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_applications(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllApplicationsForAnUser();
  }, []);

  useEffect(() => {
    setFilteredData(props.applications.applications);
  }, [props.applications.applications]);

  const [filteredData, setFilteredData] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Application Name',
        accessor: 'MA_Name',
        filterable: true,
      },
      {
        Header: 'Owner 1',
        accessor: 'MA_Owner1',
        filterable: true,
      },
      {
        Header: 'Owner 2',
        accessor: 'MA_Owner2',
        filterable: true,
      },
    ],
    []
  );

  const data = useMemo(() => filteredData, [filteredData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = tableInstance;

  const { globalFilter } = state;

  const handleAddApplication = (e) => {
    e.preventDefault();
    axios
      .post(
        BACKEND_URLS.ADD_AN_APPLICATION,
        {
          application: {
            application_name: values.applicationName,
            owner_1: values.owner1,
            owner_2: values.owner2,
          },
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          fetchAllApplicationsForAnUser();
          setAddModalShow(false);
          setValues({
            applicationID: '',
            applicationName: '',
            owner1: '',
            owner2: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectEditApplication = (application) => {
    setValues({
      applicationID: application[CONSTANTS.APPLICATION.MA_ID],
      applicationName: application[CONSTANTS.APPLICATION.MA_Name],
      owner1: application[CONSTANTS.APPLICATION.MA_Owner1],
      owner2: application[CONSTANTS.APPLICATION.MA_Owner2],
    });
    setEditModalShow(true);
  };

  const handleEditApplication = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_AN_APPLICATION,
        {
          application: {
            application_id: values.applicationID,
            application_name: values.applicationName,
            owner_1: values.owner1,
            owner_2: values.owner2,
          },
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          fetchAllApplicationsForAnUser();
          setEditModalShow(false);
          setValues({
            applicationID: '',
            applicationName: '',
            owner1: '',
            owner2: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteApplication = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_AN_APPLICATION, {
        params: {
          application_id: values.applicationID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          fetchAllApplicationsForAnUser();
          setEditModalShow(false);
          setValues({
            applicationID: '',
            applicationName: '',
            owner1: '',
            owner2: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Application"
          >
            <form onSubmit={handleAddApplication}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <input
                        type="text"
                        onChange={handleChange('applicationName')}
                        value={values.applicationName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Owner 1</span>
                      <select
                        onChange={handleChange('owner1')}
                        value={values.owner1}
                      >
                        <option value={null}>-- SELECT USER --</option>
                        {props.users ? (
                          <PopulateUsers users={props.users.users} />
                        ) : null}
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Owner 2</span>
                      <select
                        onChange={handleChange('owner2')}
                        value={values.owner2}
                      >
                        <option value={null}>-- SELECT USER --</option>
                        {props.users ? (
                          <PopulateUsers users={props.users.users} />
                        ) : null}
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
                            'Master Application Window'
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
            title="Edit Application"
          >
            <form onSubmit={handleEditApplication}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <input
                        type="text"
                        onChange={handleChange('applicationName')}
                        value={values.applicationName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Owner 1</span>
                      <select
                        onChange={handleChange('owner1')}
                        value={values.owner1}
                      >
                        <option value={null}>-- SELECT USER --</option>
                        {props.users ? (
                          <PopulateUsers users={props.users.users} />
                        ) : null}
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Owner 2</span>
                      <select
                        onChange={handleChange('owner2')}
                        value={values.owner2}
                      >
                        <option value={null}>-- SELECT USER --</option>
                        {props.users ? (
                          <PopulateUsers users={props.users.users} />
                        ) : null}
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
                            'Master Application Window'
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
                onClick={handleDeleteApplication}
                className="redButton"
                disabled={
                  props.screen_rights
                    ? props.screen_rights.screen_rights.find(
                        (each_screen_right) => {
                          if (
                            each_screen_right['AS_Name'] ===
                            'Master Application Window'
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
          <div>
            <button
              className="blueButton"
              onClick={() => {
                setAddModalShow(true);
                setValues({
                  applicationID: '',
                  applicationName: '',
                  owner1: '',
                  owner2: '',
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Application
            </button>
          </div>
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
                      selectEditApplication(row.original);
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
  applications: state.applications,
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_applications: (applications) =>
    dispatch(actions.set_applications(applications)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddApplication);
