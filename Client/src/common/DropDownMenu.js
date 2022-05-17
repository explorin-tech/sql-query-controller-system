import React, { Fragment } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function DropDownMenu() {
  return (
    <Fragment>
      <DropdownButton title="User ">
        <Dropdown.Item>Logout</Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
}
