import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ExamModel from '../../../model/Exam';

import { ExamDetailMultiple , ExamDetailReadOnly } from './EditExam';

import { UserContext } from '../../../user-context';
import { role } from '../../../config';

class ExamDeTail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            exam: new ExamModel(),
            listExamDetail: '',
            listExamDetailArray: '',
        }
    }

    getExamDetailByExamId = async (examId) => {
        const { exam } = this.state;
        await exam.getExamDetailByExamId( examId );
        if(this._isMounted) {
            if(exam.getExamDetailByExamId.length > 0) {
                this.setState({ 
                    listExamDetail: exam.getListExamDetailByExamId,
                    listExamDetailArray: Array(exam.getListExamDetailByExamId.length).fill(true),
                });
            } else {
                this.setState({ listExamDetail: [] });
            }
        }
    }

    getExamDeTailByExamIdAndUser = async (examId,username) => {
        const { exam } = this.state;
        await exam.getExamDeTailByExamIdAndUser( examId, username );
        if(this._isMounted) {
            if(exam.getListExamDetailByExamIdAndUser.length > 0) {
                this.setState({ 
                    listExamDetail: exam.getListExamDetailByExamIdAndUser,
                    listExamDetailArray: Array(exam.getListExamDetailByExamIdAndUser.length).fill(true),
                });
            } else {
                this.setState({ listExamDetail: [] });
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        let user = this.context.userInfo;
        const examId = this.props.match.params.id;
        if( user.role === role.teacher ) {
            this.getExamDeTailByExamIdAndUser( examId, user.username );
        }else if(user.role === role.basis || user.role === role.school){
            this.getExamDetailByExamId(examId);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleUpdate = (index) => {
        const listExamDetailArray = this.state.listExamDetailArray.slice();
        listExamDetailArray[index] = (listExamDetailArray[index]) ? false : true;
        this.setState({ listExamDetailArray });
    }

    // dont use now.
    handleOnchangeContent = (e,i) => {
        let arr = this.state.listExamDetail.slice();
        arr[i].Noidung = e.target.value;
        this.setState({ listExamDetail: arr });
    }

    // Update SQL exam detail.
    updateExamDetail = async ( content, a, b, c, d, examId, examDetailID, index ) => {
        const { exam } = this.state;
        await exam.updateExamDetail( content, a, b, c, d, examId, examDetailID );
        if(this._isMounted){
            if(exam.command === true) {
                //Update success.
                //Update finish and disabled form.
                const listExamDetailArray = this.state.listExamDetailArray.slice();
                listExamDetailArray[index] = true;
                this.setState({ listExamDetailArray });
                alert('Update câu hỏi thanh cong');
            }else {
                console.log(exam.command.toString());
                alert('Update câu hỏi that bai');
            }
        }
    }
    updateExamDetailForm = ( e, index, examId, examDetailId ) => {
        e.preventDefault();
        const confirm = window.confirm('Bạn có chắc muốn sửa câu hỏi này không ?');
        if(confirm) {
            var examItem = document.getElementsByClassName('iz-exam-detail-item');
            var content = examItem[index].querySelector("textarea[name='edcontent']").value;
            var a = examItem[index].querySelector("input[name='eda']").value;
            var b = examItem[index].querySelector("input[name='edb']").value;
            var c = examItem[index].querySelector("input[name='edc']").value;
            var d = examItem[index].querySelector("input[name='edd']").value;
            this.updateExamDetail(content, a, b, c, d, examId, examDetailId, index );    
        }
    }
    

    // delete SQL exam detail. (dont use now)
    deleteExamDetail = async ( examId, examDetailId ) => {
        const { exam } = this.state;
        await exam.deleteExamDetail( examId, examDetailId );
        if(this._isMounted) {
            if(exam.commandDelete === true) {
                //Delete success.
                alert('Xóa thành công');
            }else {
                alert('Xóa that bai');
            }
        }
    }
    deleteExamDetailForm = ( examId, examDetailId ) => {
        this.deleteExamDetail( examId, examDetailId );
    }

    render() {
        const { match } = this.props;
        const { listExamDetail, listExamDetailArray } = this.state;
        let user = this.context.userInfo;
        return(
            <div className="iz-form-action iz-exam-detail-wrapper">
                { listExamDetail.length > 0 &&
                    <Switch>
                        {/* truyen vao this.props chu khong phai props */}
                        <Route exact path={match.url} render={() =>
                            <ExamDetailReadOnly {...this.props} listExamDetail={listExamDetail} user={user} /> }
                        />
                        <Route path={`${match.url}/update`} render={() =>
                            ( user.role === role.teacher || user.role === role.basis ) &&
                                <ExamDetailMultiple
                                    {...this.props}
                                    listExamDetail={listExamDetail}
                                    listExamDetailArray={listExamDetailArray}
                                    toggleUpdate={this.toggleUpdate}
                                    updateExamDetailForm={this.updateExamDetailForm}
                                    deleteExamDetailForm={this.deleteExamDetailForm}
                                />
                        } />
                    </Switch>
                }
            </div>
        );
    }
}
ExamDeTail.contextType = UserContext;
export default ExamDeTail;