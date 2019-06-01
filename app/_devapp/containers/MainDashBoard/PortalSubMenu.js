import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserContext } from '../../user-context';
import { role as r } from '../../config';
import { Button } from 'reactstrap';


class PortalSubMenu extends Component {

    constructor(props){
        super(props);
    }

    endingTransCloseButton = (isOpen) => {
        const btnClose = document.querySelector('#izStoreSubMenu .iz-submenu-close button.close');
        if( btnClose ) {
            if( isOpen.length > 0 ) {
                btnClose.classList.add('finish-trans');
            }else{
                btnClose.classList.remove('finish-trans');
            }
        }
    }

    closeSideBar = () => {
        this.props.dispatch({ type: 'CLOSE_SIDEBAR' });
    }

    load = (value) => {
        this.props.dispatch({ type: 'LOAD_SIDEBAR_LINK', value })
    }

    closeSideBarOutSide = (e) => {
        var izStoreSubMenu = document.getElementById('izStoreSubMenu');
        if( izStoreSubMenu ) {
            this.props.dispatch({
                type: 'CLOSE_SIDEBAR_OUTSIDE',
                e
            });    
        }
    }

    componentDidMount(){
        window.addEventListener('click', this.closeSideBarOutSide);
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.closeSideBarOutSide);
    }

    render() {
        let { userInfo: { username, role } } = this.context;

        const { 
            markSubMenu, isOpenSubmenu, // redux state
            logout, //closeSideBar
        } = this.props;

        const isOpen = (markSubMenu !== 'Dashboard' && isOpenSubmenu) ? ' opened' : '';

        const showLoginRole = 
            ( role === r.basis ) ? 'AD' : ( role === r.school ) ? 'SC' : 'TC';
                
        const checkRenderList = () => {
            if( markSubMenu === 'Courses' ) {
                if( role === r.teacher ) {
                    return(
                        <ul className="sf-menu">
                            <li><Link to={`/dashboard/course`} onClick={ () => this.load( markSubMenu ) }> Your Courses </Link></li>
                            <li><Link to={`/dashboard/course/all`} onClick={ () => this.load( markSubMenu ) }> All Courses </Link></li>
                        </ul>
                    );
                }else {
                    return(
                        <ul className="sf-menu">
                            <li><Link to={`/dashboard/course/all`} onClick={ () => this.load( markSubMenu ) }> All Courses </Link></li>
                        </ul>
                    );
                }
            }else if( markSubMenu === 'Register Exam' ) {
                if( role === r.teacher ) {
                    return(
                        <ul className="sf-menu">
                            <li><Link to={`/dashboard/register`} onClick={ () => this.load( markSubMenu ) }> Your Register Exams </Link></li>
                        </ul>
                    );
                }else {
                    return(
                        <ul className="sf-menu">
                            <li><Link to={`/dashboard/register/search`} className="btn btn-sm btn-secondary" onClick={ () => this.load( markSubMenu ) }> Search Register Exams </Link></li>
                            <li><Link to={`/dashboard/register/all`} onClick={ () => this.load( markSubMenu ) }> All Register Exams </Link></li>
                        </ul>
                    );
                }
            }else if( markSubMenu === 'Classes' ) {
                return(
                    <ul className="sf-menu">
                        { role === r.teacher && 
                            <li><Link to={`/dashboard/class`} onClick={ () => this.load( markSubMenu ) }> Your Class </Link></li>
                        }
                        { role === r.basis &&
                            <Fragment>
                                <li>
                                    <Link to={`/dashboard/class/add`} className="btn btn-sm btn-success" onClick={ () => this.load( markSubMenu ) }> + Add New Class </Link>{' '}
                                    <Link to={`/dashboard/class/search`} className="btn btn-sm btn-secondary" onClick={ () => this.load( markSubMenu ) }> Search Class </Link>
                                </li>
                                <li><Link to={`/dashboard/class/all`} onClick={ () => this.load( markSubMenu ) }> All Class </Link></li>
                            </Fragment>
                        }
                        { role === r.school &&
                            <Fragment>
                                <li><Link to={`/dashboard/class/search`} className="btn btn-sm btn-secondary" onClick={ () => this.load( markSubMenu ) }> Search Class </Link></li>
                                <li><Link to={`/dashboard/class/all`} onClick={ () => this.load( markSubMenu ) }> All Class </Link></li>
                            </Fragment>
                        }
                    </ul>
                );
            }else if( markSubMenu === 'Teacher' ) {
                if( role === r.basis ) {
                    return(
                        <ul className="sf-menu">
                            <li>
                                <Link to={`/dashboard/teacher/add`} className="btn btn-sm btn-success" onClick={ () => this.load( markSubMenu ) }> + Add New Teacher </Link>{' '}
                                <Link to={`/dashboard/teacher/search`} className="btn btn-sm btn-secondary" onClick={ () => this.load( markSubMenu ) }> Search Teacher </Link>
                            </li>
                            <li><Link to={`/dashboard/teacher/all`} onClick={ () => this.load( markSubMenu ) }> All Teachers </Link></li>
                        </ul>
                    );
                }else if( role === r.school ) {
                    return(
                        <ul className="sf-menu">
                            <li><Link to={`/dashboard/teacher/search`} className="btn btn-sm btn-secondary" onClick={ () => this.load( markSubMenu ) }> Search Teacher </Link></li>
                            <li><Link to={`/dashboard/teacher/all`} onClick={ () => this.load( markSubMenu ) }> All Teachers </Link></li>
                        </ul>
                    );
                }
            }else if( markSubMenu === 'Account') {
                if( role === r.basis || role === r.school ) {
                    return(
                        <ul className="sf-menu">
                            <li><Link to="/dashboard/account/create" onClick={ () => this.load( markSubMenu ) }>Create New Account</Link></li>
                        </ul>
                    );
                }else {
                    return(
                        <ul className="sf-menu">
                            <li></li>
                        </ul>
                    );
                }
            }else if( markSubMenu === 'Score' ){
                return(
                    <ul className="sf-menu">
                        <li>
                            <Link 
                                to={`/dashboard/score/search`} 
                                className="btn btn-sm btn-secondary" 
                                onClick={ () => this.load( markSubMenu ) }> Search Score </Link>
                        </li>
                    </ul>
                );
            }
        }

        const checkRenderAccountInfo = () => {
            if( markSubMenu === 'Account' ) {
                return(
                    <div className="iz-submenu-account text-center">
                        <div className="account-bubble">
                            <span>{ showLoginRole }</span>
                        </div>
                        <h2 className="mt-2">{ username.toUpperCase() }</h2>
                        <button type="button" className="btn btn-logout" onClick={logout}>Logout</button>
                    </div>
                );
            }else{
                return( 
                    <h2>{ markSubMenu }</h2> 
                );
            }
        }
        
        return (
            <div id="izStoreSubMenu">
                <div className={`portal${isOpen}`} onTransitionEnd={ () => this.endingTransCloseButton( isOpen ) }>
                    { markSubMenu !== 'Dashboard' &&
                        <div className="iz-submenu">
                            <div className="iz-submenu-wrapper">

                                { checkRenderAccountInfo() }

                                <hr role="presentation"></hr>

                                { checkRenderList() }

                                { ( markSubMenu !== 'Dashboard' && markSubMenu !== 'Account' ) &&
                                    <Fragment>
                                        <hr role="presentation"></hr>
                                        <br></br>
                                        <p>{`Welcome to your ${markSubMenu}. Click on the link to display section information you want or click buttons to customize (if have).`}</p>
                                    </Fragment>
                                }

                            </div>
                            <div className="iz-submenu-close">
                                <Button close onClick={ this.closeSideBar } />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
PortalSubMenu.contextType = UserContext;

// redux
const mapStateToProps = (state) => {
    return {
        markSubMenu: state.markSubMenu,
        isOpenSubmenu: state.isOpenSubmenu
    }
}
export default connect(mapStateToProps)(PortalSubMenu);