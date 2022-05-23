import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import AddModal from '../common/AddModal';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/BackendUrls';

import * as CONSTANTS from '../utils/AppConstants';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

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

const PopulateUsers = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <option
            key={user[CONSTANTS.USER.U_ID]}
            value={user[CONSTANTS.USER.U_ID]}
          >
            {user[CONSTANTS.USER.U_FirstName]} {user[CONSTANTS.USER.U_LastName]}
          </option>
        );
      })}
    </>
  );
};

function AddApplication(props) {
  const [values, setValues] = useState({
    applicationName: '',
    owner1: null,
    owner2: null,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const fetchAllUsers = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_USERS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        props.set_all_users(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllApplicationsForAnUser = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_APPLCIATIONS_FOR_AN_USER, {
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
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllApplicationsForAnUser();
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

  const handleAddApplication = (e) => {
    e.preventDefault();
    axios
      .post(
        BACKEND_URLS.ADD_AN_APPLICATION,
        {
          application: {
            application_name: values.applicationName,
            owner_1: values.owner1,
            owner_2: values.owner2,
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
          setModalShow(false);
          setValues({
            applicationName: '',
            owner1: null,
            owner2: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
            modalShow={modalShow}
            setModalShow={setModalShow}
            title="Add Application"
          >
            <form onSubmit={handleAddApplication}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Application Name</span>
                      <input
                        type="text"
                        onChange={handleChange('applicationName')}
                        value={values.applicationName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Owner 1</span>
                      <select
                        onChange={handleChange('owner1')}
                        value={values.owner1}
                      >
                        <option value={null}>-- SELECT USER --</option>
                        {props.users ? (
                          <PopulateUsers users={props.users.users} />
                        ) : null}
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Owner 2</span>
                      <select
                        onChange={handleChange('owner2')}
                        value={values.owner2}
                      >
                        <option value={null}>-- SELECT USER --</option>
                        {props.users ? (
                          <PopulateUsers users={props.users.users} />
                        ) : null}
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="greenButton" type="submit">
                Save changes
              </button>
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

const mapStateToProps = (state) => ({
  db_user: state.auth,
  users: state.users,
  applications: state.applications,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_applications: (applications) =>
    dispatch(actions.set_applications(applications)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddApplication);
