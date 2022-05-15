import React, { useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";

export default function DbRights() {

  const [filteredData, setFilteredData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "",
        filterable: true,
      },
      {
        Header: "Column 2",
        accessor: "",
        filterable: true,
      },
      {
        Header: "Column 3",
        accessor: "",
        filterable: true,
      },
      {
        Header: "Column 4",
        accessor: "",
        filterable: true,
      },
      {
        Header: "Column 5",
        accessor: "",
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
    useSortBy,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = tableInstance;

  return (
    <>
      <div className="application">
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
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fas fa-angle-down sortIcon"></i>
                          ) : (
                            <i className="fas fa-angle-up sortIcon"></i>
                          )
                        ) : (
                          ""
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
                          {cell.render("Cell")}
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
