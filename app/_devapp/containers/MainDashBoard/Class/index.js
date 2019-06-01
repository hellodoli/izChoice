import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from '../../../user-context';
import { role, limitPage } from '../../../config';

import ClassModel from '../../../model/Class';

import Student from '../Student';
import AllClass from './AllClass';
import AddClass from './AddClass';
import { ClassTable, EmptyClass } from './ClassTable';
import IZPagination from '../../../components/Pagination';

import { Search, LiveSearch } from '../Search';

import { connect } from 'react-redux';

import { renderIZPagination } from '../../../func-action';

// for Teacher User.
const MainClassTeacher = (props) => {
    const {
        user,
        status,
        listClass,
        handleLiveSearch,
        hasPagination, arrPagination, clickPagination, pdefault,
        match
    } = props;
    return(
        <Fragment>
            { ( listClass.length > 0 )
                ?
                <div className="iz-class-wrapper">
                    <div className="iz-header"><h3>Danh sách lớp thuộc khoa của bạn</h3></div>
                    <div className="iz-body">
                        <LiveSearch handleLiveSearch={handleLiveSearch} />
                        <div className="iz-data iz-class-data">
                            { ( listClass === "not found" )
                                ? <div> Không tìm thấy dữ liệu ... </div>
                                : 
                                <div>
                                    <ClassTable
                                        match={match}
                                        user={user}
                                        listClass={listClass}
                                        pdefault={pdefault}
                                    />
                                    { hasPagination === true &&
                                        <IZPagination
                                            match={match}
                                            arrPagination={arrPagination}
                                            clickPagination={clickPagination}
                                            pdefault={pdefault}
                                        />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                : (listClass.length === 0 && listClass !== '')
                    && <EmptyClass status={status} />
            }
        </Fragment>
    )
};

// for Basis, School.
const MainClass = (props) => {
    const { 
        match,
        user, 
        listClass,
        inputSearch, handleSearch, menuSearchBy, searchInfo, searchBy, search,
        pdefault
    } = props;
    return(
        <div className="iz-class-wrapper">
            <div className="iz-header"><h3>Danh sách lớp</h3></div>
            <div className="iz-body">
                <Search 
                    inputSearch={inputSearch} handleSearch={handleSearch}
                    menuSearchBy={menuSearchBy} searchInfo={searchInfo}
                    searchBy={searchBy}
                    search={search}
                />
                <div className="iz-data iz-class-data">
                    { listClass.length > 0
                        ? <ClassTable match={match} user={user} listClass={listClass} pdefault={pdefault} />
                        : (listClass.length === 0 && listClass !== '')
                            && <div>Không tìm thấy dữ liệu ...</div>
                    }
                </div>
            </div>
        </div>
    )
};

class Class extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            classs: new ClassModel(),
            listClass: '',
            copyListClass: '',

            inputSearch: '',
            searchBy: 'Tìm kiếm theo',
            menuSearchBy: ['Mã lớp', 'Tên lớp'],
            startSearch: false,

            listClassSplit: [],
            limit: limitPage, // number data row
            hasPagination: false,
            arrPagination: [],
            startClickPagination: false,
            pdefault: 0 // index của pagination
        };
    }

    // render pagination
    renderPagination = (arrDataPag, arrPagination, p) => {
        this.setState({
            listClassSplit: arrDataPag, // dùng khi user chuyển pag
            listClass: arrDataPag[p-1],
            copyListClass: arrDataPag[p-1],
            hasPagination: true,
            arrPagination: arrPagination,
            pdefault: (p - 1)
        });
    }
    
    invalidRenderPagination = (note) => {
        this.setState({ listClass: note }); // listClass: 'not found'
    }

    noRenderPagination = (data) => { 
        this.setState({
            listClass: data,
            copyListClass: data
        });
    }

    clickPagination = () => { this.setState({ startClickPagination: true }) };

    // component DidMount
    // lấy lớp thuộc giáo viên nào đó
    getClassByUserName = async ( username ) => {
        const { classs } = this.state;
        await classs.getClassByUserName( username );
        if(this._isMounted) {
            if( classs.getListClassByUserName.length > 0 ) {

                // render Pagination
                renderIZPagination( classs.getListClassByUserName, this.state.limit, this.props.location.search, 
                    this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );

            }else {
                this.setState({ listClass: [] });
            }
        }
    }

    // live search
    handleLiveSearch = (e) => {
        const { copyListClass }  = this.state;
        var searchListClass = copyListClass.filter(item => {
            var searchValue = item["TenLop"].toLowerCase();
            return searchValue.indexOf(e.target.value.toLowerCase()) !== -1;
        });
        if(searchListClass.length > 0) {
            this.setState({ listClass: searchListClass });
        }else{
            this.setState({ listClass: 'not found' });
        }
    }

    //search
    searchClassByID = async ( classID ) => {
        const { classs } = this.state;
        await classs.searchClassByID( classID );
        if(this._isMounted){
            if(classs.getListClassByID.length > 0){
                this.setState({ listClass: classs.getListClassByID });
            }else{
                this.setState({ listClass: [] });
            }
        }
    }
    searchClassByName = async ( className ) => {
        const { classs } = this.state;
        await classs.searchClassByName( className );
        if(this._isMounted){
            if(classs.getListClassByName.length > 0){
                this.setState({ listClass: classs.getListClassByName });
            }else{
                this.setState({ listClass: [] });
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
        if( b === 'Mã lớp' ) {
            this.searchClassByID( search );
            this.setState({ startSearch: false });
        }else if( b === 'Tên lớp' ) {
            this.searchClassByName( search );
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
        let user = this.context.userInfo;
        if( user.role === role.teacher ) {
            if( nextState.startClickPagination === true &&
                nextState.listClassSplit.length > 0
            ) {
                const query = new URLSearchParams(nextProps.location.search);
                const p = query.get('p');
                if( p !== null ) {
                    const num = parseInt(p);
                    const tempListClassSplit = nextState.listClassSplit.slice();
                    this.setState({
                        pdefault: (num - 1),
                        listClass: tempListClassSplit[num-1],
                        copyListClass: tempListClassSplit[num-1],
                        startClickPagination: false
                    });
                }
            }    
        }else{
            const search = nextProps.location.search;
            if( nextState.startSearch === true && search !== '' ) this.startSearch(search);
        } 
    }

    componentWillMount(){
        this.props.dispatch({ 
            type: 'ACTIVE_SIDEBAR',
            data: 'Classes'
        });
    }

    componentDidMount() {
        this._isMounted = true;
        let user = this.context.userInfo;
        if(user && user.role === role.teacher) {
            this.getClassByUserName( user.username );
        }else if(user && ( user.role === role.basis || user.role === role.school )) {
            const search = this.props.location.search;
            this.startSearch(search);
        } 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { match } = this.props;
        let user = this.context.userInfo;
        const { 
            listClass,
            inputSearch, menuSearchBy, searchBy,
            hasPagination, arrPagination, pdefault,
        } = this.state;

        const status = [
            {stt: 0, text: "Không có danh sách lớp trong cơ sử dữ liệu"},
            {stt: 1, text: "Bạn không thuộc khoa nào.(???)"},
        ];

        return(
            <Fragment>
                <Switch>
                    {/* User Class */}
                    <Route exact path={`${match.url}`} render={props =>
                        (user.role === role.teacher) &&
                            <MainClassTeacher
                                {...props}
                                user={user}
                                status={status[1]}
                                listClass={listClass}
                                handleLiveSearch={this.handleLiveSearch}

                                arrPagination={arrPagination}
                                hasPagination={hasPagination}
                                clickPagination={this.clickPagination}
                                pdefault={pdefault} />
                    } />
                    {/* Search Class */}
                    <Route path={`${match.url}/search`} render={() =>
                        (user.role === role.basis || user.role === role.school) &&
                            <MainClass
                                {...this.props}
                                user={user}
                                listClass={listClass}

                                menuSearchBy={menuSearchBy}
                                inputSearch={inputSearch}
                                handleSearch={this.handleSearch}
                                searchBy={searchBy}
                                searchInfo={this.searchInfo}
                                search={this.search}

                                pdefault={pdefault}
                            />
                    } />
                    {/* All Class */}
                    <Route path={`${match.url}/all`} render={() =>
                        (user.role === role.basis || user.role === role.school) &&
                            <AllClass {...this.props} user={user} status={status[0]} /> 
                    } />
                    {/* Add Class */}
                    <Route path={`${match.url}/add`} render={() =>
                        (user.role === role.basis) && <AddClass {...this.props} />
                    }/>
                    {/* Students and Update Class */}
                    <Route path={`${match.url}/:id`} render={props => <Student {...props} /> } />
                </Switch>
            </Fragment>
        );
    }
}
Class.contextType = UserContext;

export default connect()(Class);