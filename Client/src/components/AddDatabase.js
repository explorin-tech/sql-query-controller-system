import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { connect } from 'react-redux';
import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';
import * as CONSTANTS from '../utils/AppConstants';
import * as actions from '../store/actions/Actions';
import AddModal from '../common/AddModal';
import EditModal from '../common/EditModal';

function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="searchTable">
      <span className="headData"> Database </span>{' '}
      <input
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="  Search"
      />
    </span>
  );
}

const PopulateApplications = ({ applications }) => {
  return (
    <>
      {applications.map((application) => {
        return (
          <option
            key={application[CONSTANTS.APPLICATION.MA_ID]}
            value={application[CONSTANTS.APPLICATION.MA_ID]}
          >
            {application[CONSTANTS.APPLICATION.MA_Name]}
          </option>
        );
      })}
    </>
  );
};

function AddDatabase(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    databaseApplicationMappingID: '',
    applicationID: '',
    applicationName: '',
    databaseTypeName: '',
    databaseTypeID: '',
    databaseName: '',
    databaseHostName: '',
    databaseConnectionString: '',
    databaseUserName: '',
    databasePassword: '',
    databasePortNumber: '',
  });

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
        Header: 'Database Name',
        accessor: 'DBAM_DBName',
        filterable: true,
      },
      {
        Header: 'Type',
        accessor: 'DBT_Name',
        filterable: true,
      },
      {
        Header: 'Host Name',
        accessor: 'DBAM_DBHostName',
        filterable: true,
      },
      {
        Header: 'Port Number',
        accessor: 'DBAM_DBPortNumber',
        filterable: true,
      },
      {
        Header: 'Connection String',
        accessor: 'DBAM_DBConnectionString',
        filterable: true,
      },
      {
        Header: 'Database User Name',
        accessor: 'DBAM_DBUserName',
        filterable: true,
      },
      {
        Header: 'Database Password',
        accessor: 'DBAM_DBPassword',
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

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const fetchAllApplications = () => {
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
    fetchAllApplications();
    fetchAllDatabases();
  }, []);

  useEffect(() => {
    setFilteredData(props.databases.databases);
  }, [props.databases.databases]);

  const handleAddDatabase = (e) => {
    e.preventDefault();
    axios
      .post(
        BACKEND_URLS.ADD_DATABASE,
        {
          database: {
            application_id: values.applicationID,
            database_name: values.databaseName,
            database_type_id: values.databaseTypeID,
            database_connection_string: values.databaseConnectionString,
            database_port_number: values.databasePortNumber,
            database_host_name: values.databaseHostName,
            database_user_name: values.databaseUserName,
            database_password: values.databasePassword,
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
          fetchAllDatabases();
          setAddModalShow(false);
          setValues({
            databaseApplicationMappingID: '',
            applicationID: '',
            applicationName: '',
            databaseTypeName: '',
            databaseTypeID: '',
            databaseName: '',
            databaseHostName: '',
            databaseConnectionString: '',
            databaseUserName: '',
            databasePassword: '',
            databasePortNumber: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectEditDatabase = (database) => {
    setValues({
      databaseApplicationMappingID:
        database[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_ID],
      applicationID: database[CONSTANTS.APPLICATION.MA_ID],
      databaseTypeID: database['DBT_ID'],
      databaseName:
        database[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBName],
      databaseHostName:
        database[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBHostName],
      databaseConnectionString:
        database[
          CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBConnectionString
        ],
      databaseUserName:
        database[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBUserName],
      databasePassword:
        database[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBPassword],
      databasePortNumber:
        database[CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_DBPortNumber],
    });
    setEditModalShow(true);
  };

  const handleEditDatabase = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_DATABASE,
        {
          database: {
            database_application_mapping_id:
              values.databaseApplicationMappingID,
            application_id: values.applicationID,
            database_name: values.databaseName,
            database_type_id: values.databaseTypeID,
            database_connection_string: values.databaseConnectionString,
            database_port_number: values.databasePortNumber,
            database_host_name: values.databaseHostName,
            database_user_name: values.databaseUserName,
            database_password: values.databasePassword,
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
          fetchAllDatabases();
          setEditModalShow(false);
          setValues({
            databaseApplicationMappingID: '',
            applicationID: '',
            applicationName: '',
            databaseTypeName: '',
            databaseTypeID: '',
            databaseName: '',
            databaseHostName: '',
            databaseConnectionString: '',
            databaseUserName: '',
            databasePassword: '',
            databasePortNumber: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteDatabase = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_DATABASE, {
        params: {
          database_application_mapping_id: values.databaseApplicationMappingID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          fetchAllDatabases();
          setEditModalShow(false);
          setValues({
            databaseApplicationMappingID: '',
            applicationID: '',
            applicationName: '',
            databaseTypeName: '',
            databaseTypeID: '',
            databaseName: '',
            databaseHostName: '',
            databaseConnectionString: '',
            databaseUserName: '',
            databasePassword: '',
            databasePortNumber: '',
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
            title="Add Database"
          >
            <form onSubmit={handleAddDatabase}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <select
                        onChange={handleChange('applicationID')}
                        value={values.applicationID}
                      >
                        <option value={null}> -- SELECT APPLICATION --</option>
                        {props.applications ? (
                          <PopulateApplications
                            applications={props.applications.applications}
                          />
                        ) : null}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Name</span>
                      <input
                        value={values.databaseName}
                        type="text"
                        onChange={handleChange('databaseName')}
                      />
                    </td>
                    <td>
                      <span>Database Type</span>
                      <select
                        onChange={handleChange('databaseTypeID')}
                        value={values.databaseTypeID}
                      >
                        <option value={null}>-- SELECT DATABASE TYPE --</option>
                        {CONSTANTS.DATABASE_TYPES.map((databaseTypeObject) => {
                          return (
                            <option
                              key={databaseTypeObject.id}
                              value={databaseTypeObject.id}
                            >
                              {databaseTypeObject.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Connection String</span>
                      <input
                        value={values.databaseConnectionString}
                        type="text"
                        onChange={handleChange('databaseConnectionString')}
                      />
                    </td>
                    <td>
                      <span>Database Host Name</span>
                      <input
                        type="text"
                        value={values.databaseHostName}
                        onChange={handleChange('databaseHostName')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database User Name</span>
                      <input
                        type="text"
                        value={values.databaseUserName}
                        onChange={handleChange('databaseUserName')}
                      />
                    </td>
                    <td>
                      <span>Database Password</span>
                      <input
                        type="text"
                        value={values.databasePassword}
                        onChange={handleChange('databasePassword')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Port Number</span>
                      <input
                        type="text"
                        value={values.databasePortNumber}
                        onChange={handleChange('databasePortNumber')}
                      />
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
                            CONSTANTS.APPLICATION_SCREENS
                              .DATABASE_MAPPING_WINDOW
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
            title="Edit Database"
          >
            <form onSubmit={handleEditDatabase}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <select
                        onChange={handleChange('applicationID')}
                        value={values.applicationID}
                      >
                        <option value={null}> -- SELECT APPLICATION --</option>
                        {props.applications ? (
                          <PopulateApplications
                            applications={props.applications.applications}
                          />
                        ) : null}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Name</span>
                      <input
                        value={values.databaseName}
                        type="text"
                        onChange={handleChange('databaseName')}
                      />
                    </td>
                    <td>
                      <span>Database Type</span>
                      <select
                        onChange={handleChange('databaseTypeID')}
                        value={values.databaseTypeID}
                      >
                        <option value={null}>-- SELECT DATABASE TYPE --</option>
                        {CONSTANTS.DATABASE_TYPES.map((databaseTypeObject) => {
                          return (
                            <option
                              key={databaseTypeObject.id}
                              value={databaseTypeObject.id}
                            >
                              {databaseTypeObject.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Connection String</span>
                      <input
                        value={values.databaseConnectionString}
                        type="text"
                        onChange={handleChange('databaseConnectionString')}
                      />
                    </td>
                    <td>
                      <span>Database Host Name</span>
                      <input
                        type="text"
                        value={values.databaseHostName}
                        onChange={handleChange('databaseHostName')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database User Name</span>
                      <input
                        type="text"
                        value={values.databaseUserName}
                        onChange={handleChange('databaseUserName')}
                      />
                    </td>
                    <td>
                      <span>Database Password</span>
                      <input
                        type="text"
                        value={values.databasePassword}
                        onChange={handleChange('databasePassword')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Port Number</span>
                      <input
                        type="text"
                        value={values.databasePortNumber}
                        onChange={handleChange('databasePortNumber')}
                      />
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
                            CONSTANTS.APPLICATION_SCREENS
                              .DATABASE_MAPPING_WINDOW
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
                onClick={handleDeleteDatabase}
                className="redButton"
                disabled={
                  props.screen_rights
                    ? props.screen_rights.screen_rights.find(
                        (each_screen_right) => {
                          if (
                            each_screen_right['AS_Name'] ===
                            CONSTANTS.APPLICATION_SCREENS
                              .DATABASE_MAPPING_WINDOW
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
                  databaseApplicationMappingID: '',
                  applicationID: '',
                  applicationName: '',
                  databaseTypeName: '',
                  databaseTypeID: '',
                  databaseName: '',
                  databaseHostName: '',
                  databaseConnectionString: '',
                  databaseUserName: '',
                  databasePassword: '',
                  databasePortNumber: '',
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Database
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
                console.log(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    onClick={() => {
                      selectEditDatabase(row.original);
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} key={cell.value}>
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
  db_user: state.auth,
  users: state.users,
  applications: state.applications,
  databases: state.databases,
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_applications: (applications) =>
    dispatch(actions.set_applications(applications)),
  set_databases: (databases) => dispatch(actions.set_databases(databases)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDatabase);
