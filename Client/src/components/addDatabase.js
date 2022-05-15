import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import AddModal from '../common/AddModal';

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

export default function AddDatabase() {
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
    <>
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
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <select>
                        <option>A</option>
                        <option>B</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Name</span>
                      <input type="text" />
                    </td>
                    <td>
                      <span>Database Type</span>
                      <select>
                        <option>A</option>
                        <option>B</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Host Name</span>
                      <input type="text" />
                    </td>
                    <td>
                      <span>Database Password</span>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Database Connection String</span>
                      <input type="text" />
                    </td>
                    <td>
                      <span>Database Port Number</span>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
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
    </>
  );
}
