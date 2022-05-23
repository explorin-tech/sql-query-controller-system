import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import AddModal from '../common/AddModal';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

import * as CONSTANTS from '../utils/AppConstants';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

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
            data-id={application[CONSTANTS.APPLICATION.MA_ID]}
            data-name={application[CONSTANTS.APPLICATION.MA_Name]}
          >
            {application[CONSTANTS.APPLICATION.MA_Name]}
          </option>
        );
      })}
    </>
  );
};

function AddDatabase(props) {
  const [filteredData, setFilteredData] = useState(props.databases.databases);
  const [values, setValues] = useState({
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

  const [modalShow, setModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Application Name',
        accessor: 'DBAM_MA_Name',
        filterable: true,
      },
      {
        Header: 'Database Name',
        accessor: 'DBAM_DBName',
        filterable: true,
      },
      {
        Header: 'Type',
        accessor: 'DBAM_DBT_Name',
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
      }
    ],
    []
  );

  console.log(props.databases.databases);

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

  const handleSelectApplication = () => (event) => {
    setValues({
      ...values,
      applicationID:
        event.target[event.target.selectedIndex].getAttribute('data-id'),
      applicationName:
        event.target[event.target.selectedIndex].getAttribute('data-name'),
    });
  };

  const handleSelectDatabaseType = () => (event) => {
    setValues({
      ...values,
      databaseTypeID:
        event.target[event.target.selectedIndex].getAttribute('data-id'),
      databaseTypeName:
        event.target[event.target.selectedIndex].getAttribute('data-name'),
    });
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
        console.log(res);
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
    setFilteredData(props.databases.databases);
  }, []);

  const handleAddDatabase = (e) => {
    e.preventDefault();
    axios
      .post(
        BACKEND_URLS.ADD_DATABASE,
        {
          database: {
            application_id: values.applicationID,
            application_name: values.applicationName,
            database_name: values.databaseName,
            database_type_id: values.databaseTypeID,
            database_type_name: values.databaseTypeName,
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
          setModalShow(false);
          setValues({
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
            modalShow={modalShow}
            setModalShow={setModalShow}
            title="Add Database"
          >
            <form onSubmit={handleAddDatabase}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <select
                        onChange={handleSelectApplication()}
                        value={values.applicationName}
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
                        onChange={handleSelectDatabaseType()}
                        value={values.databaseTypeName}
                      >
                        <option value={null}>-- SELECT DATABASE TYPE --</option>
                        {CONSTANTS.DATABASE_TYPES.map((databaseTypeObject) => {
                          return (
                            <option
                              key={databaseTypeObject.id}
                              data-id={databaseTypeObject.id}
                              data-name={databaseTypeObject.name}
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
              <button className="greenButton" type="submit">
                Save changes
              </button>
            </form>
          </AddModal>
          <div>
            <button className="blueButton" onClick={() => setModalShow(true)}>
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
                return (
                  <tr {...row.getRowProps()} key={row.id}>
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
});

const mapDispatchToProps = (dispatch) => ({
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_applications: (applications) =>
    dispatch(actions.set_applications(applications)),
  set_databases: (databases) => dispatch(actions.set_databases(databases)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDatabase);
