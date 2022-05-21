import React, { Fragment } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function DropDownMenu(props) {
  const handleLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    window.location.reload();
  };

  return (
    <Fragment>
      <DropdownButton title="User ">
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
}
