import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function DropDownMenu() {
  return (
    <>
      <DropdownButton title="User ">
        <Dropdown.Item>Logout</Dropdown.Item>
      </DropdownButton>
    </>
  );
}
