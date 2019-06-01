import React, { Component } from 'react';
import { render } from 'react-dom';

import { ConnectedRouter } from 'connected-react-router';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom';

import history from './history';

import { role as r } from './config';
import UserModel from './model/User';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faUserCircle, faBook, faTachometerAlt, faArrowLeft,
    faArrowRight, faEdit, faChalkboardTeacher, faUserGraduate, faAward 
} from '@fortawesome/free-solid-svg-icons';

import { UserContext } from './user-context';

import Login from './containers/Login';
import Sidebar from './containers/Sidebar';
import Enrol from './containers/Enrol';// for student
import MainDashBoard from './containers/MainDashBoard';
import PortalSubMenu from './containers/MainDashBoard/PortalSubMenu';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { 
    toggleSubMenu, 
    speacialToggleSubMenu, 
    onClickOutsideHandler,
    closeSidebar,
    load
} from './func-action';

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/app/assets/bundle/`;

/* FontAwesome */
library.add(faUserCircle);
library.add(faBook);
library.add(faTachometerAlt);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faEdit);
library.add(faChalkboardTeacher);
library.add(faUserGraduate);
library.add(faAward);

// Just simple Redux
// Use for active sidebar
const defaultState = {
    markSubMenu: 'Dashboard', // dùng cho class active
    currentSubMenu: 'Dashboard',
    isOpenSubmenu: false,
    isLoadingData: false
}

const reducer = ( state= defaultState, action ) => {
    switch( action.type ) {
        case 'TOGGLE_SUBMENU': return toggleSubMenu( state, action.e, action.value )
        case 'TOGGLE_SPECIAL_SUBMENU': return speacialToggleSubMenu( state, action.e, action.value )
        case 'CLOSE_SIDEBAR': return closeSidebar( state )
        case 'CLOSE_SIDEBAR_OUTSIDE': return onClickOutsideHandler( state, action.e )
        case 'LOAD_SIDEBAR_LINK': return load( state, action.value )
        case 'ACTIVE_SIDEBAR': return {
            ...state,
            markSubMenu: action.data,
            currentSubMenu: action.data,
        }
        case 'RESET': return {
            markSubMenu: 'Dashboard',
            currentSubMenu: 'Dashboard',
            isOpenSubmenu: false
        }
        case 'ON_LOADING': return {
            ...state,
            isLoadingData: true
        }
        case 'OFF_LOADING': return {
            ...state,
            isLoadingData: false
        }
        default:
            return state
    }
}

const store = createStore(reducer);
// end Redux

const DashBoard = props => {

    const { logout } = props;
        
    return(
        <div className="iz-controller">

            {/* Sidebar */}
            <Sidebar {...props} />

            {/* Main Dashboard */}
            <MainDashBoard {...props} />

            {/* Sub Menu */}
            <PortalSubMenu logout={logout} />

        </div>
    )
};

class MyApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // store user before login
            loginname: '',
            password: '',
            start: true,

            user: new UserModel(),
            userInfo: [],
            isLogin: false,
            labelLoginErrorText: { 'loginname': '', 'password': '' }, // label Error
            isLoading: false, // spinner loading login

            markSubMenu: 'Dashboard',// dùng class active
            currentSubMenu: 'Dashboard',
            isOpenSubmenu: true,
        };
    }

    componentWillMount() {
        this.checkUserExist();
        this.getUserLoginName();
    }

    // kiểm tra người dùng username và role khi F5
    checkUserExist = async () => {
        const { user } = this.state;
        this.setState({ start: false }); // bảo đảm userInfo và isLogin cập nhật xong mới render.
        await user.getUser();
        if( user.userInfo.username ) {
            this.setState({
                start: true,
                isLogin: true,
                userInfo: user.userInfo,
            });
        }else{
            this.setState({ start: true });
        }
    }
    // kiểm tra loginname của người dùng
    getUserLoginName = async () => {
        const { user } = this.state;
        await user.getUserLoginName();
        this.setState({ loginname: user.userLoginName });
    }

    // Handle before login.
    handleLoginname = (e) => { this.setState({ loginname: e.target.value }); }

    handlePassword = (e) => { this.setState({ password: e.target.value }); }
    
    // check User login.
    checkUserToLogin = (e) => {
        e.preventDefault();
        var that = this;
        that.setState({ isLoading: true }); // start spinner loading
        const { loginname, password } = this.state;
        // information for send
        var send = "loginname=" + loginname + "&password=" + password;

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST","PHP/action/checkUserLogin.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                var data = JSON.parse(this.responseText);
                
                if (data.status) {
                    that.setState({
                        isLoading: false,// stop spinner loading
                        userInfo: {
                            'username': data.username,
                            'role': data.role
                        },
                        isLogin: true
                    });

                    // Go to dashboar or enrol.
                    if ( that.state.userInfo.role === r.student ) {
                        history.push("/enrol");
                    } else {
                        history.push("/dashboard");
                    }

                } else {
                    that.setState({ 
                        isLoading: false,// stop spinner loading
                        labelLoginErrorText: {
                            'loginname': data.loginname_err,
                            'password': data.password_err
                        }
                    });
                }
            }
        };
        
        xmlhttp.send(send);
    }

    logout = async () => {

        // clear session
        await this.state.user.logout();

        // set default State.
        this.setState({
            isLogin: false,
            userInfo: [],
        });

        store.dispatch({ type: 'RESET' });

        // Go to login
        history.push('/');
    }

    render() {

        const {
            loginname,
            userInfo, isLogin,
            labelLoginErrorText,
            isLoading,
            start
        } = this.state;
        
        return (
            <UserContext.Provider value={this.state}>
                <Switch>
                    <Route exact path="/" render= {props =>
                        ( isLogin === true )
                            ? ( userInfo.role !== r.student ) ? <Redirect to="/dashboard" /> : <Redirect to="/enrol" />
                            : ( start ) &&
                            <Login 
                                {...props}
                                labelLoginErrorText={labelLoginErrorText}
                                isLoading={isLoading}

                                checkUserToLogin={this.checkUserToLogin}
                                handleLoginname={this.handleLoginname}
                                handlePassword={this.handlePassword} />
                    }/>
                    <Route path="/dashboard" render={props =>
                        ( isLogin === true )
                            ? ( userInfo.role !== r.student ) &&
                                <DashBoard {...props} isLogin={isLogin} logout={this.logout} />
                            : ( start ) && <Redirect to="/" />
                    }/>
                    <Route path="/enrol" render={props =>
                        ( isLogin === true && userInfo.role === r.student )
                            ? <Enrol {...props} logout={this.logout} />
                            : ( start ) && <Redirect to="/" />
                    }/>
                </Switch>
            </UserContext.Provider>
        )
    }
}



render(
    <Provider store={store}>
        <HashRouter history={history}>
            <MyApp />
        </HashRouter>
    </Provider>,
    document.getElementById('app'));