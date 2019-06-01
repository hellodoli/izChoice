import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from '../../../user-context';
import { role, limitPage } from '../../../config';

import CourseModel from '../../../model/Course';
import ClassModel from '../../../model/Class';
import ExamModel from '../../../model/Exam';
import RegisterModel from '../../../model/Register';

import { CourseTable, EmptyCourse } from './CourseTable';
import AllCourse from './AllCourse';
import Exam from '../Exam/';

import { LiveSearch } from '../Search';
import ModalRegister from '../ModalRegister';
import IZPagination from '../../../components/Pagination';

import { connect } from 'react-redux';
import { renderIZPagination } from '../../../func-action';
import { randomID } from '../../../func-action';

function getSQLExam(start,examList) {
    let result = '';
    for (let i = 0; i < examList.length; i++) {
        result += start + `'${examList[i]}'` + ' or ';
    }
    return result.slice(0,-3);
}

const MainCourseTeacher = (props) => {
    const {
        status,
        listCourse, listExamLevel, listClass,
        handleLiveSearch,
        modal, toggleModal,
        getInfo, setUpInfo, resetInfo,
        labelError,
        checkRegister, registerInfo,
        pdefault, hasPagination, arrPagination, clickPagination,
        match,
    } = props;
    return(
        <Fragment>
            { (listCourse.length > 0)
                ?
                <div className="iz-course-wrapper">
                    <div className="iz-header"><h3>Danh sách môn học bạn đã tạo đề</h3></div>
                    <div className="iz-body">
                        <LiveSearch handleLiveSearch={handleLiveSearch} />
                        <div className="iz-data iz-course-data">
                            { (listCourse === "not found")
                                ? <div> Rất tiếc, Không tìm thấy môn học </div>
                                :
                                <div>
                                    <CourseTable
                                        listCourse={listCourse}
                                        setUpInfo={setUpInfo}
                                        pdefault={pdefault} />
                                    { hasPagination === true &&
                                        <IZPagination
                                            match={match}
                                            arrPagination={arrPagination}
                                            clickPagination={clickPagination}
                                            pdefault={pdefault} />
                                    }
                                </div>
                                
                            }
                            <div className="modal-register">
                                <ModalRegister
                                    modal={modal}
                                    toggleModal={toggleModal}
                                    resetInfo={resetInfo}
                                    getInfo={getInfo}
                                    labelError={labelError}
                                    checkRegister={checkRegister}
                                    listExamLevel={listExamLevel}
                                    listClass={listClass}
                                    registerInfo={registerInfo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                : (listCourse.length === 0 && listCourse !== '')
                    && <EmptyCourse status={status} />
            }
        </Fragment>
    )
};

class Course extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            exam: new ExamModel(),
            classs: new ClassModel(),
            course: new CourseModel(),
            regis: new RegisterModel(),

            listExamLevel: '',
            listClass: '',
            listCourse: '',
            copyListCourse: '',// use for live search.

            listCourseSplit: [],
            limit: limitPage, // number data row
            hasPagination: false,
            arrPagination: [],
            startClickPagination: false,
            pdefault: 0, // index của pagination

            listExamID: '', // store all list exam ID after register.
            listExamRandom: '',
            start: 'bd.MaBD = ',

            isExistExam: 1,
            examID: '',

            modal: false,
            registerInfo: [],
            labelClassError: '',
            labelTimeError: '',
            labelDateError: '',
            labelCountExamError: '',
            labelDuarationError: '',
            labelLevelError: '',

            inputSearch: '', // use for Search
            searchBy: 'Tìm kiếm theo',
            menuSearchBy: ['Mã môn học', 'Tên môn học', 'Giáo viên tạo đề'],
            startSearch: false
        };
    }
    
    // render pagination
    renderPagination = (arrDataPag, arrPagination, p) => {
        this.setState({
            listCourseSplit: arrDataPag, // dùng khi user chuyển pag
            listCourse: arrDataPag[p-1],
            copyListCourse: arrDataPag[p-1],
            hasPagination: true,
            arrPagination: arrPagination,
            pdefault: (p - 1)
        });
    }
    invalidRenderPagination = (note) => { this.setState({ listCourse: note }) }
    noRenderPagination = (data) => {
        this.setState({
            listCourse: data,
            copyListCourse: data
        });
    }

    clickPagination = () => { this.setState({ startClickPagination: true }) };

    //--- Dùng cho Register
    // lấy tất cả lớp thuộc khoa của giáo viên x (chọn lớp)
    getClassByUserName = async ( username ) => {
        const { classs } = this.state;
        await classs.getClassByUserName( username );
        if(this._isMounted) {
            if(classs.getListClassByUserName.length > 0) {
                this.setState({ listClass: classs.getListClassByUserName });
            }else {
                this.setState({ listClass: [] });
            }
        }
    }
    // lấy số lần trong GVDK của lớp nào đó và môn nào đó
    getRegisterTime = async ( classID, subjectID ) => {
        const { regis } = this.state;
        alert('1');
        await regis.getRegisterTime( classID, subjectID );
        if(this._isMounted) {
            if(regis.getListRegisterTime.length > 0){
                this.setState({ labelClassError: regis.getListRegisterTime });
            }else{
                this.setState({ labelClassError: [] });
            }
        }
    }
    // lấy đề loại gì (A,B,C), lan may, trong môn nào đó (chọn trình độ)
    getExamLevel = async ( subjectId, time ) => {
        const { exam } = this.state;
        await exam.getExamLevell( subjectId, time );
        if(this._isMounted) {
            if(exam.getListExamLevel.length > 0){
                this.setState({ listExamLevel: exam.getListExamLevel });
            }else{
                this.setState({ listExamLevel: [] });
            }
        }
    }

    getCourseByName = async ( search ) => {
        const { course } = this.state;
        await course.getCourseByName( search );
        if(this._isMounted) {
            if(course.getListCourseByName.length > 0) {
                this.setState({ listCourse: course.getListCourseByName });
            }else {
                this.setState({ listCourse: [] });
            }
        }
    }
    getCourseByUserName = async ( username ) => {
        const { course } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await course.getCourseByUserName( username );
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted){
            if(course.getListCourseByUserName.length > 0) {
                renderIZPagination( course.getListCourseByUserName, this.state.limit, this.props.location.search, 
                    this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );
            }else{
                this.setState({ listCourse: [] });
            }
        }
    }

    getExamID = async ( time, level, courseID ) => {
        const { exam } = this.state;
        await exam.getExamID( time, level, courseID );
        if(this._isMounted) {
            if(exam.getListExamID.length > 0){
                const listExamIDArray = exam.getListExamID.map(item => item["MaBD"]);
                this.setState({ listExamID: listExamIDArray });
            }else{
                this.setState({ listExamID: [] });
            }
        }
    }
    getExamDetailRandom = async ( examIdSql, number ) => {
        const { exam } = this.state;
        await exam.getExamDeTailRandom( examIdSql, number );
        if(this._isMounted) {
            if(exam.getListExamDeTailRandom.length > 0) {
                this.setState({ listExamRandom: exam.getListExamDeTailRandom });
            } else {
                this.setState({ listExamRandom: [] });
            }
        }
    }

    insertRegister = async ( username, classId, subjectId, level, datetime, turn, count, duration ) => {
        const { regis } = this.state;
        await regis.insertRegister( username, classId, subjectId, level, datetime, turn, count, duration );
        if(this._isMounted) {
            if(regis.command === true){
                alert('Them Register thanh cong');
            }else{
                alert('Them Register that bai');
            }
        }
    }

    insertExam = async ( examID, courseId, username, level, time ) => {
        const { exam } = this.state;
        await exam.insertExam( examID, courseId, username, level, time );
    }
    insertExamDetail = async ( examDetailSQL ) => {
        const { exam } = this.state;
        await exam.insertExamDetail( examDetailSQL );
        if( exam.commandInsertExamDetail === true ) {
            alert('Thêm đề thành công');
        }else{
            alert('thêm đề thành công');
        }
    }


    // random ExamID
    checkExistExam = async ( examID ) => {
        const { exam } = this.state;
        await exam.checkExistExam( examID );
        if( this._isMounted ) this.setState({ isExistExam: exam.isExistExam });  
    }
    randomExamID = async () => {
        while( this.state.isExistExam === 1 ) {
            const examID = randomID(8);
            await this.checkExistExam(examID);
            if( this.state.isExistExam === 0 ) {
                this.setState({ examID });
            }
        }
    }


    // toggle Modal
    toggleModal = () => {
        this.setState(prevState => ({ modal: !prevState.modal }));
    }

    //bấm nút Đăng ký đề thì gọi hàm setUpInfo()
    setUpInfo = async (maMH,tenMH) => {
        let user = this.context.userInfo;
        const registerInfoCopy = [];
        await registerInfoCopy.push(maMH,tenMH);
        this.getClassByUserName( user.username );
        //after prepare info.
        this.setState({ registerInfo: registerInfoCopy });
        this.toggleModal();
    }

    // modal open thì gọi hàm getInfo()
    getInfo = () => {
        const { registerInfo } = this.state;
        var that = this;
        // select
        const classSelect = document.getElementById('classSelect');
        const dayExam = document.getElementById("dayExam");
        const timeExam = document.getElementById("timeExam");
        const countExamSelect = document.getElementById('countExamSelect');
        const durationSelect = document.getElementById('durationSelect');
        const levelExamSelect = document.getElementById('levelExamSelect');
        
        //generate examID
        this.randomExamID();

        // check danh sach lop.
        classSelect.addEventListener('change', async function() {
            //render lần thi
            await that.getRegisterTime( this.value, registerInfo[0] );
            //render trình độ
            const countSelect = document.getElementById('countSelect');
            if(registerInfo[0].length > 0 && countSelect.value > 0){
                that.getExamLevel( registerInfo[0], countSelect.value );
            }
        });

        levelExamSelect.addEventListener('change', function() {
            that.setState({ labelLevelError: false });
        });

        // minium day exam
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy= today.getFullYear();
        if(dd < 10) dd = '0' + dd;
        if(mm < 10) mm = '0' + mm;
        today = yyyy + '-' + mm + '-' + dd;

        dayExam.min = today;
        dayExam.value = today;

        // check date valid.
        dayExam.addEventListener('change', function() {
            const year = parseInt(this.value.slice(0,4));
            const month = parseInt(this.value.slice(5,7));
            const day = parseInt(this.value.slice(8,11));
            if( year < parseInt(yyyy) ) {
                that.setState({ labelDateError: true });
            }else if( month < parseInt(mm) ) {
                that.setState({ labelDateError: true });
            }else if( month === parseInt(mm) && day < parseInt(dd) ) {
                that.setState({ labelDateError: true });
            }else {
                that.setState({ labelDateError: false });
            }
        });

        // check time valid (7:00 sáng đến 18:00 tối)
        timeExam.addEventListener('change', function() {
            const hour = parseInt( this.value.slice(0,2) );
            if( hour < 7 || hour > 18) {
                that.setState({ labelTimeError: true });
            }else {
                that.setState({ labelTimeError: false });
            }
        });

        // durationSelect, examCountSelect
        durationSelect.addEventListener('change', function(){ that.setState({ labelDuarationError: false }); });
        countExamSelect.addEventListener('change', function(){ that.setState({ labelCountExamError: false }) });
    }

    // modal close thì gọi hàm resetInfo()
    resetInfo = () => {
        this.setState({ 
            labelClassError: '',
            labelTimeError: '',
            labelDateError: '',
            labelCountExamError: '',
            labelDuarationError: '',
            labelLevelError: ''
        });
    }

    checkRegister = async () => {
        let user = this.context.userInfo;
        const {
            start,
            registerInfo,
            labelClassError,
            labelTimeError,
            labelDateError,
            labelDuarationError,
            labelCountExamError,
            labelLevelError
        } = this.state;

        if(labelClassError === '') {
            this.setState({ labelClassError: 'blank' });
        }
        if(labelTimeError === '') {
            this.setState({ labelTimeError: 'blank' });
        }
        if(labelDateError === '' ) {
            this.setState({ labelDateError: 'blank' });
        }
        if(labelDuarationError === '') {
            this.setState({ labelDuarationError: 'blank' });
        }
        if(labelCountExamError === '') {
            this.setState({ labelCountExamError: 'blank' });
        }
        if(labelLevelError === '') {
            this.setState({ labelLevelError: 'blank' });
        }
        if( (labelClassError !== '' && labelClassError !== 'blank' && labelClassError.length < 2) &&
            (labelTimeError === false) && (labelDateError === false) && (labelDuarationError === false) &&
            (labelCountExamError === false) && (labelLevelError === false) ) {
            
            const comfirm = window.confirm("Bạn có chắc muốn đăng ký không");
            if(comfirm) {
                const classSelect = document.getElementById('classSelect');
                const levelExamSelect = document.getElementById('levelExamSelect');
                const countSelect = document.getElementById('countSelect');
                const countExamSelect = document.getElementById('countExamSelect');
                const durationSelect = document.getElementById('durationSelect');
                const dayExam = document.getElementById("dayExam");
                const timeExam = document.getElementById("timeExam");
                const datetime = dayExam.value + ' ' + timeExam.value;

                await this.getExamID( countSelect.value, levelExamSelect.value, registerInfo[0] );

                if( this.state.listExamID.length > 0 ) {
                    const sqlExam = getSQLExam( start, this.state.listExamID );
                    console.log(sqlExam);
                    console.log(countExamSelect.value);
                    await this.getExamDetailRandom( sqlExam, countExamSelect.value );
                    if( this.state.listExamRandom.length > 0 ) {
                        await this.insertExam(this.state.examID, registerInfo[0], user.username, levelExamSelect.value, countSelect.value );
                        if( this.state.exam.commandInsertExam === true ) {
                            const mapSQL = this.state.listExamRandom.map(item => `INSERT INTO BodeCT(MaBD,Noidung,A,B,C,D,Dapan) VALUES ('${this.state.examID}', '${item.Noidung}', '${item.A}', '${item.B}', '${item.C}', '${item.D}', '${item.Dapan}')`);
                            await this.insertExamDetail( mapSQL );
                            await this.insertRegister( user.username, classSelect.value, registerInfo[0], levelExamSelect.value, datetime, countSelect.value, countExamSelect.value, durationSelect.value);
                            this.toggleModal();
                        }
                    }else{
                        alert('Tất cả đề đều không có câu hỏi, vui lòng thêm câu hỏi rồi đăng ký lại.');
                    }
                }
            }
        }
    }

    // live search
    handleLiveSearch = (e) => {
        const { copyListCourse }  = this.state;
        var searchListCourse = copyListCourse.filter(item => {
            var searchValue = item["TenMH"].toLowerCase();
            return searchValue.indexOf(e.target.value.toLowerCase()) !== -1;
        });
        if(searchListCourse.length > 0) {
            this.setState({ listCourse: searchListCourse });
        }else{
            this.setState({ listCourse: 'not found' });
        }
    }

    componentWillMount(){
        this.props.dispatch({ 
            type: 'ACTIVE_SIDEBAR',
            data: 'Courses'
        });
    }

    componentWillUpdate( nextProps, nextState ){
        if( nextState.startClickPagination === true &&
            nextState.listCourseSplit.length > 0
        ) {
            const query = new URLSearchParams(nextProps.location.search);
            const p = query.get('p');
            if( p !== null ) {
                const num = parseInt(p);
                const tempListCourseSplit = nextState.listCourseSplit.slice();
                this.setState({
                    pdefault: (num - 1),
                    listCourse: tempListCourseSplit[num-1],
                    copyListCourse: tempListCourseSplit[num-1],
                    startClickPagination: false
                });
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        let user = this.context.userInfo;
        if(user && user.role === role.teacher) {
            this.getCourseByUserName( user.username );
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { match } = this.props;
        let { userInfo: user } = this.context;
        const {
            listCourse, listExamLevel, listClass, registerInfo,
            modal,
            labelClassError,
            labelTimeError,
            labelDateError,
            labelDuarationError,
            labelCountExamError,
            labelLevelError,
            pdefault, hasPagination, arrPagination
        } = this.state;

        const labelError = {
            labelClassError,
            labelTimeError,
            labelDateError,
            labelDuarationError,
            labelCountExamError,
            labelLevelError
        };

        const status = [
            {stt: 0, text: "Không có môn học nào trong cơ sử dữ liệu"},
            {stt: 1, text: "Bạn chưa tạo đề nào, hãy bắt đầu tạo mới một đề"},
        ];
        
        return(
            <Fragment>
                <Switch>
                    {/* User Course */}
                    <Route exact path={`${match.url}`} render={props =>
                        ( user.role === role.teacher ) &&
                            <MainCourseTeacher
                                {...props}
                                status={status[1]}
                                listCourse={listCourse}
                                handleLiveSearch={this.handleLiveSearch}

                                modal={modal}
                                toggleModal={this.toggleModal}
                                resetInfo={this.resetInfo}
                                getInfo={this.getInfo}
                                setUpInfo={this.setUpInfo}
                                labelError={labelError}
                                registerInfo={registerInfo}
                                listExamLevel={listExamLevel}
                                listClass={listClass}
                                checkRegister={this.checkRegister}

                                hasPagination={hasPagination}
                                pdefault={pdefault}
                                arrPagination={arrPagination}
                                clickPagination={this.clickPagination}
                            />
                    } />
                    {/* All Course */}
                    <Route path={`${match.url}/all`} render={props =>
                        <AllCourse
                            {...props}
                            status={status[0]}
                            modal={modal}
                            toggleModal={this.toggleModal}
                            setUpInfo={this.setUpInfo}
                            getInfo={this.getInfo}
                            resetInfo={this.resetInfo}
                            labelError={labelError}
                            checkRegister={this.checkRegister}
                            listExamLevel={listExamLevel}
                            listClass={listClass}
                            registerInfo={registerInfo} />
                    } />
                    {/* Exam in course */}
                    <Route path={`${match.url}/:id`} component={Exam} />
                </Switch>
            </Fragment>
        );
    }
}
Course.contextType =  UserContext;
const mapStateToProps = (store) => {
    return{
        isLoadingData: store.isLoadingData
    }
}
export default connect(mapStateToProps)(Course);