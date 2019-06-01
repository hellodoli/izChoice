import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from '../../../user-context';
import { role } from '../../../config';

import TeacherModel from '../../../model/Teacher';

import AllTeacher from './AllTeacher';
import AddTeacher from './AddTeacher';// for add Teacher.
import TeacherDetail from './TeacherDetail';// for update Teacher.
import { TeacherTable } from './TeacherTable';

import { Search } from '../Search';
import { connect } from 'react-redux';

const MainTeacher = (props) => {
    const { 
        user, 
        listTeacher,
        inputSearch, handleSearch, menuSearchBy, searchInfo, searchBy, search,
        ...other
    } = props;
    return(
        <Fragment>
            <div className="iz-header"><h3>Danh sách giáo viên</h3></div>
            <div className="iz-body">
                <Search 
                    inputSearch={inputSearch} handleSearch={handleSearch}
                    menuSearchBy={menuSearchBy} searchInfo={searchInfo}
                    searchBy={searchBy}
                    search={search}
                />
                <div className="iz-data iz-teacher-data">
                    { listTeacher.length > 0
                        ? <TeacherTable {...other} user={user} listTeacher={listTeacher} />
                        : (listTeacher.length === 0 && listTeacher !== '')
                            && <div>Không tìm thấy dữ liệu ...</div>
                    }
                </div>
            </div>
        </Fragment>
    )
};

class Teacher extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            teacher: new TeacherModel(),
            listTeacher: '',

            inputSearch: '',
            searchBy: 'Tìm kiếm theo',
            menuSearchBy: ['Mã giáo viên','Mã khoa','Tên', 'Học vị'],
            startSearch: false
        };
    }

    //search
    searchTeacherID = async ( teacherID ) => {
        const { teacher } = this.state;
        await teacher.searchTeacherByID( teacherID );
        if(this._isMounted){
            if(teacher.getListTeacherByID.length > 0) {
                this.setState({ listTeacher: teacher.getListTeacherByID });
            }else{
                this.setState({ listTeacher: [] });
            }
        }
    }

    searchTeacherByFalID = async ( falID ) => {
        const { teacher } = this.state;
        await teacher.searchTeacherByFalID( falID );
        if(this._isMounted){
            if(teacher.getListTeacherByfalID.length > 0) {
                this.setState({ listTeacher: teacher.getListTeacherByfalID });
            }else{
                this.setState({ listTeacher: [] });
            }
        }
    }

    searchTeacherByD = async ( d ) => {
        const { teacher } = this.state;
        await teacher.searchTeacherByD( d );
        if(this._isMounted){
            if(teacher.getListTeacherByD.length > 0) {
                this.setState({ listTeacher: teacher.getListTeacherByD });
            }else{
                this.setState({ listTeacher: [] });
            }
        }
    }

    searchTeacherByName = async ( name1, name2 ) => {
        const { teacher } = this.state;
        await teacher.searchTeacherByName( name1, name2 );
        if(this._isMounted){
            if(teacher.getListTeacherByName.length > 0) {
                this.setState({ listTeacher: teacher.getListTeacherByName });
            }else{
                this.setState({ listTeacher: [] });
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
        }else if( inputSearch.trim() === '' ) {
            return;
        }else{
            this.setState({ startSearch: true });
            this.props.history.push(`${match.url}/search?s=${inputSearch.trim()}&b=${searchBy.trim()}`);
        }
    }

    optionSearch = (search, b) => {
        if( b === 'Mã giáo viên' ) {
            this.searchTeacherID( search );
            this.setState({ startSearch: false });
        }else if( b === 'Mã khoa' ) {
            this.searchTeacherByFalID( search );
            this.setState({ startSearch: false });
        }else if( b === 'Tên' ) {
            this.searchTeacherByName( search, search );
            this.setState({ startSearch: false });
        }else if( b === 'Học vị' ) {
            this.searchTeacherByD( search );
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
            this.startSearch( search );
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const search = this.props.location.search;
        let user = this.context.userInfo;
        if(user && ( user.role === role.basis || user.role === role.school )) {
            if(search !== ''){
                this.startSearch(search);
            }
        }
    }

    componentWillMount(){
        this.props.dispatch({ 
            type: 'ACTIVE_SIDEBAR',
            data: 'Teacher'
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { match } = this.props;
        let user = this.context.userInfo;
        const {
            listTeacher,
            inputSearch, menuSearchBy, searchBy
        } = this.state;

        const status = [
            {stt: 0, text: "Không có danh sách giáo viên trong cơ sử dữ liệu"},
        ];

        return(
            <div className="iz-teacher-wrapper">
                <Switch>
                    {/* Search Teacher */}
                    <Route path={`${match.url}/search`} render={() =>
                        (user.role === role.basis || user.role === role.school) &&
                            <MainTeacher
                                {...this.props}
                                user={user}
                                listTeacher={listTeacher}

                                menuSearchBy={menuSearchBy}
                                inputSearch={inputSearch}
                                handleSearch={this.handleSearch}
                                searchBy={searchBy}
                                searchInfo={this.searchInfo}
                                search={this.search}
                                
                            />
                    }/>

                    {/* All Teacher */}
                    <Route path={`${match.url}/all`} render={() =>
                        (user.role === role.basis || user.role === role.school) &&
                            <AllTeacher {...this.props} user={user} status={status[0]} />
                    }/>

                    {/* Add Teacher */}
                    <Route path={`${match.url}/add`} render={props =>
                        (user.role === role.basis) && <AddTeacher {...props} />
                    }/>

                    {/* Update Teacher */}
                    <Route path={`${match.url}/:id`} render={props =>
                        (user.role === role.basis) && <TeacherDetail {...props} />
                    }/>
                </Switch>
            </div>
        );
    }
}
Teacher.contextType = UserContext;
export default connect()(Teacher);