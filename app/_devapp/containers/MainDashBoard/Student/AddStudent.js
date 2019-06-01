import React, { Component } from 'react';

import { StudentAdd } from './EditStudent';

import ClassModel from '../../../model/Class';
import StudentModel from '../../../model/Student';


class AddStudent extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            student: new StudentModel(),
            classs: new ClassModel(),
            listStudent: [ { MaSV: '', Ho: '', Ten: '', Ngaysinh: '', Diachi: '' } ],
            isExistStudent: '',
            needCheck: true
        };
    }

    //kiểm tra mã SV đã tồn tại hay không.
    checkExistStudent = async ( studentID ) => {
        const { student } = this.state;
        await student.checkExistStudent( studentID );
        if(this._isMounted) this.setState({ isExistStudent: student.isExistStudent });
    }
    // kiểm tra mã SV và trả lỗi
    checkStudent_01 = async ( index ) => {
        const studentID = this.state.listStudent[index]["MaSV"];
        if( studentID.trim().length === 8 ) {
            if( !isNaN( studentID ) ) {
                await this.checkExistStudent( studentID );
                if( this.state.isExistStudent === 1 ){
                    // Mã đã tồn tại, vui lòng nhập mã khác
                    return "1";
                }else if( this.state.isExistStudent === 0 ){
                    // Mã hợp lệ
                    return "0";
                }else { 
                    // lỗi ko xác định
                    return "error";
                }
            }else {
                // Mã bạn nhập không hợp lệ, hãy nhập mã có 8 ký tự và là số 
                return "-1";
            }
        }else{
            // Mã bạn nhập không hợp lệ, hãy nhập mã có 8 ký tự và là số
            return "-1";
        }
    }
    checkStudent = async ( index ) => {
        const pip = await this.checkStudent_01( index );
        if( pip === "-1" )
            alert('Mã bạn nhập không hợp lệ, hãy nhập mã có 8 ký tự và là số');
        else if( pip === '1' )
            alert('Mã đã tồn tại, vui lòng nhập mã khác');
        else if( pip === '0' ){
            alert('Mã hợp lệ');
            this.setState({ needCheck: false });
        }
        else if( pip === 'error' )
            alert('Lỗi ????? WTF !!!');
    }

    // handle Input
    handleStudentID = ( e, index ) => {
        const templistStudent = this.state.listStudent.slice();
        templistStudent[index]["MaSV"] = e.target.value;
        this.setState({ listStudent: templistStudent });
    }

    handleStudentLastName = ( e, index ) => {
        const templistStudent = this.state.listStudent.slice();
        templistStudent[index]["Ten"] = e.target.value;
        this.setState({ listStudent: templistStudent });
    }

    handleStudentFirstName = ( e, index ) => {
        const templistStudent = this.state.listStudent.slice();
        templistStudent[index]["Ho"] = e.target.value;
        this.setState({ listStudent: templistStudent });
    }

    handleStudentBirth = ( e, index ) => {
        const templistStudent = this.state.listStudent.slice();
        templistStudent[index]["Ngaysinh"] = e.target.value;
        this.setState({ listStudent: templistStudent });
    }

    handleStudentAddress = ( e, index ) => {
        const templistStudent = this.state.listStudent.slice();
        templistStudent[index]["Diachi"] = e.target.value;
        this.setState({ listStudent: templistStudent });
    }

    insertstudentQL = async ( studentID, classID, firstName, lastName, birth, address ) => {
        const { student } = this.state;
        await student.insertStudent( studentID, classID, firstName, lastName, birth, address );
        if(this._isMounted){
            if( student.commandInsert === true ){
                alert('Thêm sinh viên thành công');
            }else{
                alert('Thêm sinh viên thất bại');
            }
        }
    }
    insertStudent = async (e,index) => {
        e.preventDefault();
        if( this.state.needCheck === false ) {
            // Không cần check mã sv lại nữa
            const confirm = window.confirm("Bạn có chắc muốn thêm sinh viên này ?");
            if(confirm) {
                const { listStudent } = this.state;
                const studentID = listStudent[index]["MaSV"];
                const classID = this.props.match.params.id;
                const firstName = listStudent[index]["Ho"];
                const lastName = listStudent[index]["Ten"];
                const birth = listStudent[index]["Ngaysinh"];
                const address = listStudent[index]["Diachi"];
                this.insertstudentQL( studentID, classID, firstName, lastName, birth, address );
            }
        }else {
            // check mã sinh viên
            const pip = await this.checkStudent_01( index );
            if( pip === "-1" )
                alert('Mã sinh viên không hợp lệ, hãy nhập mã có 8 ký tự và là số');
            else if( pip === '1' )
                alert('Mã sinh viên đã tồn tại, vui lòng nhập mã khác');
            else if( pip === '0' ){
                // thêm
                const confirm = window.confirm("Bạn có chắc muốn thêm sinh viên này ?");
                if(confirm) {
                    const { listStudent } = this.state;
                    const studentID = listStudent[index]["MaSV"];
                    const classID = this.props.match.params.id;
                    const firstName = listStudent[index]["Ho"];
                    const lastName = listStudent[index]["Ten"];
                    const birth = listStudent[index]["Ngaysinh"];
                    const address = listStudent[index]["Diachi"];
                    this.insertstudentQL( studentID, classID, firstName, lastName, birth, address );
                }
            }
            else if( pip === 'error' )
                alert('Lỗi ????? WTF !!!');
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        
        return(
            <div className="iz-form-action">
                <StudentAdd
                    listStudent={this.state.listStudent}
                    handleStudentID={this.handleStudentID}
                    handleStudentFirstName={this.handleStudentFirstName}
                    handleStudentLastName={this.handleStudentLastName}
                    handleStudentBirth={this.handleStudentBirth}
                    handleStudentAddress={this.handleStudentAddress}
                    checkStudent={this.checkStudent}
                    insertStudent={this.insertStudent}
                />
            </div>
        );
    }
}

export default AddStudent;