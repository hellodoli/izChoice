import React, { Component, Fragment } from 'react';

import { TeacherAdd } from './EditTeacher';

import TeacherModel from '../../../model/Teacher';
import FalModel from '../../../model/Fal';

class AddTeacher extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            teacher: new TeacherModel(),
            fal: new FalModel(),
            listTeacher: [
                { MaGV: '', Makhoa: '', Ho: '', Ten: '', Hocvi: '' }
            ],
            isExist: 1,
            listAllFal: '',

            isLoadingRandom: false
        };
    }

    checkExistTeacher = async (teacherID) => {
        const { teacher } = this.state;
        await teacher.checkExistTeacher( teacherID );
        if(this._isMounted) this.setState({ isExist: teacher.isExistTeacher });
    }

    getAllFal = async () => {
        const { fal } = this.state;
        await fal.getAllFal();
        if(this._isMounted){
            if(fal.getListAllFal.length > 0){
                this.setState({ listAllFal: fal.getListAllFal });
            }else{
                this.setState({ listAllFal: [] });
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

    handleFalID = (e,index) => {
        const tempListTeacher = this.state.listTeacher.slice();
        tempListTeacher[index]["Makhoa"] = e.target.value;
        this.setState({ listTeacher: tempListTeacher });
    }

    insertTeacherSQL = async ( teacherID, firstName, lastName, d, falID ) => {
        const { teacher } = this.state;
        await teacher.insertTeacher( teacherID, firstName, lastName, d, falID );
        if(this._isMounted){
            if(teacher.commandInsert === true){
                alert('Thêm giáo viên thành công');
            }else{
                alert('Thêm giáo viên thất bại');
            }
        }
    }
    insertTeacher = (e,index) => {
        e.preventDefault();
        const confirm = window.confirm(`Bạn có chắc muốn thêm giáo viên này ?`);
        if(confirm){
            const { listTeacher } = this.state;
            const teacherID = 'GC' + listTeacher[index]["MaGV"];
            const firstName = listTeacher[index]["Ho"];
            const lastName = listTeacher[index]["Ten"];
            const d = listTeacher[index]["Hocvi"];
            const falID = listTeacher[index]["Makhoa"];
            this.insertTeacherSQL( teacherID, firstName, lastName, d, falID );    
        }
    }

    randomNumber6Digit = async () => {
        while( this.state.isExist === 1 ) {
            const number = Math.floor(100000 + Math.random() * 900000);
            const teacherID = 'GC' + number;
            this.setState({ isLoadingRandom: true });
            await this.checkExistTeacher( teacherID );
            if( this.state.isExist === 0 ) {
                this.setState({ isLoadingRandom: false });
                const tempList = this.state.listTeacher.slice();
                tempList[0]["MaGV"] = number;
                this.setState({ listTeacher: tempList });
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.randomNumber6Digit();
        this.getAllFal();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { listTeacher, listAllFal, isLoadingRandom } = this.state;
        return(
            <Fragment>
                <div className="iz-header"><h3>Thêm giáo viên</h3></div>
                <div className="iz-body">
                    <div className="iz-form-action">
                        <TeacherAdd 
                            listTeacher={listTeacher}
                            handleFirstName={this.handleFirstName}
                            handleLastName={this.handleLastName}
                            handleD={this.handleD}
                            handleFalID={this.handleFalID}
                            insertTeacher={this.insertTeacher}
                            listAllFal={listAllFal} 
                            isLoadingRandom={isLoadingRandom} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AddTeacher;