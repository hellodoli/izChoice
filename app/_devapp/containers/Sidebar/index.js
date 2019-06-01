import React, { Component } from 'react';
import MenuSideBar from './MenuSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserContext } from '../../user-context';

import { role } from '../../config';


class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            isToggle: false,// đóng mở SideBar
        }
    }

    toggleSideBar = () => { this.setState(prevState => ({ isToggle: !prevState.isToggle })); }

    componentWillMount() {
        let { userInfo } = this.context;
        if( userInfo.role === role.teacher ) {
            this.setState({ 
                menu: [ 
                    {path: '', iconName: 'user-circle', text: 'Account'},
                    {path: `${this.props.match.url}`, iconName: 'tachometer-alt', text: 'Dashboard'},
                    {path: '', iconName: 'book', text: 'Courses'},
                    {path: '', iconName: 'edit', text: 'Register Exam'},
                    {path: '', iconName: 'user-graduate', text: 'Classes'}
                ]
            });
        }else{
            this.setState({ 
                menu: [   
                    {path: '', iconName: 'user-circle', text: 'Account'},
                    {path: `${this.props.match.url}`, iconName: 'tachometer-alt', text: 'Dashboard'},
                    {path: '', iconName: 'book', text: 'Courses'},
                    {path: '', iconName: 'edit', text: 'Register Exam'},
                    {path: '', iconName: 'user-graduate', text: 'Classes'},
                    {path: '', iconName: 'chalkboard-teacher', text: 'Teacher'},
                    {path: '', iconName: 'award', text: 'Score'},
                ]
            });
        }
    }

    render() {
        const { menu, isToggle } = this.state;
        
        const isClose = isToggle ? ' closed' : '';

        return(
            <div className={`iz-controller-left${isClose}`}>
                <div>
                    <MenuSideBar
                        menu={menu}
                        isToggle={isToggle} // đóng mở SideBar
                    />
                </div>
                {/* Toggle SideBar Button */}
                <div className="toggle-sidebar" onClick={this.toggleSideBar}>
                    <button className="btn btn-toggle">
                        <FontAwesomeIcon icon="arrow-left" />
                    </button>
                </div>
            </div>
        )
    }
}

Sidebar.contextType = UserContext;
export default Sidebar;