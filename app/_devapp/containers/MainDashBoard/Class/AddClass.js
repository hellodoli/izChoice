import React, { Component } from 'react';

import { ClassAdd } from './EditClass';

import ClassModel from '../../../model/Class';
import FalModel from '../../../model/Fal';

class AddClass extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            classs: new ClassModel(),
            fal: new FalModel(),
            listClass: [ { MaLop: '', Makhoa: '', TenLop: '' } ],
            listAllFal: '',
            isExist: 1,

            isLoadingRandom: false
        };
    }

    checkExistClass = async ( classID ) => {
        const { classs } = this.state;
        await classs.checkExistClass( classID );
        if(this._isMounted) this.setState({ isExist: classs.isExistClass });
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

    handleClassName = (e,index) => {
        const tempListClass = this.state.listClass.slice();
        tempListClass[index]["TenLop"] = e.target.value;
        this.setState({ listClass: tempListClass });
    }

    handleFalID = (e,index) => {
        const tempListClass = this.state.listClass.slice();
        tempListClass[index]["Makhoa"] = e.target.value;
        this.setState({ listClass: tempListClass });
    }

    insertClassSQL = async ( classID, className, falID ) => {
        const { classs } = this.state;
        await classs.insertClass( classID, className, falID );
        if(this._isMounted){
            if(classs.commandInsert === true){
                alert('Thêm lớp thành công');
            }else{
                alert('Thêm lớp thất bại');
            }
        }
    }
    insertClass = (e,index) => {
        e.preventDefault();
        const confirm = window.confirm("Bạn có chắc muốn thêm lớp này ?");
        if(confirm){
            const { listClass } = this.state;
            const classID = 'C' + listClass[index]["MaLop"];
            const className = listClass[index]["TenLop"];
            const falID = listClass[index]["Makhoa"];
            this.insertClassSQL( classID, className, falID );
        }
    }

    randomNumber7Digit = async () => {
        while( this.state.isExist === 1 ) {
            const number = Math.floor(1000000 + Math.random() * 9000000);
            const classID = 'C' + number;
            this.setState({ isLoadingRandom: true });
            await this.checkExistClass( classID );
            if( this.state.isExist === 0 ) {
                this.setState({ isLoadingRandom: false });
                const tempList = this.state.listClass.slice();
                tempList[0]["MaLop"] = number;
                this.setState({ listClass: tempList });
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.randomNumber7Digit();
        this.getAllFal();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { listClass, listAllFal, isLoadingRandom } = this.state;
        return(
            <div className="iz-form-action">
                <ClassAdd listClass={listClass} listAllFal={listAllFal} 
                    handleClassName={this.handleClassName}
                    handleFalID={this.handleFalID}
                    insertClass={this.insertClass}
                    isLoadingRandom={isLoadingRandom}
                />
            </div>
        );
    }
}

export default AddClass;