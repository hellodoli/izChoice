import React, { Component } from 'react';

import { ClassUpdate } from './EditClass';
import ClassModel from '../../../model/Class';

class UpdateClass extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            classs: new ClassModel(),
            listClass: '',
        };
    }

    getClassByID = async ( classID ) => {
        const { classs } = this.state;
        await classs.getClassByID( classID );
        if(this._isMounted) {
            if(classs.getListClassByID2.length > 0) {
                this.setState({ listClass: classs.getListClassByID2 });
            }else{
                this.setState({ listClass: [] });
            }
        }
    }

    handleClassName = (e,index) => {
        const tempListClass = this.state.listClass.slice();
        tempListClass[index]["TenLop"] = e.target.value;
        this.setState({ listClass: tempListClass });
    }

    updateClassSQL = async ( className, ClassID ) => {
        const { classs } = this.state;
        await classs.updateClass( className, ClassID );
        if(this._isMounted){
            if(classs.commandUpdate === true){
                await alert('Sửa thông tin lớp thành công');
            }else{
                alert('Sửa thông tin lớp thất bại');
            }
        }
    }
    updateClass = (e,index) => {
        e.preventDefault();
        const confirm = window.confirm("Bạn có chắc muốn lưu thông tin lớp này ?");
        if(confirm){
            const { listClass } = this.state;
            const className = listClass[index]["TenLop"];
            const classID = listClass[index]["MaLop"];
            this.updateClassSQL( className, classID );
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        this.getClassByID( id );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { listClass } = this.state;
        return(
            <div className="iz-class-wrapper">
                <div className="iz-form-action">
                    <ClassUpdate
                        listClass={listClass}
                        handleClassName={this.handleClassName}
                        updateClass={this.updateClass}
                    />
                </div>
            </div>
        );
    }
}

export default UpdateClass;