import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import AddModal from '../common/AddModal';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

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

export default function AddApplication() {
  useEffect(() => {
    axios({
      method: 'get',
      url: BACKEND_URLS.GET_ALL_APPLCIATIONS_FOR_AN_USER,
      params: {
        user_id: 1,
      },
    }).then(function (response) {
      console.log(response);
    });
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const columns = useMemo(
    () => [
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
      {
        Header: 'Column 3',
        accessor: '',
        filterable: true,
      },
      {
        Header: 'Column 4',
        accessor: '',
        filterable: true,
      },
      {
        Header: 'Column 5',
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
            title="Add Application"
          >
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application</span>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Owner 1</span>
                      <select>
                        <option>A</option>
                        <option>B</option>
                      </select>
                    </td>
                    <td>
                      <span>Owner 2</span>
                      <select>
                        <option>A</option>
                        <option>B</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </AddModal>
          <div>
            <button className="blueButton" onClick={() => setModalShow(true)}>
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
