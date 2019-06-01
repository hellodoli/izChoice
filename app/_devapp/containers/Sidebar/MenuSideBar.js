import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';

const MenuSideBarItemToggle = ({ item, isToggle, toggleSubMenu, markSubMenu }) => (
    <li className="menu-sidebar-item">
        <a  href="javascript:void(0)"
            className={ ( item.text === markSubMenu ) ? 'active' : '' }
            onClick={ (e) => toggleSubMenu(e,item.text) }
        >
            <div className="icon-container"><FontAwesomeIcon icon={item.iconName} /></div>
            <div className="text">{!isToggle && item.text}</div>
        </a>
    </li>
)

const MenuSideBarItem = ({ item, isToggle, markSubMenu, speacialToggleSubMenu }) => (
    <li className="menu-sidebar-item">
        <NavLink
            to={item.path}
            activeClassName={ ( item.text === markSubMenu ) ? 'active' : '' }
            onClick={(e) => speacialToggleSubMenu(e,item.text)}
        >
            <div className="icon-container"> <FontAwesomeIcon icon={item.iconName} /></div>
            <div className="text">{!isToggle && item.text}</div>

        </NavLink>
    </li>
)


class MenuSideBar extends Component {

    toggleSubMenu = ( e, value ) => {
        this.props.dispatch({
            type: 'TOGGLE_SUBMENU',
            e,
            value
        });
    }

    speacialToggleSubMenu = ( e, value ) => {
        this.props.dispatch({
            type: 'TOGGLE_SPECIAL_SUBMENU',
            e,
            value
        });
    }

    render(){
        const { 
            menu, isToggle,
            markSubMenu
        } = this.props;

        return(
            <ul className="menu-sidebar sf-menu">
                { menu.length > 0 && menu.map( item =>
                    (item.text === 'Dashboard')
                        ? 
                        <MenuSideBarItem 
                            key={item.text}
                            item={item}
                            isToggle={isToggle}
                            speacialToggleSubMenu={this.speacialToggleSubMenu}
                            markSubMenu={markSubMenu} />
                        :
                        <MenuSideBarItemToggle
                            key={item.text}
                            item={item}
                            isToggle={isToggle}
                            toggleSubMenu={this.toggleSubMenu}
                            markSubMenu={markSubMenu} />
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        markSubMenu: state.markSubMenu
    }
}
export default connect(mapStateToProps)(MenuSideBar);