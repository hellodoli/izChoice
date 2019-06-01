import React, { Component, Fragment } from 'react';

import CourseModel from '../../../model/Course';

import { UserContext } from '../../../user-context';
import { LiveSearch } from '../Search';
import { CourseTable, EmptyCourse } from './CourseTable';
import ModalRegister from '../ModalRegister';
import IZPagination from '../../../components/Pagination';

import { renderIZPagination } from '../../../func-action';

import { role, limitPage } from '../../../config';

import { connect } from 'react-redux';

class AllCourse extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            course: new CourseModel(),
            listAllCourse: '',
            copyListCourse: '',

            listAllCourseSplit: [],
            limit: limitPage, // number data row
            hasPagination: false,
            arrPagination: [],
            startClickPagination: false,
            pdefault: 0 // index của pagination
        };
    }

    // live search
    handleLiveSearch = (e) => {
        const { copyListCourse }  = this.state;
        var searchListCourse = copyListCourse.filter(item => {
            var searchValue = item["TenMH"].toLowerCase();
            return searchValue.indexOf(e.target.value.toLowerCase()) !== -1; 
        });
        if(searchListCourse.length > 0) {
            this.setState({ listAllCourse: searchListCourse });
        }else{
            this.setState({ listAllCourse: 'not found' });
        }
    }

    // mix course (show exam count of user)
    getCourseNotDuplicate = async (username) => {
        const { course } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await course.getAllCourse();
        await course.getCourseByUserName(username);
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted) {
            if(course.getListAllCourse.length > 0) {
                if(course.getListCourseByUserName.length > 0) {
                    // User have Exam.
                    const listAllCourse = course.getListAllCourse;
                    const listCourseByUserName = course.getListCourseByUserName;
                    var ids = new Set(listCourseByUserName.map(d => d.MaMH));
                    var listMerged = [...listCourseByUserName, ...listAllCourse.filter(d => !ids.has(d.MaMH))];

                    // render Pagination
                    renderIZPagination( listMerged, this.state.limit, this.props.location.search, 
                        this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );

                }else{
                    // User dont have exam.
                    const listAllCourse = course.getListAllCourse;

                    // render Pagination
                    renderIZPagination( listAllCourse, this.state.limit, this.props.location.search, 
                        this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );

                }
            }else {
                this.setState({ listAllCourse: [] });
            }
        }
    }

    getAllCourseNotDuplicate = async () => {
        this.setState({ startClickPagination: false });
        const { course } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await course.getAllCourse();
        await course.getAllCourseForBasis();
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted) {
            if(course.getListAllCourse.length > 0) {
                if(course.getListAllCourseForBasis.length > 0) {
                    // đã có giáo viên tạo đề
                    const listAllCourse = course.getListAllCourse;
                    const listAllCourseForBasis = course.getListAllCourseForBasis;
                    var ids = new Set(listAllCourseForBasis.map(d => d.MaMH));
                    var listMerged = [...listAllCourseForBasis, ...listAllCourse.filter(d => !ids.has(d.MaMH))];

                    // render Pagination
                    renderIZPagination( listMerged, this.state.limit, this.props.location.search, 
                        this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );

                }else{
                    // chưa có giáo viên nào tạo đề
                    const listAllCourse = course.getListAllCourse;

                    // render Pagination
                    renderIZPagination( listAllCourse, this.state.limit, this.props.location.search, 
                        this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );

                }
            }else {
                this.setState({ listAllCourse: [] });
            }
        }
    }

    // render pagination
    renderPagination = (arrDataPag, arrPagination, p) => {
        this.setState({
            listAllCourseSplit: arrDataPag, // dùng khi user chuyển pag
            listAllCourse: arrDataPag[p-1],
            copyListCourse: arrDataPag[p-1],
            hasPagination: true,
            arrPagination: arrPagination,
            pdefault: (p - 1)
        });
    }
    invalidRenderPagination = (note) => { this.setState({ listAllCourse: note }) }
    noRenderPagination = (data) => {
        this.setState({
            listAllCourse: data,
            copyListCourse: data
        });
    }

    clickPagination = () => { this.setState({ startClickPagination: true }) };

    componentDidMount() {
        this._isMounted = true;
        let user  = this.context.userInfo;
        if( user.role === role.teacher ) {
            this.getCourseNotDuplicate(user.username);
        }else if( user.role === role.basis || user.role === role.school ) {
            this.getAllCourseNotDuplicate();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillUpdate( nextProps, nextState ) {
        if( nextState.startClickPagination === true &&
            nextState.listAllCourseSplit.length > 0
        ) {
            const query = new URLSearchParams(nextProps.location.search);
            const p = query.get('p');
            if( p !== null ) {
                const num = parseInt(p);
                const tempListAllCourseSplit = nextState.listAllCourseSplit.slice();
                this.setState({
                    pdefault: (num - 1),
                    listAllCourse: tempListAllCourseSplit[num-1],
                    copyListCourse: tempListAllCourseSplit[num-1],
                    startClickPagination: false
                });
            }
        }
    }

    render() {
        const { 
            status,
            listExamLevel, listClass, registerInfo,
            modal, toggleModal,
            setUpInfo, getInfo, resetInfo, labelError, checkRegister,
            match,
        } = this.props;

        const { listAllCourse, hasPagination, arrPagination, pdefault } = this.state;
        
        return(
            <Fragment>
                { ( listAllCourse.length > 0 )
                    ?
                    <div className="iz-course-wrapper">
                        <div className="iz-header"><h3>Danh sách toàn bộ môn học</h3></div>
                        <div className="iz-body">
                            <LiveSearch handleLiveSearch={this.handleLiveSearch} />
                            <div className="iz-data iz-course-data">
                                {/* other = match, location, history */}
                                { ( listAllCourse === "not found" )
                                    ? <div> Rất tiếc, Không tìm thấy môn học </div>
                                    :   
                                    <div>
                                        <CourseTable
                                            listCourse={listAllCourse}
                                            setUpInfo={setUpInfo}
                                            pdefault={pdefault}
                                        />
                                        { hasPagination === true &&
                                            <IZPagination
                                                match={match}
                                                arrPagination={arrPagination}
                                                clickPagination={this.clickPagination}
                                                pdefault={pdefault}
                                            />
                                        }
                                    </div> 
                                }
                                <div className="modal-register">
                                    <ModalRegister modal={modal} toggleModal={toggleModal} 
                                        resetInfo={resetInfo}
                                        getInfo={getInfo}
                                        labelError={labelError}
                                        checkRegister={checkRegister}
                                        registerInfo={registerInfo}
                                        listExamLevel={listExamLevel}
                                        listClass={listClass} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : ( listAllCourse.length === 0 && listAllCourse !== '' ) && <EmptyCourse status={status} />
                }
            </Fragment>
        )
    }
}

AllCourse.contextType = UserContext;
export default connect()(AllCourse);