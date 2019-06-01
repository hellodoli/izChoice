import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from '../../../user-context';
import { role } from '../../../config';

import RegisterModel from '../../../model/Register';

import AllRegister from './AllRegister';
import { RegisterTable, EmptyRegister } from './RegisterTable';

import { Search, LiveSearch } from '../Search';
import { connect } from 'react-redux';
// dùng cho Register của teacher
const MainRegisterCombo = (props) => {
    const { user, status, listRegister, handleLiveSearch } = props;
    return(
        <Fragment>
            { (listRegister.length > 0)
                ?
                <div className="iz-register-wrapper">
                    <div className="iz-header"><h3>Danh sách đăng ký của bạn</h3></div>
                    <div className="iz-body">
                        <LiveSearch handleLiveSearch={handleLiveSearch} />
                        <div className="iz-data iz-register-data">
                            { (listRegister === "not found")
                                ? <div>Không tìm thấy dữ liệu ...</div>
                                : <RegisterTable user={user} listRegister={listRegister} />
                            }
                        </div>
                    </div>
                </div>        
                : (listRegister.length === 0 && listRegister !== '')
                    && <EmptyRegister status={status} />
            }
        </Fragment>
    )
};

// dùng cho Register của basis, school
const MainRegister = (props) => {
    const { 
        user, 
        listRegister, deleteRegister,
        inputSearch, handleSearch, menuSearchBy, searchInfo, searchBy, search,
    } = props;
    return(
        <div className="iz-register-wrapper">
            <div className="iz-header"><h3>Danh sách giáo viên đăng ký</h3></div>
            <div className="iz-body">
                <Search 
                    inputSearch={inputSearch} handleSearch={handleSearch}
                    menuSearchBy={menuSearchBy} searchInfo={searchInfo}
                    searchBy={searchBy}
                    search={search}
                />
                <div className="iz-data iz-register-data">
                    { listRegister.length > 0
                        ? <RegisterTable user={user} listRegister={listRegister} deleteRegister={deleteRegister} />
                        : (listRegister.length === 0 && listRegister !== '')
                            && <div>Không tìm thấy dữ liệu ...</div>
                    }
                </div>
            </div>
        </div>
    )
};

class Register extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            regis: new RegisterModel(),
            listRegister: '',
            copyListRegister: '',

            inputSearch: '',
            searchBy: 'Tìm kiếm theo',
            menuSearchBy: ['Ngày thi', 'Tên môn học', 'Mã lớp thi'],
            startSearch: false
        };
    }

    // component DidMount
    getRegisterByUsername = async (username) => {
        const { regis } = this.state;
        await regis.getRegisterByUsername(username);
        if(this._isMounted){
            if(regis.getListRegisterByUsername.length > 0){
                this.setState({ 
                    listRegister: regis.getListRegisterByUsername,
                    copyListRegister: regis.getListRegisterByUsername
                });
            }else{
                this.setState({ listRegister: [] });
            }
        }
    }

    // live search
    handleLiveSearch = (e) => {
        const { copyListRegister }  = this.state;
        console.log( copyListRegister );
        var searchListRegister = copyListRegister.filter(item => {
            var searchValue = item["TenMH"].toLowerCase();
            return searchValue.indexOf(e.target.value.toLowerCase()) !== -1; 
        });
        if(searchListRegister.length > 0) {
            this.setState({ listRegister: searchListRegister });
        }else{
            this.setState({ listRegister: 'not found' });
        }
    }

    //search
    searchRegisterByClassID = async ( classID ) => {
        const { regis } = this.state;
        await regis.searchRegisterByClassID( classID );
        if(this._isMounted){
            if(regis.getListSearchRegisterByClassID.length > 0){
                this.setState({ listRegister: regis.getListSearchRegisterByClassID });
            }else{
                this.setState({ listRegister: [] });
            }
        }
    }

    searchRegisterBySubjectName = async ( sbName ) => {
        const { regis } = this.state;
        await regis.searchRegisterBySubjectName( sbName );
        if(this._isMounted){
            if(regis.getListSearchRegisterBySubjectName.length > 0){
                this.setState({ listRegister: regis.getListSearchRegisterBySubjectName });
            }else{
                this.setState({ listRegister: [] });
            }
        }
    }

    searchRegisterByDate = async ( date ) => {
        const { regis } = this.state;
        await regis.searchRegisterByDate( date );
        if(this._isMounted){
            if(regis.getListSearchRegisterByDate.length > 0){
                this.setState({ listRegister: regis.getListSearchRegisterByDate });
            }else{
                this.setState({ listRegister: [] });
            }
        }
    }

    deleteRegister = async ( classID, subjectID, time ) => {
        const confirm = window.confirm(`Bạn có chắc muốn xóa đăng ký này không ?`);
        if(confirm) {
            const { regis } = this.state;
            await regis.deleteRegister( classID, subjectID, time );
            if(this._isMounted){
                if(regis.commandDelete){
                    alert('Xóa Register thành công');
                }else{
                    alert('Xóa Register thất bại');
                }
            }    
        }
    }

    // store input value search.
    handleSearch = (e) => { this.setState({ inputSearch: e.target.value }); }

    // store value search by.
    searchInfo = (e) => { this.setState({ searchBy: e.target.textContent }); }

    // Click button search or hit Enter.
    search = (e) => {
        e.preventDefault();
        const { searchBy, inputSearch } = this.state;
        const { match } = this.props;
        if( searchBy.trim() === 'Tìm kiếm theo' ) {
            alert('Bạn hãy chọn thông tin muốn tìm kiếm');
        }else if(inputSearch.trim() === ''){
            return;
        }else{
            this.setState({ startSearch: true });
            this.props.history.push(`${match.url}/search?s=${inputSearch.trim()}&b=${searchBy.trim()}`);
        }
    }

    optionSearch = (search, b) => {
        if( b === 'Ngày thi' ) {
            this.searchRegisterByDate( search );
            this.setState({ startSearch: false });
        }else if( b === 'Tên môn học' ) {
            this.searchRegisterBySubjectName( search );
            this.setState({ startSearch: false });
        }else if( b === 'Mã lớp thi') {
            this.searchRegisterByClassID( search );
            this.setState({ startSearch: false });
        }
    }
    // start search
    startSearch = (search) => {
        const query = new URLSearchParams(search);
        let s = query.get('s');
        let b = query.get('b');
        if( s !== null && b !== null ) {
            if( s.trim() !== '' && b.trim() !== '' ) {
                try {
                    s = decodeURI(s);
                    b = decodeURI(b);
                    this.optionSearch(s,b);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const search = nextProps.location.search;
        if( search !== '' && nextState.startSearch === true) {
            this.startSearch(search);
        }
    }

    componentWillMount(){
        this.props.dispatch({ 
            type: 'ACTIVE_SIDEBAR',
            data: 'Register Exam'
        });
    }

    componentDidMount() {
        this._isMounted = true;
        let user = this.context.userInfo;
        const search = this.props.location.search;
        if(search === ''){
            if(user && user.role === role.teacher) {
                this.getRegisterByUsername( user.username );
            }    
        }else {
            if(user && ( user.role === role.basis || user.role === role.school )){
                this.startSearch(search);
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { match } = this.props;
        let user = this.context.userInfo;
        const { 
            listRegister,
            inputSearch, menuSearchBy, searchBy
        } = this.state;

        const status = [
            {stt: 0, text: "Không có giáo viên nào từng đăng ký môn thi trong cơ sử dữ liệu"},
            {stt: 1, text: "Bạn chưa đăng ký cho lớp nào thi."},
        ];

        return(
            <Fragment>
                <Switch>
                    {/* User Register */}
                    <Route exact path={`${match.url}`} render={props =>
                        (user.role === role.teacher) &&
                            <MainRegisterCombo
                                {...props}
                                user={user}
                                status={status[1]}
                                listRegister={listRegister}
                                handleLiveSearch={this.handleLiveSearch}
                            />
                    } />
                    <Route path={`${match.url}/search`} render={props =>
                        ( user.role === role.basis || user.role === role.school ) &&
                            <MainRegister
                                {...props}
                                user={user}
                                listRegister={listRegister}

                                menuSearchBy={menuSearchBy}
                                inputSearch={inputSearch}
                                handleSearch={this.handleSearch}
                                searchBy={searchBy}
                                searchInfo={this.searchInfo}
                                search={this.search}
                                deleteRegister={this.deleteRegister}
                            />
                    } />
                    {/* All Register */}
                    <Route path={`${match.url}/all`} render={props =>
                        (user.role === role.basis || user.role === role.school ) &&
                            <AllRegister
                                {...props}
                                user={user}
                                status={status[0]}
                                deleteRegister={this.deleteRegister}
                            />
                    } />
                </Switch>
            </Fragment>
        );
    }
}
Register.contextType = UserContext;
export default connect()(Register);