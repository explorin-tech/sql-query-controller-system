import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { useTable, useSortBy } from 'react-table';
import { connect } from 'react-redux';
import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';
import * as actions from '../store/actions/Actions';

function ScreenRights(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [localData, setLocalData] = useState([]);

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
    []
  );

  const handleChange = (id) => {
    console.log(id);
  };

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
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllScreenRights();
  }, []);

  useEffect(() => {
    setFilteredData(props.screen_rights.screen_rights);
  }, [props.screen_rights.screen_rights]);

  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData]);

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
                        <td
                          onClick={() => {
                            console.log(cell);
                            handleChange(row.original);
                          }}
                          {...cell.getCellProps()}
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
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_screen_rights_for_an_user: (screen_rights) =>
    dispatch(actions.set_all_screen_rights_for_an_user(screen_rights)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenRights);
