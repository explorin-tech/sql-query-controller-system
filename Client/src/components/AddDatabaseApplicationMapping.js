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

const PopulateDatabases = ({ databases }) => {
  return (
    <>
      {databases.map((database) => {
        return (
          <option
            key={database[CONSTANTS.DATABASE.MD_ID]}
            value={database[CONSTANTS.DATABASE.MD_ID]}
          >
            {database[CONSTANTS.DATABASE.MD_UserDefinedDBName]} -{' '}
            {database[CONSTANTS.DATABASE_TYPE.DBT_Name]}
          </option>
        );
      })}
    </>
  );
};

function AddDatabaseApplicationMapping(props) {
  toast.configure();
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    databaseApplicationMappingID: '',
    applicationID: '',
    databaseID: '',
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
        Header: 'Database Name (Alias)',
        accessor: 'MD_UserDefinedDBName',
        filterable: true,
      },
      {
        Header: 'Type',
        accessor: 'DBT_Name',
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
        toast.error(
          `Error while fetching list of all applications, please try again. ${err.response.data.message}`,
          { autoClose: 2000 }
        );
      });
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
          `Error while fetching list of all databases, please try again. ${err.response.data.message}`,
          { autoClose: 2000 }
        );
      });
  };

  const fetchAllDatabaseApplicationMappings = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_DATABASE_APPLICATION_MAPPINGS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_database_application_mappings(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(
          `Error while fetching list of all database application mappings, please try again. ${err.response.data.message}`,
          { autoClose: 2000 }
        );
      });
  };

  useEffect(() => {
    fetchAllApplications();
    fetchAllDatabases();
    fetchAllDatabaseApplicationMappings();
  }, []);

  useEffect(() => {
    setFilteredData(
      props.database_application_mappings.database_application_mappings
    );
  }, [props.database_application_mappings.database_application_mappings]);

  const handleAddDatabaseApplicationMapping = (e) => {
    e.preventDefault();
    axios
      .post(
        BACKEND_URLS.ADD_DATABASE_APPLICATION_MAPPING,
        {
          database_application_mapping: {
            application_id: values.applicationID,
            database_id: values.databaseID,
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
          toast.success(
            `Successfully added the new database application mapping.`,
            {
              autoClose: 2000,
            }
          );
          fetchAllDatabaseApplicationMappings();
          setAddModalShow(false);
          setValues({
            databaseApplicationMappingID: '',
            applicationID: '',
            databaseID: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to add the new database application mapping, please try again. ${err.response.data.message}`,
          { autoClose: 2000 }
        );
      });
  };

  const selectEditDatabaseApplicationMapping = (
    database_application_mapping
  ) => {
    setValues({
      databaseApplicationMappingID:
        database_application_mapping[
          CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_ID
        ],
      applicationID:
        database_application_mapping[
          CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_MA_ID
        ],
      databaseID:
        database_application_mapping[
          CONSTANTS.DATABASE_APPLICATION_MAPPING.DBAM_MD_ID
        ],
    });
    setEditModalShow(true);
  };

  const handleEditDatabaseApplicationMapping = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_DATABASE_APPLICATION_MAPPING,
        {
          database_application_mapping: {
            database_application_mapping_id:
              values.databaseApplicationMappingID,
            application_id: values.applicationID,
            database_id: values.databaseID,
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
            autoClose: 2000,
          });
          fetchAllDatabaseApplicationMappings();
          setEditModalShow(false);
          setValues({
            databaseApplicationMappingID: '',
            applicationID: '',
            databaseID: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the database details, please try again. ${err.response.data.message}`,
          { autoClose: 2000 }
        );
      });
  };

  const handleDeleteDatabaseApplicationMapping = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_DATABASE_APPLICATION_MAPPING, {
        params: {
          database_application_mapping_id: values.databaseApplicationMappingID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the database.`, {
            autoClose: 2000,
          });
          fetchAllDatabaseApplicationMappings();
          setEditModalShow(false);
          setValues({
            databaseApplicationMappingID: '',
            applicationID: '',
            databaseID: '',
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the database, please try again. ${err.response.data.message}`,
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
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Database"
          >
            <form onSubmit={handleAddDatabaseApplicationMapping}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <select
                        onChange={handleChange('applicationID')}
                        value={values.applicationID}
                        required
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
                      <select
                        onChange={handleChange('databaseID')}
                        value={values.databaseID}
                        required
                      >
                        <option value={null}> -- SELECT DATABASE --</option>
                        {props.databases ? (
                          <PopulateDatabases
                            databases={props.databases.databases}
                          />
                        ) : null}
                      </select>
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
            <form onSubmit={handleEditDatabaseApplicationMapping}>
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
                      <select
                        onChange={handleChange('databaseID')}
                        value={values.databaseID}
                        required
                      >
                        <option value={null}> -- SELECT DATABASE --</option>
                        {props.databases ? (
                          <PopulateDatabases
                            databases={props.databases.databases}
                          />
                        ) : null}
                      </select>
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
                onClick={handleDeleteDatabaseApplicationMapping}
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
                  databaseApplicationMappingID: '',
                  applicationID: '',
                  databaseID: '',
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Database Application Mapping
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
                      selectEditDatabaseApplicationMapping(row.original);
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
  db_user: state.auth,
  applications: state.applications,
  databases: state.databases,
  database_application_mappings: state.database_application_mappings,
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  set_applications: (applications) =>
    dispatch(actions.set_applications(applications)),
  set_databases: (databases) => dispatch(actions.set_databases(databases)),
  set_database_application_mappings: (database_application_mappings) =>
    dispatch(
      actions.set_database_application_mappings(database_application_mappings)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDatabaseApplicationMapping);
