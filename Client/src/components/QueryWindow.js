import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as BACKEND_URLS from '../utils/BackendUrls';
import * as CONSTANTS from '../utils/AppConstants';
import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

import '../static/css/queryWindow.css';

const PopulateDatabaseMappings = ({ database_application_mappings }) => {
  return (
    <>
      {database_application_mappings.map((database_application_mapping) => {
        if (database_application_mapping['UP_RightToRead']) {
          return (
            <option
              key={database_application_mapping['UP_DBAM_ID']}
              value={database_application_mapping['UP_DBAM_ID']}
              name={
                database_application_mapping['MA_Name'] +
                '_' +
                database_application_mapping['MD_UserDefinedDBName'] +
                '_' +
                database_application_mapping['DBT_Name']
              }
            >
              {database_application_mapping['MA_Name']} -{' '}
              {database_application_mapping['MD_UserDefinedDBName']} -{' '}
              {database_application_mapping['DBT_Name']}
            </option>
          );
        }
      })}
    </>
  );
};

const DisplayResult = React.memo(({ result }) => {
  const is_result_an_array = Array.isArray(result);
  if (is_result_an_array) {
    var resultTable = document.getElementById('resultTable');
    for (var i = 0; i < result.length; i++) {
      var table = document.createElement('TABLE');
      table.border = '1';
      var tableHead = document.createElement('THEAD');
      let keys = [];
      keys = Object.keys(result[i][0]);
      var tr = document.createElement('TR');
      for (var j = 0; j < keys.length; j++) {
        var td = document.createElement('TD');
        td.innerHTML = keys[j];
        tr.appendChild(td);
      }
      tableHead.appendChild(tr);
      var tableBody = document.createElement('TBODY');
      {
        result[i]?.map((each_row, idx) => {
          var tableDataRow = document.createElement('TR');
          Object.values(each_row).map((each_data, index) => {
            var tableData = document.createElement('TD');
            tableData.innerHTML = each_data;
            tableDataRow.appendChild(tableData);
          });
          tableBody.appendChild(tableDataRow);
        });
      }
      table.appendChild(tableHead);
      table.appendChild(tableBody);
      resultTable.appendChild(table);
    }
    return (
      <div className="application">
        {result ? (
          <div>
            <div className="appTab">
              <span className="headData"> Result </span>
            </div>
            <div
              className="selectTable"
              style={{ maxWidth: 100 }}
              id="resultTable"
            ></div>
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="application">
        {result ? (
          <>
            <div className="appTab">
              <span className="headData"> Result </span>
            </div>
            <div className="selectTable">{result}</div>
          </>
        ) : null}
      </div>
    );
  }
});

function QueryWindow(props) {
  const history = useHistory();
  toast.configure();
  const current_date = new Date();

  const [values, setValues] = useState({
    queryID: '',
    databaseApplicationMappingID: '',
    sysDefQueryName: '',
    userDefQueryName: '',
    queryStatus: '',
    queryDescription: '',
    rawQuery: '',
    fetchedRawQuery: '',
    queryApprovedBy: '',
    queryComments: '',
    IsQueryExecuted: '',
    IsQueryDraft: '',
    canUserApproveTheQuery: false,
    approvalNotRequired: false,
    queryTypeIsApproved: false,
  });

  const getDatabaseNameForID = (databaseApplicationMappingID) => {
    let name = '';
    if (
      props.user_permissions.user_permissions[0]
        ? (name = props.user_permissions.user_permissions.filter(
            (each_permission_array) => {
              if (
                each_permission_array['UP_DBAM_ID'] ==
                databaseApplicationMappingID
              ) {
                return each_permission_array;
              }
            }
          ))
        : null
    )
      return (
        name[0]['MA_Name'] +
        '_' +
        name[0]['MD_UserDefinedDBName'] +
        '_' +
        name[0]['DBT_Name']
      );
  };

  const [queryResult, setQueryResult] = useState([]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const { query_id } = useParams();

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
          toast.error(
            `Error while fetching user permissions, please try again by refreshing. - ${err.response.data.message}`
          );
        }
      });
  };

  const fetchQueryDetails = (queryID) => {
    toast.info('Fetching Query Details', { autoClose: 1000 });
    axios
      .get(BACKEND_URLS.GET_QUERY_DETAILS, {
        params: {
          query_id: queryID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.data.queryObject[0]) {
          toast.success('Query Details Fetched Successfully', {
            autoClose: 5000,
          });
          const queryDetailsObject = res.data.data.queryObject[0];
          setValues({
            queryID: queryDetailsObject['Q_ID'],
            databaseApplicationMappingID: queryDetailsObject['Q_DBAM_ID'],
            sysDefQueryName: queryDetailsObject['Q_SysDefName'],
            userDefQueryName: queryDetailsObject['Q_UserDefName'],
            queryStatus: queryDetailsObject['QS_Name'],
            queryDescription: queryDetailsObject['Q_QueryDesc'],
            rawQuery: queryDetailsObject['Q_RawQuery'],
            fetchedRawQuery: queryDetailsObject['Q_RawQuery'],
            queryApprovedBy: queryDetailsObject['Q_ApprovedByName'],
            queryComments: queryDetailsObject['Q_Comments'],
            IsQueryDraft: queryDetailsObject['Q_IsDrafted'],
            IsQueryExecuted: queryDetailsObject['Q_IsExecuted'],
            canUserApproveTheQuery: res.data.data.queryApprovalRight,
            approvalNotRequired: res.data.data.approvalNotRequired,
            queryTypeIsApproved: res.data.data.queryTypeIsApproved,
          });
        } else {
          history.push(`/query`);
        }
      })
      .catch((err) => {
        toast.error(
          `Error while fetching such query details, please try again. - ${err.response.data.message}`
        );
        history.push(`/query`);
      });
  };

  const checkForApprovalNotRequired = (databaseApplicationMappingID) => {
    const user_permission_array_for_selected_database_mapping =
      props.user_permissions.user_permissions.filter(
        (each_permission_array) => {
          if (
            each_permission_array['UP_DBAM_ID'] === databaseApplicationMappingID
          ) {
            return each_permission_array;
          }
        }
      );
    if (
      user_permission_array_for_selected_database_mapping[0][
        'UP_ApprovalNotRequired'
      ]
    ) {
      return true;
    }
    return false;
  };

  const identifyQueryType = (rawQuery) => {
    const wordInString = (s, word) =>
      new RegExp('\\b' + word + '\\b', 'i').test(s);
    if (wordInString(rawQuery, 'SELECT')) {
      return 'SELECT';
    } else if (wordInString(rawQuery, 'CREATE')) {
      return 'CREATE';
    } else if (wordInString(rawQuery, 'INSERT')) {
      return 'INSERT';
    } else if (wordInString(rawQuery, 'UPDATE')) {
      return 'UPDATE';
    } else if (wordInString(rawQuery, 'DELETE')) {
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
    } else if (query_type === 'CREATE') {
      if (
        user_permission_array_for_selected_database_mapping['UP_RightToCreate']
      ) {
        return true;
      }
    } else if (query_type === 'INSERT') {
      if (
        user_permission_array_for_selected_database_mapping['UP_RightToInsert']
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

  const checkIsQueryAllowed = (rawQuery, databaseID) => {
    const query_type = identifyQueryType(rawQuery);
    const user_permission_array_for_selected_database_mapping =
      props.user_permissions.user_permissions.filter(
        (each_permission_array) => {
          if (each_permission_array['UP_DBAM_ID'] === databaseID) {
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

  const handleSaveAsDraft = () => {
    toast.info('Saving query as draft', { autoClose: 1000 });
    if (query_id) {
      // put request to update the query
      axios
        .put(
          BACKEND_URLS.EDIT_QUERY,
          {
            query: {
              query_id: query_id,
              user_defined_name: values.userDefQueryName,
              query_desc: values.queryDescription,
              query_comments: values.queryComments,
              raw_query: values.rawQuery,
              database_application_mapping_id:
                values.databaseApplicationMappingID,
              query_status_id:
                CONSTANTS.QUERY_STATUS_ID_MAPPING[values.queryStatus],
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
            toast.success('Query successfully saved query as draft', {
              autoClose: 5000,
            });
            fetchQueryDetails(res.data.data[0]['Q_ID']);
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to save query as draft, please try again -- ${err.response.data.message}`
          );
        });
    } else {
      // save a new query as draft with a status of HOLD_FOR_APPROVAL
      axios
        .post(
          BACKEND_URLS.POST_ADD_NEW_QUERY,
          {
            query: {
              database_application_mapping_id:
                values.databaseApplicationMappingID,
              query_status_id:
                CONSTANTS.QUERY_STATUS_ID_MAPPING['HOLD_FOR_APPROVAL'],
              sys_defined_name:
                values.userDefQueryName +
                '_' +
                getDatabaseNameForID(values.databaseApplicationMappingID) +
                '_' +
                current_date.getFullYear() +
                current_date.getMonth() +
                current_date.getDate(),
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
          if (res.status === 200) {
            toast.success('Query successfully saved as draft.', {
              autoClose: 5000,
            });
            history.push(`/query/${res.data.data[0]['Q_ID']}`);
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to save query as draft, please try again : ${err.response.data.message}`
          );
        });
    }
  };

  const handleQuerySetForApproval = () => {
    const is_query_allowed = checkIsQueryAllowed(
      values.rawQuery,
      values.databaseApplicationMappingID
    );
    if (is_query_allowed) {
      if (query_id) {
        // change the status of inserted query to SET_FOR_APPROVAL.
        axios
          .put(
            BACKEND_URLS.EDIT_QUERY,
            {
              query: {
                query_id: query_id,
                user_defined_name: values.userDefQueryName,
                query_desc: values.queryDescription,
                query_comments: values.queryComments,
                raw_query: values.rawQuery,
                database_application_mapping_id:
                  values.databaseApplicationMappingID,
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
            if (res.status === 200) {
              toast.success('Query set query as SET_FOR_APPROVAL.', {
                autoClose: 5000,
              });
              fetchQueryDetails(res.data.data[0]['Q_ID']);
            }
          })
          .catch((err) => {
            toast.error(
              `Failed to set query for approval : ${err.response.data.message}`
            );
          });
      } else {
        // insert a query directly into table first time with status of set for approval.
        axios
          .post(
            BACKEND_URLS.POST_ADD_NEW_QUERY,
            {
              query: {
                database_application_mapping_id:
                  values.databaseApplicationMappingID,
                query_status_id:
                  CONSTANTS.QUERY_STATUS_ID_MAPPING['SET_FOR_APPROVAL'],
                sys_defined_name:
                  values.userDefQueryName +
                  '_' +
                  getDatabaseNameForID(values.databaseApplicationMappingID) +
                  '_' +
                  current_date.getFullYear() +
                  current_date.getMonth() +
                  current_date.getDate(),
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
            if (res.status === 200) {
              toast.success('Query set query as SET_FOR_APPROVAL.', {
                autoClose: 5000,
              });
              history.push(`/query/${res.data.data[0]['Q_ID']}`);
            }
          })
          .catch((err) => {
            toast.error(
              `Failed to set query for approval : ${err.response.data.message}`
            );
          });
      }
    } else {
      toast.error(
        'Permission to execute this type of query is not given. Please contact owner of the application.'
      );
    }
    // display this message
  };

  const handleApproveForOnce = () => {
    axios
      .put(
        BACKEND_URLS.EDIT_QUERY_STATUS_FOR_APPROVAL_OR_REJECTION,
        {
          query: {
            query_id: query_id,
            query_status_id:
              CONSTANTS.QUERY_STATUS_ID_MAPPING['APPROVED_FOR_ONCE'],
            is_approved: true,
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
          toast.success('Successfully set query as APPROVED_FOR_ONCE', {
            autoClose: 5000,
          });
          fetchQueryDetails(res.data.data[0]['Q_ID']);
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to set query as APPROVED_FOR_ONCE : ${err.response.data.message}`
        );
      });
  };

  const handleApproveForEver = () => {
    axios
      .put(
        BACKEND_URLS.EDIT_QUERY_STATUS_FOR_APPROVAL_OR_REJECTION,
        {
          query: {
            query_id: query_id,
            query_status_id:
              CONSTANTS.QUERY_STATUS_ID_MAPPING['APPROVED_FOR_EVER'],
            is_approved: true,
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
          toast.success(`Successfully set query as APPROVED_FOR_EVER`, {
            autoClose: 5000,
          });
          fetchQueryDetails(res.data.data[0]['Q_ID']);
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to set query as APPROVED_FOR_EVER : ${err.response.data.message}`
        );
      });
  };

  const handleRejectQuery = () => {
    axios
      .put(
        BACKEND_URLS.EDIT_QUERY_STATUS_FOR_APPROVAL_OR_REJECTION,
        {
          query: {
            query_id: query_id,
            query_status_id: CONSTANTS.QUERY_STATUS_ID_MAPPING['REJECTED'],
            is_approved: false,
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
          toast.success(`Successfully set query as REJECTED`, {
            autoClose: 5000,
          });
          fetchQueryDetails(res.data.data[0]['Q_ID']);
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to set query as REJECTED : ${err.response.data.message}`
        );
      });
  };

  const handleExecute = () => {
    // handle execute button
    if (query_id) {
      axios
        .put(
          BACKEND_URLS.EDIT_QUERY,
          {
            query: {
              query_id: query_id,
              user_defined_name: values.userDefQueryName,
              query_desc: values.queryDescription,
              query_comments: values.queryComments,
              raw_query: values.rawQuery,
              database_application_mapping_id:
                values.databaseApplicationMappingID,
              query_status_id:
                CONSTANTS.QUERY_STATUS_ID_MAPPING[values.queryStatus],
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
            toast.success('Query successfully saved query.', {
              autoClose: 5000,
            });
            axios
              .post(
                BACKEND_URLS.EXECUTE_QUERY,
                {
                  query: {
                    query_id: query_id,
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
                  // display the results now
                  setQueryResult(res.data.data);
                  // display this message
                  toast.success(`Successfully executed the query.`, {
                    autoClose: 5000,
                  });
                  fetchQueryDetails(query_id);
                }
              })
              .catch((err) => {
                toast.error(`${err.response.data.message}`);
              });
            // fetchQueryDetails(res.data.data[0]['Q_ID']);
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to save query as draft, please try again -- ${err.response.data.message}`
          );
        });
    } else {
      axios
        .post(
          BACKEND_URLS.POST_ADD_NEW_QUERY,
          {
            query: {
              database_application_mapping_id:
                values.databaseApplicationMappingID,
              query_status_id:
                CONSTANTS.QUERY_STATUS_ID_MAPPING['NOT_SET_FOR_APPROVAL'],
              sys_defined_name:
                values.userDefQueryName +
                '_' +
                getDatabaseNameForID(values.databaseApplicationMappingID) +
                '_' +
                current_date.getFullYear() +
                current_date.getMonth() +
                current_date.getDate(),
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
          if (res.status === 200) {
            const postedQueryID = res.data.data[0]['Q_ID'];
            history.push(`/query/${postedQueryID}`);
            axios
              .post(
                BACKEND_URLS.EXECUTE_QUERY,
                {
                  query: {
                    query_id: postedQueryID,
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
                  toast.success(`Successfully executed the query.`, {
                    autoClose: 5000,
                  });
                  setQueryResult(res.data.data);
                  fetchQueryDetails(postedQueryID);
                }
              })
              .catch((err) => {
                toast.error(`${err.response.data.message}`);
              });
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to save the query. : ${err.response.data.message}`
          );
        });
    }
  };

  useEffect(() => {
    if (query_id) {
      fetchQueryDetails(query_id);
    } else {
      if (props.location.state) {
        const copiedQueryDetails = props.location.state;
        setValues({
          queryID: '',
          databaseApplicationMappingID:
            copiedQueryDetails.databaseApplicationMappingID,
          sysDefQueryName: '',
          userDefQueryName: copiedQueryDetails.userDefQueryName,
          queryStatus: '',
          queryDescription: copiedQueryDetails.queryDescription,
          rawQuery: copiedQueryDetails.rawQuery,
          fetchedRawQuery: copiedQueryDetails.fetchedRawQuery,
          queryApprovedBy: '',
          queryComments: copiedQueryDetails.queryComments,
          IsQueryExecuted: '',
          IsQueryDraft: '',
          canUserApproveTheQuery: copiedQueryDetails.canUserApproveTheQuery,
          approvalNotRequired: copiedQueryDetails.approvalNotRequired,
          queryTypeIsApproved: copiedQueryDetails.queryTypeIsApproved,
        });
      } else {
        setValues({
          queryID: '',
          databaseApplicationMappingID: '',
          sysDefQueryName: '',
          userDefQueryName: '',
          queryStatus: '',
          queryDescription: '',
          rawQuery: '',
          fetchedRawQuery: '',
          queryApprovedBy: '',
          queryComments: '',
          IsQueryDraft: '',
          IsQueryExecuted: '',
          canUserApproveTheQuery: false,
          approvalNotRequired: false,
        });
      }
    }
    fetchUserPermissions();
  }, [props.match.params.query_id]);

  const handleChangeInDatabaseDropdown = (e) => {
    let isDifferentDatabaseChosen = false;
    if (
      e.target.value != '-- Select Application - Database Name --' &&
      e.target.value != ''
    ) {
      if (e.target.value != values.databaseApplicationMappingID) {
        isDifferentDatabaseChosen = true;
      }
      if (checkForApprovalNotRequired(e.target.value)) {
        setValues({
          ...values,
          ['databaseApplicationMappingID']: e.target.value,
          ['approvalNotRequired']: true,
        });
      } else {
        setValues({
          ...values,
          ['databaseApplicationMappingID']: e.target.value,
          ['approvalNotRequired']: false,
        });
      }
    } else {
      setValues({
        ...values,
        ['databaseApplicationMappingID']: e.target.value,
        ['approvalNotRequired']: false,
      });
    }
    if (
      (values.queryStatus === 'SET_FOR_APPROVAL' ||
        values.queryStatus === 'APPROVED_FOR_ONCE' ||
        values.queryStatus === 'APPROVED_FOR_EVER' ||
        values.queryStatus === 'REJECTED') &&
      !values.IsQueryExecuted &&
      isDifferentDatabaseChosen
    ) {
      axios
        .put(
          BACKEND_URLS.EDIT_QUERY,
          {
            query: {
              query_id: query_id,
              user_defined_name: values.userDefQueryName,
              query_desc: values.queryDescription,
              query_comments: values.queryComments,
              raw_query: values.rawQuery,
              database_application_mapping_id: e.target.value,
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
          if (res.status === 200) {
            toast.success(`Successfully set the query as HOLD_FOR_APPROVAL`, {
              autoClose: 5000,
            });
            fetchQueryDetails(res.data.data[0]['Q_ID']);
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to set query as HOLD_FOR_APPROVAL and reflect the changes made. - ${err.response.data.message}`
          );
        });
    }
  };

  const handleRawQueryChange = (e) => {
    if (
      values.databaseApplicationMappingID !=
        '-- Select Application - Database Name --' &&
      values.databaseApplicationMappingID != ''
    ) {
      const is_query_executable = checkIsQueryAllowed(
        values.rawQuery,
        values.databaseApplicationMappingID
      );
      if (is_query_executable) {
        setValues({
          ...values,
          ['queryTypeIsApproved']: true,
        });
      } else {
        setValues({
          ...values,
          ['queryTypeIsApproved']: false,
        });
      }
    } else {
      setValues({
        ...values,
        ['queryTypeIsApproved']: false,
      });
    }

    if (
      (values.queryStatus === 'SET_FOR_APPROVAL' ||
        values.queryStatus === 'APPROVED_FOR_ONCE' ||
        values.queryStatus === 'APPROVED_FOR_EVER' ||
        values.queryStatus === 'REJECTED') &&
      !values.IsQueryExecuted &&
      values.fetchedRawQuery != values.rawQuery
    ) {
      axios
        .put(
          BACKEND_URLS.EDIT_QUERY,
          {
            query: {
              query_id: query_id,
              user_defined_name: values.userDefQueryName,
              query_desc: values.queryDescription,
              query_comments: values.queryComments,
              raw_query: values.rawQuery,
              database_application_mapping_id:
                values.databaseApplicationMappingID,
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
          if (res.status === 200) {
            toast.success(`Successfully set the query as HOLD_FOR_APPROVAL`, {
              autoClose: 5000,
            });
            fetchQueryDetails(res.data.data[0]['Q_ID']);
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to set query as HOLD_FOR_APPROVAL and reflect the changes made. - ${err.response.data.message}`
          );
        });
    }
  };

  const handleMakeCopy = () => {
    if (query_id) {
      const queryDetails = {
        canUserApproveTheQuery: values.canUserApproveTheQuery,
        databaseApplicationMappingID: values.databaseApplicationMappingID,
        fetchedRawQuery: values.fetchedRawQuery,
        queryComments: values.queryComments,
        queryDescription: values.queryDescription,
        rawQuery: values.rawQuery,
        userDefQueryName: values.userDefQueryName,
        approvalNotRequired: values.approvalNotRequired,
        queryTypeIsApproved: values.queryTypeIsApproved,
      };
      toast.success(`Successfully copied query details to new query window.`, {
        autoClose: 5000,
      });
      history.push({
        pathname: '/query',
        state: queryDetails,
      });
    }
  };

  return (
    <Fragment>
      <div className="queryWindow">
        <div className="makeQueries">
          {values.queryStatus === 'SET_FOR_APPROVAL' &&
          values.canUserApproveTheQuery ? (
            <div className="functionalities">
              <div>
                <button className="yellowButton" onClick={handleApproveForOnce}>
                  Approve For Once
                </button>
                <button className="greenButton" onClick={handleApproveForEver}>
                  Approve For Ever
                </button>
                <button className="redButton" onClick={handleRejectQuery}>
                  Reject
                </button>
              </div>
            </div>
          ) : null}
          <div className="functionalities">
            <div>
              <select
                onChange={(e) => {
                  handleChangeInDatabaseDropdown(e);
                }}
                value={values.databaseApplicationMappingID}
                disabled={values.IsQueryExecuted && !values.IsQueryDraft}
              >
                <option value={null}>
                  -- Select Application - Database Name --
                </option>
                {props.user_permissions ? (
                  <PopulateDatabaseMappings
                    database_application_mappings={
                      props.user_permissions.user_permissions
                    }
                  />
                ) : null}
              </select>
            </div>
            <div>
              <button
                className="greenButton"
                disabled={
                  values.databaseApplicationMappingID === '' ||
                  values.databaseApplicationMappingID ===
                    '-- Select Application - Database Name --' ||
                  values.rawQuery === '' ||
                  values.userDefQueryName === '' ||
                  values.queryStatus === 'SET_FOR_APPROVAL' ||
                  values.queryStatus === 'APPROVED_FOR_ONCE' ||
                  values.queryStatus === 'APPROVED_FOR_EVER' ||
                  values.queryStatus === 'REJECTED' ||
                  (values.queryStatus === 'NOT_SET_FOR_APPROVAL' &&
                    values.IsQueryExecuted)
                }
                onClick={handleQuerySetForApproval}
              >
                Set for Approval
              </button>

              {(values.approvalNotRequired && values.queryTypeIsApproved) ||
              (values.queryStatus === 'APPROVED_FOR_ONCE' &&
                !values.IsQueryExecuted) ||
              values.queryStatus === 'REJECTED' ||
              values.queryStatus === 'APPROVED_FOR_EVER' ||
              (values.queryStatus === 'NOT_SET_FOR_APPROVAL' &&
                values.IsQueryDraft) ? (
                <button
                  className="blueButton"
                  disabled={
                    values.databaseApplicationMappingID === '' ||
                    values.databaseApplicationMappingID ===
                      '-- Select Application - Database Name --' ||
                    values.rawQuery === '' ||
                    values.userDefQueryName === '' ||
                    (values.queryStatus === 'APPROVED_FOR_ONCE' &&
                      values.IsQueryExecuted) ||
                    values.queryStatus === 'REJECTED'
                  }
                  onClick={handleExecute}
                >
                  Execute
                </button>
              ) : (
                <button
                  className="blueButton"
                  disabled={true}
                  onClick={handleExecute}
                >
                  Execute
                </button>
              )}

              <button
                className="yellowButton"
                onClick={handleSaveAsDraft}
                disabled={
                  values.databaseApplicationMappingID === '' ||
                  values.databaseApplicationMappingID ===
                    '-- Select Application - Database Name --' ||
                  values.rawQuery === '' ||
                  values.userDefQueryName === '' ||
                  values.queryStatus === 'REJECTED' ||
                  (values.queryStatus === 'APPROVED_FOR_ONCE' &&
                    values.IsQueryExecuted) ||
                  values.queryStatus === 'APPROVED_FOR_EVER' ||
                  (values.queryStatus === 'NOT_SET_FOR_APPROVAL' &&
                    values.IsQueryExecuted)
                }
              >
                Save as Draft
              </button>
              <button
                className="yellowButton"
                disabled={
                  !(values.IsQueryExecuted || values.queryStatus === 'REJECTED')
                }
                onClick={handleMakeCopy}
              >
                Make a Copy
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
                        readOnly={values.IsQueryExecuted}
                      />
                    </div>
                    <div>
                      <span>Query Description</span>
                      <input
                        value={values.queryDescription}
                        type="text"
                        onChange={handleChange('queryDescription')}
                        readOnly={values.IsQueryExecuted}
                      />
                    </div>
                  </div>
                </div>
                <div className="comments">
                  <textarea
                    value={values.queryComments}
                    placeholder="Add Comment"
                    onChange={handleChange('queryComments')}
                    readOnly={values.IsQueryExecuted}
                  />
                </div>
              </div>
              <div className="rawQuery">
                <span>Raw Query</span>
                <textarea
                  value={values.rawQuery}
                  onChange={handleChange('rawQuery')}
                  onFocus={(e) => {
                    handleRawQueryChange(e);
                  }}
                  onBlur={(e) => {
                    handleRawQueryChange(e);
                  }}
                  readOnly={values.IsQueryExecuted && !values.IsQueryDraft}
                />
              </div>
            </form>
          </div>
        </div>
        <DisplayResult result={queryResult} />
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
