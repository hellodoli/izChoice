import React from 'react';
import {  Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from 'reactstrap';

const DropdownAccount = (props) => (
    <Dropdown isOpen={props.isOpen} toggle={props.toggle}>
        <DropdownToggle 
            tag="a" 
            href="javascript:void(0)"
            data-toggle="dropdown"
            aria-expanded={props.isOpen}>
            <span>{props.username}</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Setting</DropdownItem>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Messages</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Logout</DropdownItem>
        </DropdownMenu>
    </Dropdown>
);

export default DropdownAccount;
