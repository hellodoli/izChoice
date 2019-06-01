import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from '../../../user-context';
import { role } from '../../../config';

import ClassModel from '../../../model/Class';
import StudentModel from '../../../model/Student';

import { StudentTable } from './StudentTable';
import UpdateClass from '../Class/UpdateClass';
import AddStudent from './AddStudent';
import StudentDetail from './StudentDetail';
import { connect } from 'react-redux';

const MainStudent = (props) => {
    const { listStudent, user, match } = props;
    return(
        <div className="iz-student-wrapper">
            { listStudent.length > 0
                ?    
                <Fragment>
                    <div className="iz-header"><h3>Danh sách sinh viên trong lớp: { match.params.id }</h3></div>
                    <div className="iz-body">
                        <StudentTable listStudent={listStudent} user={user}  match={match} />
                    </div>
                </Fragment>
                : (listStudent.length === 0 && listStudent !== '') && 
                    <div className="iz-header"><h3>Không có danh sách sinh viên trong cơ sở dữ liệu.</h3></div>
            }
        </div>
    );
}

class  Student extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            student: new StudentModel(),
            classs: new ClassModel(),
            listStudent: '',
            isExistClass: ''
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        let user = this.context.userInfo;
        if(user.role === role.teacher) {
            this.getStudentByTeacher(id,user.username);
        }else if(user.role === role.basis || user.role === role.school) {
            this.getStudentByClassID(id);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillMount(){
        let user = this.context.userInfo;
        if( user.role === role.basis || user.role === role.school  ){
            this.checkFirstRender();
        }
    }

    //kiểm tra mã lớp có hợp lệ (tồn tại) hay không.
    checkExistClass = async ( classID ) => {
        const { classs } = this.state;
        await classs.checkExistClass( classID );
        this.setState({ isExistClass: classs.isExistClass });
    }
    checkFirstRender = async () => {
        const id = this.props.match.params.id;
        if( id.length === 8 ) await this.checkExistClass(id);
    }

    getStudentByTeacher = async ( classID, username ) => {
        const { student } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await student.getStudentByTeacher( classID, username );
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted) {
            if(student.getListStudentByTeacher.length > 0) {
                this.setState({ listStudent: student.getListStudentByTeacher });
            } else {
                this.setState({ listStudent: [] });
            }
        }
    }

    getStudentByClassID = async ( classID ) => {
        const { student } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await student.getStudentByClassID( classID );
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted) {
            if(student.getListStudentByClassID.length > 0) {
                this.setState({ listStudent: student.getListStudentByClassID });
            } else {
                this.setState({ listStudent: [] });
            }
        }
    }

    render() {
        const { listStudent, isExistClass } = this.state;
        let user = this.context.userInfo;
        const { match } = this.props;
        return(
            <Fragment>
                <Switch>
                    <Route exact path={match.url} render={props =>
                        ( isExistClass === 1 || user.role === role.teacher ) &&
                            <MainStudent {...props} listStudent={listStudent} user={user} match={match} /> 
                    }/>
                    <Route path={`${match.url}/add`} render={() =>
                        ( user.role === role.basis && isExistClass === 1 ) &&
                            <AddStudent {...this.props} />
                    }/>
                    <Route path={`${match.url}/update`} render={() =>
                        ( user.role === role.basis && isExistClass === 1 ) &&
                            <UpdateClass {...this.props} />
                    }/>
                    <Route path={`${match.url}/:id`} render={(props) =>
                        ( user.role === role.basis && isExistClass === 1 ) &&
                            <StudentDetail {...props} />
                    }/>
                </Switch>
            </Fragment>
        );
    }
}
Student.contextType = UserContext;
export default connect()(Student);