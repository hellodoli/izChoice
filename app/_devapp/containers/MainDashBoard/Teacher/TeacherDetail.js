import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { TeacherUpdate } from './EditTeacher';
import TeacherModel from '../../../model/Teacher';

class TeacherDetail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            teacher: new TeacherModel(),
            listTeacher: '',
        };
    }

    getTeacherByID = async ( teacherID ) => {
        const { teacher } = this.state;
        await teacher.getTeacherByID( teacherID );
        if(this._isMounted) {
            if(teacher.getListTeacherByID2.length > 0) {
                this.setState({ listTeacher: teacher.getListTeacherByID2 });
            }else{
                this.setState({ listTeacher: [] });
            }
        }
    }

    handleLastName = (e,index) => {
        const tempListTeacher = this.state.listTeacher.slice();
        tempListTeacher[index]["Ten"] = e.target.value;
        this.setState({ listTeacher: tempListTeacher });
    }

    handleFirstName = (e,index) => {
        const tempListTeacher = this.state.listTeacher.slice();
        tempListTeacher[index]["Ho"] = e.target.value;
        this.setState({ listTeacher: tempListTeacher });
    }

    handleD = (e,index) => {
        const tempListTeacher = this.state.listTeacher.slice();
        tempListTeacher[index]["Hocvi"] = e.target.value;
        this.setState({ listTeacher: tempListTeacher });
    }

    updateTeacherSQL = async ( firstName, lastName, d, teacherID ) => {
        const { teacher } = this.state;
        await teacher.updateTeacher( firstName, lastName, d, teacherID );
        if(this._isMounted){
            if(teacher.commandUpdate === true){
                alert('Sửa thông tin giáo viên thành công');
            }else{
                alert('Sửa thông tin giáo viên thất bại');
            }
        }
    }
    updateTeacher = (e,index) => {
        e.preventDefault();
        const confirm = window.confirm("Bạn có chắc muốn lưu thông tin giáo viên này");
        if(confirm){
            const { listTeacher } = this.state;
            const firstName = listTeacher[index]["Ho"];
            const lastName = listTeacher[index]["Ten"];
            const d = listTeacher[index]["Hocvi"];
            const teacherID = listTeacher[index]["MaGV"];
            this.updateTeacherSQL( firstName, lastName, d, teacherID );
        }
    }

    cancelGoback = () => {
    }

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        this.getTeacherByID( id );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { listTeacher } = this.state;
        const { match } = this.props;
        
        return(
            <Fragment>
                <div className="iz-header"><h3>Sửa thông tin giáo viên</h3></div>
                <div className="iz-body">
                    <div className="iz-form-action">
                        <Route path={`${match.url}/update`} render={() =>
                            <TeacherUpdate
                                listTeacher={listTeacher}
                                handleFirstName={this.handleFirstName}
                                handleLastName={this.handleLastName}
                                handleD={this.handleD}
                                updateTeacher={this.updateTeacher} />
                        }/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TeacherDetail;