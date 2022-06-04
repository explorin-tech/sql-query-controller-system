import React, { useMemo, Fragment, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

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

  const [values, setValues] = useState({});
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
          console.log(err);
        }
      });
  };

  useEffect(() => {
    console.log(query_id);
    fetchUserPermissions();
  }, []);

  return (
    <Fragment>
      <div className="queryWindow">
        <div className="makeQueries">
          <div className="functionalities">
            <div>
              <select>
                <option>Application + Database Name</option>
                {props.user_permissions ? (
                  <PopulateDatabaseMappings
                    databases={props.user_permissions.user_permissions}
                  />
                ) : null}
              </select>
            </div>
            <div>
              <button>Set for Approval</button>
              <button>Execute</button>
              <button>Save as Draft</button>
            </div>
          </div>
          <div>
            <form>
              <div className="queryDetails">
                <div className="data">
                  <div className="queryRow1">
                    <span>Sys_def_name</span>
                    <span className="approver">Approved By</span>
                    <span className="status">Status</span>
                  </div>
                  <div className="queryRow2">
                    <div>
                      <span>Query Name</span>
                      <input type="text" />
                    </div>
                    <div>
                      <span>Query Description</span>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="comments">
                  <textarea placeholder="Add Comment" />
                </div>
              </div>
              <div className="rawQuery">
                <span>Raw Query</span>
                <textarea />
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
