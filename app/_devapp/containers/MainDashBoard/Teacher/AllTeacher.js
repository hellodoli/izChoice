import React, { Component, Fragment } from 'react';

import TeacherModel from '../../../model/Teacher';

import { TeacherTable, EmptyTeacher } from './TeacherTable';

import { LiveSearch } from '../Search';
import IZPagination from '../../../components/Pagination';

import { renderIZPagination } from '../../../func-action';

import { limitPage } from '../../../config';

import { connect } from 'react-redux';

class AllTeacher extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            teacher: new TeacherModel(),
            listAllTeacher: '',
            copyListAllTeacher: '',

            listAllTeacherSplit: [],
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
            listAllTeacherSplit: arrDataPag, // dùng khi user chuyển pag
            listAllTeacher: arrDataPag[p-1],
            copyListAllTeacher: arrDataPag[p-1],
            hasPagination: true,
            arrPagination: arrPagination,
            pdefault: (p - 1)
        });
    }
    invalidRenderPagination = (note) => { this.setState({ listAllTeacher: note }) }
    noRenderPagination = (data) => {
        this.setState({
            listAllTeacher: data,
            copyListAllTeacher: data
        });
    }

    clickPagination = () => { this.setState({ startClickPagination: true }) };

    getAllTeacher = async () => {
        const { teacher } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await teacher.getAllTeacher();
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted) {
            if(teacher.getListAllTeacher.length > 0) {
                // render Pagination
                renderIZPagination( teacher.getListAllTeacher, this.state.limit, this.props.location.search, 
                    this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );
            }else{
                this.setState({ listAllTeacher: [] }); 
            }
        }
    }

    // live search
    handleLiveSearch = (e) => {
        const { copyListAllTeacher }  = this.state;
        var searchlistAllTeacher = copyListAllTeacher.filter(item => {
            var searchValue01 = item["Ten"].toLowerCase();
            var searchValue02 = item["Ho"].toLowerCase();
            if( searchValue01.indexOf(e.target.value.toLowerCase()) !== -1 || 
            searchValue02.indexOf(e.target.value.toLowerCase()) !== -1 ) {
                return item;
            }
        });
        if(searchlistAllTeacher.length > 0) {
            this.setState({ listAllTeacher: searchlistAllTeacher });
        }else{
            this.setState({ listAllTeacher: 'not found' });
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getAllTeacher();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillUpdate( nextProps, nextState ) {
        if( nextState.startClickPagination === true &&
            nextState.listAllTeacherSplit.length > 0
        ) {
            const query = new URLSearchParams(nextProps.location.search);
            const p = query.get('p');
            if( p !== null ) {
                const num = parseInt(p);
                const tempListAllTeacherSplit = nextState.listAllTeacherSplit.slice();
                this.setState({
                    pdefault: (num - 1),
                    listAllTeacher: tempListAllTeacherSplit[num-1],
                    copyListTeacher: tempListAllTeacherSplit[num-1],
                    startClickPagination: false
                });
            }
        }
    }

    render() {
        const { listAllTeacher, hasPagination, arrPagination, pdefault } = this.state;
        const { user, status, match } = this.props;// other is match, history, location
        const customMatch = {
            url: `${match.url}/all`
        }
        return(
            <Fragment>
                { (listAllTeacher.length > 0)
                    ?
                    <Fragment>
                        <div className="iz-header"><h3>Danh sách tất cả giáo viên</h3></div>
                        <div className="iz-body">
                            <LiveSearch handleLiveSearch={this.handleLiveSearch} />
                            <div className="iz-data iz-teacher-data">
                                { ( listAllTeacher === "not found" )
                                    ? <div>Không tìm thấy dữ liệu ...</div>
                                    : 
                                    <div>
                                        <TeacherTable 
                                            match={match}
                                            user={user}
                                            listTeacher={listAllTeacher}
                                            pdefault={pdefault}
                                        />
                                        { hasPagination === true &&
                                            <IZPagination
                                                match={customMatch}
                                                arrPagination={arrPagination}
                                                clickPagination={this.clickPagination}
                                                pdefault={pdefault}
                                            />
                                        }
                                    </div>
                                    
                                }
                            </div>
                        </div>
                    </Fragment>
                    : (listAllTeacher.length === 0 && listAllTeacher !== '')
                        && <EmptyTeacher status={status} />
                }
            </Fragment>
        )
    }
}

export default connect()(AllTeacher);