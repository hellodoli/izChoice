import React, { Component } from 'react';
import ExamModel from '../../../model/Exam';

import { ExamDetailAdd } from './EditExam';

import { randomID } from '../../../func-action';

class AddExam extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            exam: new ExamModel,
            examLevel: 'A',
            examCount: '1',
            examID: '',
            listDefault: [
                { A: '', B: '', C: '', D: '', content: '', answer: '' },
                { A: '', B: '', C: '', D: '', content: '', answer: '' },
            ],
            isExistExam: 1
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.randomExamID();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleChangeA = (e,index) => {
        const listDefaultCopy = this.state.listDefault.slice();
        listDefaultCopy[index]["A"] = e.target.value;
        this.setState({ listDefault: listDefaultCopy });
    }

    handleChangeB = (e,index) => {
        const listDefaultCopy = this.state.listDefault.slice();
        listDefaultCopy[index]["B"] = e.target.value;
        this.setState({ listDefault: listDefaultCopy });
    }

    handleChangeC = (e,index) => {
        const listDefaultCopy = this.state.listDefault.slice();
        listDefaultCopy[index]["C"] = e.target.value;
        this.setState({ listDefault: listDefaultCopy });
    }

    handleChangeD = (e,index) => {
        const listDefaultCopy = this.state.listDefault.slice();
        listDefaultCopy[index]["D"] = e.target.value;
        this.setState({ listDefault: listDefaultCopy });
    }

    handleChangeContent = (e,index) => {
        const listDefaultCopy = this.state.listDefault.slice();
        listDefaultCopy[index]["content"] = e.target.value;
        this.setState({ listDefault: listDefaultCopy });
    }

    handleChangeAns = (e,index) => {
        const listDefaultCopy = this.state.listDefault.slice();
        listDefaultCopy[index]["answer"] = e.target.value;
        this.setState({ listDefault: listDefaultCopy });
    }

    handleChangeExamLevel = (e) => {
        this.setState({ examLevel: e.target.value });
    }

    handleChangeCount = (e) => {
        this.setState({ examCount: e.target.value });
    }

    checkExistExam = async ( examID ) => {
        const { exam } = this.state;
        await exam.checkExistExam( examID );
        if( this._isMounted ) this.setState({ isExistExam:  exam.isExistExam });  
    }

    randomExamID = async () => {
        while( this.state.isExistExam === 1 ) {
            const examID = randomID(8);
            await this.checkExistExam(examID);
            if(this.state.isExistExam === 0) {
                this.setState({ examID });
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

    addExamView = (number) => {
        var comfirm = window.confirm(`Bạn có chắc muốn thêm ${number} câu hỏi nữa không ?`);
        if(comfirm){
            const listDefaultCopy = this.state.listDefault.slice();
            for (let i = 0; i < number; i++) {
                listDefaultCopy.push({ A: '', B: '', C: '', D: '', content: '', answer: '' });
            }
            this.setState({ listDefault: listDefaultCopy });
        }
    }

    submit = async (e) => {
        e.preventDefault();
        const confirm = window.confirm(`Bạn có chắc muốn thêm đề có mã ${this.state.examID} không ?`);
        if( confirm ) {
            const { listDefault, examLevel, examCount, examID } = this.state;
            const { user, match } = this.props;
            const courseID = match.params.id;
            const mapSQL = listDefault.map(item => `INSERT INTO BodeCT (MaBD,Noidung,A,B,C,D,Dapan) VALUES ('${examID}', '${item.content}', '${item.A}', '${item.B}', '${item.C}', '${item.D}', '${item.answer}')`);
            await this.insertExam( examID, courseID, user.username, examLevel, examCount );
            if( this.state.exam.commandInsertExam === true ) {
                alert('Đợi một chút nữa sắp xong rồi ... ^^!!!');
                await this.insertExamDetail( mapSQL );
                this.props.history.push(`${this.props.match.url}`);//temp
            }
        }
    }

    render() {
        const { match } = this.props;
        const { listDefault, examID } = this.state;
        
        return(
            <div className="iz-form-action iz-exam-detail-wrapper">
                <ExamDetailAdd
                    match={match}
                    listDefault={listDefault}
                    examID={examID}
                    handleChangeA={this.handleChangeA}
                    handleChangeB={this.handleChangeB}
                    handleChangeC={this.handleChangeC}
                    handleChangeD={this.handleChangeD}
                    handleChangeAns={this.handleChangeAns}
                    handleChangeContent={this.handleChangeContent}
                    handleChangeExamLevel={this.handleChangeExamLevel}
                    handleChangeCount={this.handleChangeCount}
                    addExamView={this.addExamView}
                    submit={this.submit} />
            </div>
        )
    }
}

export default AddExam;