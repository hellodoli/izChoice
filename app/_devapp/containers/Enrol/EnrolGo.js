import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ExamModel from '../../model/Exam';
import ScoreModel from '../../model/Score';

import { ExamDetailEnrol } from '../MainDashBoard/Exam/EditExam';

import { Container, Form,
    Input, InputGroup, InputGroupAddon,
    Card, Button, CardTitle, CardBody } from 'reactstrap';

function closeIt() {
    return "Any string value here forces a dialog box to \n" + 
        "appear before closing the window.";
}

function calScore(listExamDetailCopy,listExamDetail,scoreEach) {
    let scoreArr = [];
    for (let i = 0; i < listExamDetail.length; i++) {
        if(listExamDetailCopy[i] === listExamDetail[i]["Dapan"]) {
            scoreArr.push(scoreEach);
        }else{
            scoreArr.push(0);
        }
    }

    let sum = 0;
    for(let i = 0; i < scoreArr.length; i++){
        sum = sum + scoreArr[i];
    }
    return sum;
}

function getDateTimeToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy= today.getFullYear();
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;

    var time = today.getHours() + ':' + today.getMinutes();
    var date = yyyy + '-' + mm + '-' + dd;
    var datetime = date + ' ' + time;
    return datetime;
}

function isDisabled (countTime, timeExam) {
    if(countTime.length > 0){
        if(countTime[0]["count"] === "2") {
            return true;
        }else if(timeExam === countTime[0]["count"]) {
            return true;
        }else{
            return false;
        }    
    }
}

const ListExamCanStartItem = ({ item, match, goStart, countTime }) => (
    <Card>
        <h4 className="card-header">{ item["TenMH"] }</h4>
        <CardBody>
            <CardTitle>Lần thi: { item["Lan"] }</CardTitle>
            <CardTitle>Số câu thi: { item["Socauthi"] }</CardTitle>
            <CardTitle>Thời gian: { item["Thoigian"] }</CardTitle>
            <Button
                color="primary"
                onClick={ () => goStart( match.url, item["MaMH"], item["Lan"], item["Thoigian"] ) }
                disabled={ isDisabled( countTime, item["Lan"] ) }
            > { ( isDisabled( countTime, item["Lan"]) === true ) ? 'Bạn đã thi môn này rồi' : 'Click vào đây để bắt đầu thi' } </Button>
        </CardBody>
    </Card>
);

const ListExamCanStart = (props) => (
    <Fragment>
        { props.listShow.length > 0
            ? 
            <div className="iz-card-enrol">
                { props.listShow.map( item => 
                    <ListExamCanStartItem 
                        key={item["MaBD"]}
                        item={item}
                        match={props.match}
                        goStart={props.goStart}
                        countTime={props.countTime} />
                )}
            </div>
            : <Redirect to="/enrol" />
        }
    </Fragment>
);

const ExamCountDown = ({ minute, second }) => (
    <div className="iz-enrol-countdown">
        <div>Countdown</div>
        <span>{minute} : {second}</span>
    </div>
);

const ExamStart = (props) => (
    <div className="iz-enrol-start">
        {/* Enrol Access */}
        { props.examID === '' &&
            <div className="iz-enrol-fixed-wrapper">
                <div className="iz-enrol-wrapper">
                    <div className="iz-enrol-container">
                        <Form onSubmit={ e => e.preventDefault() }>
                            <InputGroup>
                                <Input id="enrolStartCourse" type="password" placeholder="Hãy nhập mã access ..." />
                                <InputGroupAddon addonType="append">
                                    <Button type="button" color="primary" onClick={ props.goEnrol }> Bắt đầu thi </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </div>
                </div>
            </div>
        }

        { props.listExamDetail.length > 0 &&
            <div className="iz-form-action iz-exam-detail-wrapper">
                
                <ExamCountDown 
                    minute={props.minute}
                    second={props.second} />
                
                <ExamDetailEnrol
                    listExamDetail={props.listExamDetail}
                    listExamDetailCopy={props.listExamDetailCopy}
                    getRecord={props.getRecord} />

                <br></br>

                <Button id="btnSubmitScore" color="primary" onClick={props.submitRecord}> Submit </Button>
                
            </div>
        }
    </div>    
);

class EnrolGo extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            exam: new ExamModel(),
            score: new ScoreModel(),
            listExamDetail: '',
            listExamDetailCopy: '',
            
            time: '', // lần thi
            subjectID: '',// mã môn thi
            examID: '',// mã đề thi
            countdown: '',// Thời gian thi
            minute: '',// store minute countdown
            second: ''// store second countdown
        }
    }

    countdownTime = () => {
        var that = this;
        //console.log(that.state.countdown, typeof that.state.countdown);
        var x = window.setInterval( function(){
            that.setState(prevState => ({ countdown: prevState.countdown - 1000 }));
            var minute = Math.floor((that.state.countdown % (1000 * 60 * 60)) / (1000 * 60));
            var second = Math.floor((that.state.countdown % (1000 * 60)) / 1000);
            that.setState({
                minute,
                second
            });
            if(that.state.countdown < 0){
                // time out
                var btnSubmitScore = document.getElementById('btnSubmitScore');
                btnSubmitScore.click();
                window.clearInterval(x);
            }
        }, 1000);
    }

    getExamDetailByEnrol = async ( examId, courseId, time ) => {
        const { exam } = this.state;
        await exam.getExamDetailByEnrol( examId, courseId, time );
        if(this._isMounted){
            const length = exam.getListExamDetailByEnrol.length;
            if( length > 0) {
                this.setState({ 
                    listExamDetail: exam.getListExamDetailByEnrol,
                    listExamDetailCopy: Array(length).fill('')
                });
            } else {
                this.setState({ 
                    listExamDetail: [],
                    listExamDetailCopy: []
                });
            }
        }
    }

    insertRecord = async (username, subjectId, examId, time, datetime, scoreReal, content) => {
        const { score } = this.state;
        await score.insertScore(username, subjectId, examId, time, datetime, scoreReal, content);
        if(this._isMounted){
            if(score.command === true) {
                alert('Nộp bài thành công');
                this.props.history.push('/enrol');
            }else{
                //alert('Hiểu rồi ha');
                console.log('Nộp bài thất bại');
            }
        }  
    }

    // qua trang nhập mã access đề thi.
    goStart = ( url, subjectID, time, countdown ) => {
        const confirm = window.confirm('Bạn có chắc muốn thi môn này không ?');
        if( confirm && this.props.canStart === true ){
            this.setState({
                time,
                subjectID,
                countdown: parseInt(countdown*60*1000)
            });
            this.props.history.push(`${url}/start`);
        }
    }

    // lấy danh sách đề thi thừ mã access và bắt đầu thi
    goEnrol = async () => {
        const { subjectID, time } = this.state;
        const enrol = document.getElementById('enrolStartCourse');
        const examID = enrol.value;
        await this.getExamDetailByEnrol( examID, subjectID, time );
        if( this.state.listExamDetail.length > 0 ){
            if( this.props.canStart === true ) {
                this.setState({ examID });
                this.countdownTime();
                alert('Bạn được thi');
            }
        }else{
            alert('Mã access bạn nhập không hợp lệ');
        }
    }

    getRecord = (e,index) => {
        const value = e.target.value;
        let listExamCheck = this.state.listExamDetailCopy.slice();
        listExamCheck[index] = value;
        this.setState({ listExamDetailCopy: listExamCheck });
    }

    // submit exam.
    checkRecord = (listExamDetail, listExamDetailCopy, time, subjectID, examID, user) => {
        // calculator score
        const scoreEach = 10 / listExamDetailCopy.length;
        const sum = calScore(listExamDetailCopy, listExamDetail, scoreEach);
        // get datetime today
        const datetime = getDateTimeToday();
        // save listExamDetailCopy content
        let text = "";
        for(let i = 0; i < listExamDetailCopy.length; i++) {
            text = text + `Câu [${i+1}] = ${listExamDetailCopy[i]}. `;
        }
        //console.log(user.username, subjectID, examID, time, datetime, sum, text);
        this.insertRecord( user.username, subjectID, examID, time, datetime, sum, text);
    }
    submitRecord = () => {
        const { listExamDetail, listExamDetailCopy, 
            countdown, time, subjectID, examID } = this.state;
        const { user } = this.props;
        // time out, submit anyway
        if( countdown < 0 ){
            alert('Bạn đã hết thời gian làm bài. Hệ thống sẽ tự động lưu bài kiểm tra của bạn');
            this.checkRecord(listExamDetail, listExamDetailCopy, time, subjectID, examID, user);
        }else{
            var isFinishExam = true;
            for (let i = 0; i < listExamDetailCopy.length; i++) {
                if(listExamDetailCopy[i] === "") isFinishExam = false;
            }

            if(!isFinishExam) {
                // submit but not finish Exam
                alert("Bạn chưa chọn hết đáp án. Vui lòng chọn hết rồi nộp bài.");
            }else{
                var confirm = window.confirm('Bạn có chắc muốn nộp bài ?');
                if(confirm) {
                    // finish Exam prepare submit
                    this.checkRecord(listExamDetail, listExamDetailCopy, time, subjectID, examID, user);
                }
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('beforeunload',closeIt);
    }

    componentWillUnmount() {
        this._isMounted = false;
        //window.removeEventListener('beforeunload',closeIt);
    }

    render() {
        const { 
            listExamDetail, listExamDetailCopy,
            time, subjectID, examID, countdown, minute, second
        } = this.state;

        const { match, listShow, canStart, countTime } = this.props;

        return(
            <Container>
                <div className="enrol-go">
                    <Switch>
                        <Route exact path={match.url} render={props => 
                            <ListExamCanStart
                                {...props}
                                listShow={listShow}
                                countTime={countTime}
                                goStart={this.goStart} />
                        } />
                        <Route path={`${match.url}/start`} render={props =>
                            ( canStart === true && time !== '' && subjectID !== '' && countdown !== '' )
                                ?
                                <ExamStart
                                    {...props}
                                    listExamDetail={listExamDetail}
                                    listExamDetailCopy={listExamDetailCopy}
                                    getRecord={this.getRecord}
                                    goEnrol={this.goEnrol}
                                    submitRecord={this.submitRecord}
                                    examID={examID}
                                    minute={minute}
                                    second={second} />
                                : <div> Bạn không có quyền thi môn này. </div>
                        } />
                    </Switch>
                </div>
            </Container>
        )
    }
}

export default EnrolGo;