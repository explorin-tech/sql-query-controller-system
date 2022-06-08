import React, { useMemo, Fragment, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useHistory, useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';
import * as CONSTANTS from '../utils/AppConstants';
import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

import '../static/css/queryWindow.css';

const PopulateDatabaseMappings = ({ databases }) => {
  return (
    <>
      {databases.map((database) => {
        if (database['UP_RightToRead']) {
          return (
            <option key={database['UP_DBAM_ID']} value={database['UP_DBAM_ID']}>
              {database['MA_Name']} - {database['DBAM_DBName']} -{' '}
              {database['DBT_Name']}
            </option>
          );
        }
      })}
    </>
  );
};

function QueryWindow(props) {
  const [filteredData, setFilteredData] = useState([]);
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: 'Column Column',
        accessor: '',
        filterable: true,
      },
      {
        Header: 'Column 1',
        accessor: '',
        filterable: true,
      },
      {
        Header: 'Column 2',
        accessor: '',
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
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const [values, setValues] = useState({
    queryID: '',
    databaseMappingID: '',
    sysDefQueryName: '',
    userDefQueryName: '',
    queryStatus: '',
    queryDescription: '',
    rawQuery: '',
    queryApprovedBy: '',
    queryComments: '',
    IsQueryExecuted: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

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
          console.log(err);
        }
      });
  };

  const identifyQueryType = () => {
    const wordInString = (s, word) =>
      new RegExp('\\b' + word + '\\b', 'i').test(s);
    if (wordInString(values.rawQuery, 'SELECT')) {
      return 'SELECT';
    } else if (wordInString(values.rawQuery, 'INSERT')) {
      return 'INSERT';
    } else if (wordInString(values.rawQuery, 'UPDATE')) {
      return 'UPDATE';
    } else if (wordInString(values.rawQuery, 'DELETE')) {
      return 'DELETE';
    }
  };

  const checkQueryExecutionRight = (
    query_type,
    user_permission_array_for_selected_database_mapping
  ) => {
    if (query_type === 'SELECT') {
      if (
        user_permission_array_for_selected_database_mapping['UP_RightToRead']
      ) {
        return true;
      }
    } else if (query_type === 'INSERT') {
      if (
        user_permission_array_for_selected_database_mapping['UP_RightToCreate']
      ) {
        return true;
      }
    } else if (query_type === 'UPDATE') {
      if (
        user_permission_array_for_selected_database_mapping['UP_RightToUpdate']
      ) {
        return true;
      }
    } else if (query_type === 'DELETE') {
      if (
        user_permission_array_for_selected_database_mapping['UP_RightToDelete']
      ) {
        return true;
      }
    }
    return false;
  };

  const checkQueryForApproval = () => {
    const query_type = identifyQueryType();
    const user_permission_array_for_selected_database_mapping =
      props.user_permissions.user_permissions.filter(
        (each_permission_array) => {
          if (each_permission_array['UP_DBAM_ID'] == values.databaseMappingID) {
            return each_permission_array;
          }
        }
      );
    const is_allowed_to_execute_query = checkQueryExecutionRight(
      query_type,
      user_permission_array_for_selected_database_mapping[0]
    );
    if (is_allowed_to_execute_query) {
      return true;
    }
    return false;
  };

  const { query_id } = useParams();

  const handleSaveAsDraft = () => {
    const is_query_allowed = checkQueryForApproval();
    if (is_query_allowed) {
      if (query_id) {
        // put request to update the query
        if (values.queryStatus == 'HOLD_FOR_APPROVAL') {
          // allow the chagne of even the rawQuery as status = HOLD_FOR_APPROVAL
          axios
            .put(
              BACKEND_URLS.EDIT_A_QUERY_IN_HOLD_FOR_APPROVAL,
              {
                query: {
                  query_id: query_id,
                  user_defined_name: values.userDefQueryName,
                  query_desc: values.queryDescription,
                  query_comments: values.queryComments,
                  raw_query: values.rawQuery,
                  database_application_mapping_id: values.databaseMappingID,
                  query_status_id:
                    CONSTANTS.QUERY_STATUS_ID_MAPPING['HOLD_FOR_APPROVAL'],
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
                axios
                  .get(BACKEND_URLS.GET_QUERY_DETAILS, {
                    params: {
                      query_id: res.data.data[0]['Q_ID'],
                    },
                    headers: {
                      token: localStorage.getItem('token'),
                    },
                  })
                  .then((res) => {
                    if (res.status == 200 && res.data.data[0]) {
                      const queryDetailsObject = res.data.data[0];
                      setValues({
                        queryID: queryDetailsObject['Q_ID'],
                        databaseMappingID: queryDetailsObject['Q_DBAM_ID'],
                        sysDefQueryName: queryDetailsObject['Q_SysDefName'],
                        userDefQueryName: queryDetailsObject['Q_UserDefName'],
                        queryStatus: queryDetailsObject['QS_Name'],
                        queryDescription: queryDetailsObject['Q_QueryDesc'],
                        rawQuery: queryDetailsObject['Q_RawQuery'],
                        queryApprovedBy: queryDetailsObject['Q_ApprovedByName'],
                        queryComments: queryDetailsObject['Q_Comments'],
                        IsQueryExecuted: queryDetailsObject['Q_IsExecuted'],
                      });
                    } else {
                      history.push(`/query`);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    history.push(`/query`);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // only allow the user to change the query desc, comments, userDefName
          axios
            .put(
              BACKEND_URLS.EDIT_A_QUERY,
              {
                query: {
                  query_id: query_id,
                  user_defined_name: values.userDefQueryName,
                  query_desc: values.queryDescription,
                  query_comments: values.queryComments,
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
                axios
                  .get(BACKEND_URLS.GET_QUERY_DETAILS, {
                    params: {
                      query_id: res.data.data[0]['Q_ID'],
                    },
                    headers: {
                      token: localStorage.getItem('token'),
                    },
                  })
                  .then((res) => {
                    if (res.status == 200 && res.data.data[0]) {
                      const queryDetailsObject = res.data.data[0];
                      setValues({
                        queryID: queryDetailsObject['Q_ID'],
                        databaseMappingID: queryDetailsObject['Q_DBAM_ID'],
                        sysDefQueryName: queryDetailsObject['Q_SysDefName'],
                        userDefQueryName: queryDetailsObject['Q_UserDefName'],
                        queryStatus: queryDetailsObject['QS_Name'],
                        queryDescription: queryDetailsObject['Q_QueryDesc'],
                        rawQuery: queryDetailsObject['Q_RawQuery'],
                        queryApprovedBy: queryDetailsObject['Q_ApprovedByName'],
                        queryComments: queryDetailsObject['Q_Comments'],
                        IsQueryExecuted: queryDetailsObject['Q_IsExecuted'],
                      });
                    } else {
                      history.push(`/query`);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    history.push(`/query`);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        // save a new query as draft with a status of HOLD_FOR_APPROVAL
        axios
          .post(
            BACKEND_URLS.POST_ADD_NEW_QUERY,
            {
              query: {
                database_application_mapping_id: values.databaseMappingID,
                query_status_id:
                  CONSTANTS.QUERY_STATUS_ID_MAPPING['HOLD_FOR_APPROVAL'],
                sys_defined_name: 'SYS_DEFINED_NAME',
                user_defined_name: values.userDefQueryName,
                raw_query: values.rawQuery,
                query_desc: values.queryDescription,
                query_comments: values.queryComments,
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
              history.push(`/query/${res.data.data[0]['Q_ID']}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log('QUERY NOT APPROVED');
    }
  };

  const handleQuerySetForApproval = () => {
    const is_query_allowed = checkQueryForApproval();
    if (is_query_allowed) {
      if (query_id) {
        // change the status of inserted query to SET_FOR_APPROVAL.
        axios
          .put(
            BACKEND_URLS.EDIT_A_QUERY_IN_HOLD_FOR_APPROVAL,
            {
              query: {
                query_id: query_id,
                user_defined_name: values.userDefQueryName,
                query_desc: values.queryDescription,
                query_comments: values.queryComments,
                raw_query: values.rawQuery,
                database_application_mapping_id: values.databaseMappingID,
                query_status_id:
                  CONSTANTS.QUERY_STATUS_ID_MAPPING['SET_FOR_APPROVAL'],
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
              axios
                .get(BACKEND_URLS.GET_QUERY_DETAILS, {
                  params: {
                    query_id: res.data.data[0]['Q_ID'],
                  },
                  headers: {
                    token: localStorage.getItem('token'),
                  },
                })
                .then((res) => {
                  if (res.status == 200 && res.data.data[0]) {
                    const queryDetailsObject = res.data.data[0];
                    setValues({
                      queryID: queryDetailsObject['Q_ID'],
                      databaseMappingID: queryDetailsObject['Q_DBAM_ID'],
                      sysDefQueryName: queryDetailsObject['Q_SysDefName'],
                      userDefQueryName: queryDetailsObject['Q_UserDefName'],
                      queryStatus: queryDetailsObject['QS_Name'],
                      queryDescription: queryDetailsObject['Q_QueryDesc'],
                      rawQuery: queryDetailsObject['Q_RawQuery'],
                      queryApprovedBy: queryDetailsObject['Q_ApprovedByName'],
                      queryComments: queryDetailsObject['Q_Comments'],
                      IsQueryExecuted: queryDetailsObject['Q_IsExecuted'],
                    });
                  } else {
                    history.push(`/query`);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  history.push(`/query`);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // insert a query directly into table first time with status of set for approval.
        axios
          .post(
            BACKEND_URLS.POST_ADD_NEW_QUERY,
            {
              query: {
                database_application_mapping_id: values.databaseMappingID,
                query_status_id:
                  CONSTANTS.QUERY_STATUS_ID_MAPPING['SET_FOR_APPROVAL'],
                sys_defined_name: 'SYS_DEFINED_NAME',
                user_defined_name: values.userDefQueryName,
                raw_query: values.rawQuery,
                query_desc: values.queryDescription,
                query_comments: values.queryComments,
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
              history.push(`/query/${res.data.data[0]['Q_ID']}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    if (query_id) {
      axios
        .get(BACKEND_URLS.GET_QUERY_DETAILS, {
          params: {
            query_id: query_id,
          },
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data.data[0]) {
            const queryDetailsObject = res.data.data[0];
            setValues({
              queryID: queryDetailsObject['Q_ID'],
              databaseMappingID: queryDetailsObject['Q_DBAM_ID'],
              sysDefQueryName: queryDetailsObject['Q_SysDefName'],
              userDefQueryName: queryDetailsObject['Q_UserDefName'],
              queryStatus: queryDetailsObject['QS_Name'],
              queryDescription: queryDetailsObject['Q_QueryDesc'],
              rawQuery: queryDetailsObject['Q_RawQuery'],
              queryApprovedBy: queryDetailsObject['Q_ApprovedByName'],
              queryComments: queryDetailsObject['Q_Comments'],
              IsQueryExecuted: queryDetailsObject['Q_IsExecuted'],
            });
          } else {
            history.push(`/query`);
          }
        })
        .catch((err) => {
          console.log(err);
          history.push(`/query`);
        });
    } else {
      setValues({
        queryID: '',
        databaseMappingID: '',
        sysDefQueryName: '',
        userDefQueryName: '',
        queryStatus: '',
        queryDescription: '',
        rawQuery: '',
        queryApprovedBy: '',
        queryComments: '',
        IsQueryExecuted: '',
      });
    }
    fetchUserPermissions();
  }, [props.match.params.query_id]);

  return (
    <Fragment>
      <div className="queryWindow">
        <div className="makeQueries">
          <div className="functionalities">
            <div>
              <select
                onChange={handleChange('databaseMappingID')}
                value={values.databaseMappingID}
                disabled={
                  values.queryStatus === 'SET_FOR_APPROVAL' ||
                  values.queryStatus === 'APPROVED_FOR_ONCE' ||
                  values.queryStatus === 'APPROVED_FOR_EVER'
                }
              >
                <option value={null}>
                  -- Select Application - Database Name --
                </option>
                {props.user_permissions ? (
                  <PopulateDatabaseMappings
                    databases={props.user_permissions.user_permissions}
                  />
                ) : null}
              </select>
            </div>
            <div>
              <button
                className="greenButton"
                disabled={values.queryStatus != 'HOLD_FOR_APPROVAL'}
                onClick={handleQuerySetForApproval}
              >
                Set for Approval
              </button>
              <button
                className="greenButton"
                disabled={values.queryStatus != 'SET_FOR_APPROVAL'}
              >
                Hold for Approval
              </button>
              <button
                className="blueButton"
                disabled={
                  !(
                    values.queryStatus === 'APPROVED_FOR_EVER' ||
                    (values.queryStatus === 'APPROVED_FOR_ONCE' &&
                      !values.IsQueryExecuted)
                  )
                }
              >
                Execute
              </button>
              <button
                className="yellowButton"
                onClick={handleSaveAsDraft}
                disabled={
                  values.databaseMappingID == '' ||
                  values.databaseMappingID ==
                    '-- Select Application - Database Name --' ||
                  values.rawQuery == '' ||
                  values.userDefQueryName == ''
                }
              >
                Save as Draft
              </button>
            </div>
          </div>
          <div>
            <form>
              <div className="queryDetails">
                <div className="data">
                  <div className="queryRow1">
                    <span>Sys_def_name : {values.sysDefQueryName}</span>
                    <span className="approver">
                      Approved By: {values.queryApprovedBy}
                    </span>
                    <span className="status">
                      Status : {values.queryStatus}
                    </span>
                  </div>
                  <div className="queryRow2">
                    <div>
                      <span>Query Name</span>
                      <input
                        type="text"
                        value={values.userDefQueryName}
                        onChange={handleChange('userDefQueryName')}
                        readOnly={
                          values.queryStatus === 'SET_FOR_APPROVAL' ||
                          values.queryStatus === 'APPROVED_FOR_ONCE' ||
                          values.queryStatus === 'APPROVED_FOR_EVER'
                        }
                      />
                    </div>
                    <div>
                      <span>Query Description</span>
                      <input
                        value={values.queryDescription}
                        type="text"
                        onChange={handleChange('queryDescription')}
                        readOnly={
                          values.queryStatus === 'SET_FOR_APPROVAL' ||
                          values.queryStatus === 'APPROVED_FOR_ONCE' ||
                          values.queryStatus === 'APPROVED_FOR_EVER'
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="comments">
                  <textarea
                    value={values.queryComments}
                    placeholder="Add Comment"
                    onChange={handleChange('queryComments')}
                    readOnly={
                      values.queryStatus === 'SET_FOR_APPROVAL' ||
                      values.queryStatus === 'APPROVED_FOR_ONCE' ||
                      values.queryStatus === 'APPROVED_FOR_EVER'
                    }
                  />
                </div>
              </div>
              <div className="rawQuery">
                <span>Raw Query</span>
                <textarea
                  value={values.rawQuery}
                  onChange={handleChange('rawQuery')}
                  readOnly={
                    values.queryStatus === 'SET_FOR_APPROVAL' ||
                    values.queryStatus === 'APPROVED_FOR_ONCE' ||
                    values.queryStatus === 'APPROVED_FOR_EVER'
                  }
                />
              </div>
            </form>
          </div>
        </div>
        <div className="application">
          <div className="appTab">
            <span className="headData"> Result </span>
            <CSVLink data={data} filename="Result">
              <i className="fas fa-download download"></i> Download
            </CSVLink>
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                          <td {...cell.getCellProps()}>
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
        <div className="application queryWindow">
          <div className="appTab">
            <span className="headData"> Application </span>
            <CSVLink data={data} filename="Result">
              <i className="fas fa-download download"></i> Download
            </CSVLink>
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                          <td {...cell.getCellProps()}>
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
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  db_user: state.auth,
  screen_rights: state.applicationScreenRights,
  user_permissions: state.userPermissions,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_screen_rights_for_an_user: (screen_rights) =>
    dispatch(actions.set_all_screen_rights_for_an_user(screen_rights)),
  set_all_user_permission_rights: (permission_rights) =>
    dispatch(actions.set_all_user_permission_rights(permission_rights)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryWindow);