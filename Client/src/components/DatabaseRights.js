import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { useTable, useSortBy } from 'react-table';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

import * as CONSTANTS from '../utils/AppConstants';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

function DbRights(props) {
  const [filteredData, setFilteredData] = useState([]);
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
        Header: 'Database Type',
        accessor: 'DBAM_DBT_Name',
        filterable: true,
      },
      {
        Header: 'Right to Read',
        accessor: '',
        filterable: true,
      },
      {
        Header: 'Right to Create',
        accessor: '',
        filterable: true,
      },
      {
        Header: 'Right to Update',
        accessor: '',
        filterable: true,
      },
      {
        Header: 'Right to Delete',
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

  useEffect(() => {
    fetchAllDatabases();
  }, []);

  useEffect(() => {
    setFilteredData(props.databases.databases);
  }, [props.databases.databases]);

  return (
    <Fragment>
      <div className="application">
        <div className="buttonDiv">
          <button className="yellowButton">Edit</button>
          <button className="greenButton">Save Changes</button>
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
  databases: state.databases,
});

const mapDispatchToProps = (dispatch) => ({
  set_databases: (databases) => dispatch(actions.set_databases(databases)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DbRights);
