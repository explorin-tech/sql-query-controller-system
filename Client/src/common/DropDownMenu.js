import React, { Fragment } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/actions/Actions';

import * as APPLICATION_URLS from '../utils/ApplicationUrls';

function DropDownMenu(props) {
  const history = useHistory();
  const handleLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    props.remove_db_user();
    props.logout();
    history.push(APPLICATION_URLS.SIGN_PAGE);
  };

  return (
    <Fragment>
      <DropdownButton title="User ">
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
  remove_db_user: () => dispatch(actions.remove_db_user()),
});

export default connect(null, mapDispatchToProps)(DropDownMenu);
