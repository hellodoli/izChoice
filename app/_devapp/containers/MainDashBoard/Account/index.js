import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import UserModel from '../../../model/User';
import StudentModel from '../../../model/Student';
import TeacherModel from '../../../model/Teacher';

import { UserContext } from '../../../user-context';
import { role } from '../../../config';

import { AccountAdd, AccountAddNote } from './EditAccount';

import { connect } from 'react-redux';

class Account extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: new UserModel(),
            student: new StudentModel(),
            teacher: new TeacherModel(),
            isExistUserName: '',
            isExistLoginName: '',
            listRole: [],
            listAccount: [{ username: '', password1: '',password2: '', loginname: '', role: '' }],

            typeAccount : '',

            labelELoginName: '',
            labelEUserName: '',
            labelEPass1: '',
            labelEPass2: ''
        };
    }

    // API
    checkExistUserName = async ( username ) => {
        const { user } = this.state;
        await user.checkExistUserName( username );
        if( this._isMounted ) 
            this.setState({ isExistUserName: user.isExistUsername });
    }
    checkExistLoginName = async ( loginname ) => {
        const { user } = this.state;
        await user.checkExistLoginName( loginname );
        if( this._isMounted )
            this.setState({ isExistLoginName: user.isExistLoginname });
    }

    // kiểm tra valid trước r mới gửi API
    checkValidLength = ( input, min, max ) => {
        const trim = input.trim(); // trim is loginname or username
        if(  trim.length >= min && trim.length <= max ){
            return true;
        }else{
            return false;
        }
    }
    checkValidRegex = ( input, type= 'loginname' ) => {
        const num = parseFloat(input);
        if( type === 'username' ) {
            const illegalChars = /\W/;
            if( !illegalChars.test( input ) ){
                // không chứa kí tự đặc biệt
                return true;
            }else{
                return 2;
            }
        }else{
            if( isNaN(num) ){
                const illegalChars = /\W/;
                if( !illegalChars.test( input ) ){
                    // không chứa kí tự đặc biệt
                    return true;
                }else{
                    return 2;
                }
            }else {
                // sai nếu nhập số
                return 1;
            } 
        }
    }
    checkValidRegexPassword = ( pw ) => {
        const illegalChars = /\W/;
        if( !illegalChars.test( pw ) ){
            // không chứa kí tự đặc biệt
            return true;
        }else{
            return false;
        }
    }

    checkLoginNameUI = async (index,typeAccount) => {
        const loginname = this.state.listAccount[index]["loginname"];
        const checkValidRegex = this.checkValidRegex( loginname, 'username' );

        //if(checkValidRegex === 1) this.setState({ labelELoginName: 2 });
        if(checkValidRegex === 2) this.setState({ labelELoginName: 3 });
        else if( checkValidRegex === true ) {
            // check length
            const checkValidLength = this.checkValidLength( loginname, 8, 12 );
            if( checkValidLength === true ){
                // loginname valid, kiểm tra nó có tồn tại chưa
                await this.checkExistLoginName( loginname );
                if( this.state.isExistLoginName === 1 ) {
                    // loginname đã tồn tại
                    this.setState({ labelELoginName: 5 });
                }else if( this.state.isExistLoginName === 0 ) {
                    // loginname hợp lệ
                    if(typeAccount === 't' || typeAccount === 'c'){
                        const listTempAccount = this.state.listAccount.slice();
                        listTempAccount[index]["username"] = loginname;
                        this.setState({ 
                            labelELoginName: false,
                            labelEUserName: false,
                            listAccount: listTempAccount
                        });    
                    }else{
                        this.setState({ labelELoginName: false });
                    }
                }
            }else{
                this.setState({ labelELoginName: 1 });
            }
        }
    }

    checkUserNameUI = async (index, typeAccount) => {
        const username = this.state.listAccount[index]["username"];
        const checkValidRegex = this.checkValidRegex( username, 'username' );
        
        //if(checkValidRegex === 1) this.setState({ labelEUserName: 2 });
        if(checkValidRegex === 2) this.setState({ labelEUserName: 3 });
        else if( checkValidRegex === true ) {
            // check length
            const checkValidLength = this.checkValidLength( username, 8, 12 );
            if( checkValidLength === true ) {
                // username valid
                if (typeAccount === 's') {
                    await this.state.student.checkExistStudent(username);
                    if(this.state.student.isExistStudent === 1){
                        // check xem mã sinh viên này đã đăng ký chưa
                        await this.checkExistUserName(username);
                        if(this.state.isExistUserName === 1){
                            // mã sinh viên đã đăng ký
                            this.setState({ labelEUserName: 5 });
                        }else{
                            // mã sinh viên chưa đăng ký
                            this.setState({ labelEUserName: false });
                        }
                    }else{
                        // mã sinh viên không có trong CSDL
                        this.setState({ labelEUserName: 4 });
                    }
                } else if (typeAccount === 'g') {
                    await this.state.teacher.checkExistTeacher(username);
                    if(this.state.teacher.isExistTeacher === 1){
                        // check xem mã GV này đã đăng ký chưa
                        await this.checkExistUserName(username);
                        if(this.state.isExistUserName === 1){
                            // mã GV đã đăng ký
                            this.setState({ labelEUserName: 5 });
                        }else{
                            // mã GV chưa đăng ký
                            this.setState({ labelEUserName: false });
                        }
                    }else{
                        // mã giảng viên không có trong CSDL
                        this.setState({ labelEUserName: 4 });
                    }
                }
            }else{
                this.setState({ labelEUserName: 1 });
            }
        }
    }

    checkPass1UI = (index) => {
        const password1 = this.state.listAccount[index]["password1"];
        const checkValidRegexPassword = this.checkValidRegexPassword( password1 );

        if( checkValidRegexPassword === true ){
            const checkValidLength = this.checkValidLength( password1, 12, 20 );
            if( checkValidLength === true ) {
                this.setState({ labelEPass1: false });
            }else{
                this.setState({ labelEPass1: 2 });
            }
        }else{
            this.setState({ labelEPass1: 1 });
        }
    }

    checkPass2UI = (index) => { 
        const password1 = this.state.listAccount[index]["password1"];
        const password2 = this.state.listAccount[index]["password2"];

        if( password1 === password2 ) {
            this.setState({ labelEPass2: false });
        }else{
            this.setState({ labelEPass2: true });
        }
    }

    createAccount = async ( e, index ) => {
        e.preventDefault();
        const { user, labelELoginName, labelEUserName, labelEPass1, labelEPass2, listAccount } = this.state;
        if( labelELoginName !== false ) this.checkLoginNameUI(index);
        if( labelEUserName !== false ) this.checkUserNameUI(index);
        if ( labelEPass1 !== false ) this.checkPass1UI(index);
        if ( labelEPass2 !== false ) this.checkPass2UI(index);

        if( labelELoginName === false && labelEUserName === false 
            && labelEPass1 === false && labelEPass2 === false 
            && listAccount[index]['role'] !== '' ) {
        
            const loginname = this.state.listAccount[index]['loginname'];
            const username = this.state.listAccount[index]['username'];
            const password = this.state.listAccount[index]['password2'];
            const selectRole = this.state.listAccount[index]['role'];

            const confirm = window.confirm(`Bạn có chắc muốn thêm tài khoản 
                \n ROLE: ${selectRole}
                \n USERNAME: ${username}
                \n LOGINNAME: ${loginname}`);
            if( confirm ){
                await user.createAccount( loginname, password, username, selectRole );
                if( user.commandInsert === true ){
                    alert('Thêm tài khoản thành công');
                }else{
                    alert('Thêm tài khoản thất bại');
                }
            }
        }
    }

    //handle Input
    handleLoginName = async ( e, index,typeAccount ) => {
        const listTempAccount = this.state.listAccount.slice();
        listTempAccount[index]["loginname"] = e.target.value;
        await this.setState({ listAccount: listTempAccount });
        this.checkLoginNameUI(index,typeAccount);
    }

    handleUserName = async ( e, index, typeAccount ) => {
        const listTempAccount = this.state.listAccount.slice();
        listTempAccount[index]["username"] = e.target.value;
        await this.setState({ listAccount: listTempAccount });
        this.checkUserNameUI(index,typeAccount);
    }

    handlePass1 = async ( e, index ) => {
        const listTempAccount = this.state.listAccount.slice();
        listTempAccount[index]["password1"] = e.target.value;
        await this.setState({ listAccount: listTempAccount });
        this.checkPass1UI(index);
    }

    handlePass2 = async ( e, index ) => {
        const listTempAccount = this.state.listAccount.slice();
        listTempAccount[index]["password2"] = e.target.value;
        await this.setState({ listAccount: listTempAccount });
        this.checkPass2UI(index);
    }

    handleSelectRole = ( e,index ) => {
        const listTempAccount = this.state.listAccount.slice();
        listTempAccount[index]["role"] = e.target.value;
        this.setState({ 
            listAccount: listTempAccount,
            typeAccount: listTempAccount[index]["role"]
        });
    }

    componentWillMount(){
        let user = this.context.userInfo;

        if(user.role === role.school){
            const listRole = [{ role: role.school, text: 'TRƯỜNG' }];
            this.setState({ listRole });
        }else{
            const listRole = [
                {role: role.student, text: 'SINH VIÊN'},
                {role: role.teacher, text: 'GIẢNG VIÊN'},
                {role: role.basis, text: 'CƠ SỞ'}
            ];
            this.setState({ listRole });
        }

        this.props.dispatch({
            type: 'ACTIVE_SIDEBAR',
            data: 'Account'
        });
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let user = this.context.userInfo;
        const { match } = this.props;
        const { 
            listAccount, listRole,
            labelELoginName, labelEUserName, labelEPass1, labelEPass2,
            typeAccount
        } = this.state;

        const labelError = {
            labelELoginName,
            labelEUserName,
            labelEPass1,
            labelEPass2
        }

        return(
            <div className="iz-account-wrapper">
                <div className="iz-header"><h3>Account</h3></div>
                <div className="iz-body">
                    <Route path={`${match.url}/create`} render={() =>
                        ( user.role === role.basis || user.role === role.school ) &&
                            <div className="iz-form-action">
                                <AccountAddNote />
                                <AccountAdd
                                    listAccount={listAccount}
                                    listRole={listRole}

                                    typeAccount={typeAccount}

                                    handleLoginName={this.handleLoginName}
                                    handleUserName={this.handleUserName}
                                    handlePass1={this.handlePass1}
                                    handlePass2={this.handlePass2}
                                    handleSelectRole={this.handleSelectRole}

                                    createAccount={this.createAccount}
                                    labelError={labelError}
                                />
                            </div>
                    }/>
                </div>
            </div>
        );
    }
}
Account.contextType = UserContext;
export default connect()(Account);