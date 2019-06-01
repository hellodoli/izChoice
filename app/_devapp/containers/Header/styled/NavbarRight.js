import React from 'react';
import DropdownAccount from './DropdownAccount';

const NavbarRight = (props) => (
    <div className="navbar-right">
        <DropdownAccount 
            isOpen={props.isOpen} 
            toggle={props.toggle} 
            username={props.username}
        />
    </div>
);

export default NavbarRight;