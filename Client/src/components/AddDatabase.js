import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { connect } from 'react-redux';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function AddDatabase(props) {
  toast.configure();
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    databaseID: '',
    databaseTypeName: '',
    databaseTypeID: '',
    userDefinedDatabaseName: '',
    databaseHostName: '',
    databaseName: '',
    databaseUserName: '',
    databasePassword: '',
    databasePortNumber: '',
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Database Name (Alias)',
        accessor: 'MD_UserDefinedDBName',
        filterable: true,
      },
      {
        Header: 'Type',
        accessor: 'DBT_Name',
        filterable: true,
      },
      {
        Header: 'Host Name',
        accessor: 'MD_DBHostName',
        filterable: true,
      },
      {
        Header: 'Port Number',
        accessor: 'MD_DBPortNumber',
        filterable: true,
      },
      {
        Header: 'Database Name',
        accessor: 'MD_DBName',
        filterable: true,
      },
      {
        Header: 'Database User Name',
        accessor: 'MD_DBUserName',
        filterable: true,
      },
      {
        Header: 'Database Password',
        accessor: 'MD_DBPassword',
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

  const fetchAllDatabases = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_DATABASES, {
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
        toast.error(
          `Error while fetching list of all databases, please try again. ${err.response.data.message}`
        );
      });
  };

  useEffect(() => {
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
            user_defined_database_name: values.userDefinedDatabaseName,
            database_type_id: values.databaseTypeID,
            database_name: values.databaseName,
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
          toast.success(`Successfully added the new database.`, {
            autoClose: 6000,
          });
          fetchAllDatabases();
          setAddModalShow(false);
          setValues({
            databaseID: '',
            databaseTypeName: '',
            databaseTypeID: '',
            userDefinedDatabaseName: '',
            databaseHostName: '',
            databaseName: '',
            databaseUserName: '',
            databasePassword: '',
            databasePortNumber: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to add the new database, please try again. ${err.response.data.message}`
        );
      });
  };

  const selectEditDatabase = (database) => {
    setValues({
      databaseID: database[CONSTANTS.DATABASE.MD_ID],
      databaseTypeID: database[CONSTANTS.DATABASE.MD_DBT_ID],
      userDefinedDatabaseName:
        database[CONSTANTS.DATABASE.MD_UserDefinedDBName],
      databaseHostName: database[CONSTANTS.DATABASE.MD_DBHostName],
      databaseName: database[CONSTANTS.DATABASE.MD_DBName],
      databaseUserName: database[CONSTANTS.DATABASE.MD_DBUserName],
      databasePassword: database[CONSTANTS.DATABASE.MD_DBPassword],
      databasePortNumber: database[CONSTANTS.DATABASE.MD_DBPortNumber],
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
            database_id: values.databaseID,
            user_defined_database_name: values.userDefinedDatabaseName,
            database_type_id: values.databaseTypeID,
            database_name: values.databaseName,
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
          toast.success(`Successfully edited the database details.`, {
            autoClose: 6000,
          });
          fetchAllDatabases();
          setEditModalShow(false);
          setValues({
            databaseID: '',
            databaseTypeName: '',
            databaseTypeID: '',
            userDefinedDatabaseName: '',
            databaseHostName: '',
            databaseName: '',
            databaseUserName: '',
            databasePassword: '',
            databasePortNumber: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the database details, please try again. ${err.response.data.message}`
        );
      });
  };

  const handleDeleteDatabase = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_DATABASE, {
        params: {
          database_id: values.databaseID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the database.`, {
            autoClose: 6000,
          });
          fetchAllDatabases();
          setEditModalShow(false);
          setValues({
            databaseID: '',
            databaseTypeName: '',
            databaseTypeID: '',
            userDefinedDatabaseName: '',
            databaseHostName: '',
            databaseName: '',
            databaseUserName: '',
            databasePassword: '',
            databasePortNumber: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the database, please try again. ${err.response.data.message}`
        );
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
                      <span>Database Name (Alias)</span>
                      <input
                        value={values.userDefinedDatabaseName}
                        type="text"
                        onChange={handleChange('userDefinedDatabaseName')}
                        required
                      />
                    </td>
                    <td>
                      <span>Database Type</span>
                      <select
                        onChange={handleChange('databaseTypeID')}
                        value={values.databaseTypeID}
                        required
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
                      <span>Database Name</span>
                      <input
                        value={values.databaseName}
                        type="text"
                        onChange={handleChange('databaseName')}
                        required
                      />
                    </td>
                    <td>
                      <span>Database Host Name</span>
                      <input
                        type="text"
                        value={values.databaseHostName}
                        onChange={handleChange('databaseHostName')}
                        required
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
                        required
                      />
                    </td>
                    <td>
                      <span>Database Password</span>
                      <input
                        type="text"
                        value={values.databasePassword}
                        onChange={handleChange('databasePassword')}
                        required
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
                        required
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
                              .DATABASE_APPLICATION_MAPPING_WINDOW
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
                      <span>Database Name (Alias)</span>
                      <input
                        value={values.userDefinedDatabaseName}
                        type="text"
                        onChange={handleChange('userDefinedDatabaseName')}
                        required
                      />
                    </td>
                    <td>
                      <span>Database Type</span>
                      <select
                        onChange={handleChange('databaseTypeID')}
                        value={values.databaseTypeID}
                        required
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
                      <span>Database Name</span>
                      <input
                        value={values.databaseName}
                        type="text"
                        onChange={handleChange('databaseName')}
                        required
                      />
                    </td>
                    <td>
                      <span>Database Host Name</span>
                      <input
                        type="text"
                        value={values.databaseHostName}
                        onChange={handleChange('databaseHostName')}
                        required
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
                        required
                      />
                    </td>
                    <td>
                      <span>Database Password</span>
                      <input
                        type="text"
                        value={values.databasePassword}
                        onChange={handleChange('databasePassword')}
                        required
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
                        required
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
                              .DATABASE_APPLICATION_MAPPING_WINDOW
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
                              .DATABASE_APPLICATION_MAPPING_WINDOW
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
                  databaseID: '',
                  databaseTypeName: '',
                  databaseTypeID: '',
                  userDefinedDatabaseName: '',
                  databaseHostName: '',
                  databaseName: '',
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
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    onClick={() => {
                      selectEditDatabase(row.original);
                    }}
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <td {...cell.getCellProps()} key={index}>
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
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  set_databases: (databases) => dispatch(actions.set_databases(databases)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDatabase);
