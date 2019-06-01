import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { StudentUpdate } from './EditStudent';
import StudentModel from '../../../model/Student';

class StudentDetail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            student: new StudentModel(),
            listStudent: '',
        };
    }

    // handle input
    handleLastName = (e,index) => {
        const tempListStudent = this.state.listStudent.slice();
        tempListStudent[index]["Ten"] = e.target.value;
        this.setState({ listStudent: tempListStudent });
    }

    handleFirstName = (e,index) => {
        const tempListStudent = this.state.listStudent.slice();
        tempListStudent[index]["Ho"] = e.target.value;
        this.setState({ listStudent: tempListStudent });
    }

    handleBirth = (e,index) => {
        const tempListStudent = this.state.listStudent.slice();
        tempListStudent[index]["Ngaysinh"] = e.target.value;
        this.setState({ listStudent: tempListStudent });  
    }

    handleAddress = (e,index) => {
        const tempListStudent = this.state.listStudent.slice();
        tempListStudent[index]["Diachi"] = e.target.value;
        this.setState({ listStudent: tempListStudent });
    }

    getStudentById = async (studentID) => {
        const { student } = this.state;
        await student.getStudentByID(studentID);
        if(this._isMounted){
            if(student.getListStudentByID.length > 0){
                this.setState({ listStudent: student.getListStudentByID });
            }else{
                this.setState({ listStudent: [] });
            }
        }
    }

    updateStudentAPI = async (firstName, lastName, address, birth, studentID) => {
        const { student } = this.state;
        await student.updateStudent(firstName, lastName, address, birth, studentID);
        if(this._isMounted){
            if(student.commandUpdate === true){
                alert('Update student thành công');
            }else{
                alert('Update student thất bại');
            }
        }
    }
    updateStudent = (e,index) => {
        e.preventDefault();
        const firstName = this.state.listStudent[index]["Ho"].trim();
        const lastName = this.state.listStudent[index]["Ten"].trim();
        const address = this.state.listStudent[index]["Diachi"].trim();
        const birth = this.state.listStudent[index]["Ngaysinh"].trim();
        const studentID = this.props.match.params.id;

        if( firstName !== '' && lastName !== '' && address !== '' && birth !== '' && studentID !== '') {
            const confirm = window.confirm('Bạn có chắc muốn sửa thông tin sinh viên này');
            if(confirm) this.updateStudentAPI( firstName, lastName, address, birth, studentID );
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        this.getStudentById( id );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { listStudent } = this.state;
        const { match } = this.props;
        return(
            <div className="iz-form-action">
                <Route path={`${match.url}/update`} render={() =>
                    <StudentUpdate
                        listStudent={listStudent}
                        handleFirstName={this.handleFirstName}
                        handleLastName={this.handleLastName}
                        handleBirth={this.handleBirth}
                        handleAddress={this.handleAddress}
                        updateStudent={this.updateStudent}
                    />
                }/>
            </div>
        );
    }
}

export default StudentDetail;