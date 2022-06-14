import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { connect } from 'react-redux';

import * as actions from '../store/actions/Actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';
import { useHistory } from 'react-router-dom';

function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="searchTable">
      <span className="headData"> Drafts </span>{' '}
      <input
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="  Search"
      />
    </span>
  );
}

function DraftQueries(props) {
  toast.configure();
  const [filteredData, setFilteredData] = useState([]);
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: 'SysDefName',
        accessor: 'Q_SysDefName',
        filterable: true,
      },
      {
        Header: 'UserDefinedName',
        accessor: 'Q_UserDefName',
        filterable: true,
      },
      {
        Header: 'Raw Query',
        accessor: 'Q_RawQuery',
        filterable: true,
      },
      {
        Header: 'Query Status',
        accessor: 'QS_Name',
        filterable: true,
      },
      {
        Header: 'Created By',
        accessor: 'Q_CreatedByName',
        filterable: true,
      },
      {
        Header: 'Approved By',
        accessor: 'Q_ApprovedByName',
        filterable: true,
      },
      {
        Header: 'Updated By',
        accessor: 'Q_UpdatedByName',
        filterable: true,
      },
      {
        Header: 'Is Drafted',
        accessor: 'Q_IsDrafted',
        filterable: true,
        Cell: (e) => (
          <input type="checkbox" defaultChecked={e.value} disabled />
        ),
      },
      {
        Header: 'Is Moved To History',
        accessor: 'Q_IsMovedToHistory',
        filterable: true,
        Cell: (e) => (
          <input type="checkbox" defaultChecked={e.value} disabled />
        ),
      },
      {
        Header: 'Comments',
        accessor: 'Q_Comments',
        filterable: true,
      },
      {
        Header: 'Back up table Name',
        accessor: 'Q_BackupTableName',
        filterable: true,
      },
    ],
    [filteredData]
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

  const fetchDraftQueries = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_MAPPED_DRAFT_QUERIES_FOR_USER, {
        params: {
          page: 1,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully fetched draft queries.`, {
            autoClose: 2000,
          });
          setFilteredData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(
          `Error while fetching draft queries, please try again. ${err.response.data.message}`,
          { autoClose: 2000 }
        );
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDraftQueries();
  }, []);

  const handleQuerySelect = (query_id) => {
    if (query_id) {
      history.push(`/query/${query_id}`);
    }
  };

  const { globalFilter } = state;
  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                      handleQuerySelect(row.original['Q_ID']);
                    }}
                  >
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
  db_user: state.auth,
  screen_rights: state.applicationScreenRights,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_screen_rights_for_an_user: (screen_rights) =>
    dispatch(actions.set_all_screen_rights_for_an_user(screen_rights)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DraftQueries);
