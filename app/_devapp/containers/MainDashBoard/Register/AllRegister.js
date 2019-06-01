import React, { Component, Fragment } from 'react';

import RegisterModel from '../../../model/Register';

import { RegisterTable, EmptyRegister } from './RegisterTable';
import { LiveSearch } from '../Search';
import { connect } from 'react-redux';
class AllRegister extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            regis: new RegisterModel(),
            listAllRegister: '',
            copyListAllRegister: ''
        };
    }

    getAllRegister = async () => {
        const { regis } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await regis.getAllRegister();
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted) {
            if(regis.getListAllRegister.length > 0) {
                this.setState({ 
                    listAllRegister: regis.getListAllRegister,
                    copyListAllRegister: regis.getListAllRegister
                });
            }else{
                this.setState({ listAllRegister: [] }); 
            }
        }
    }

    // live search
    handleLiveSearch = (e) => {
        const { copyListAllRegister }  = this.state;
        var searchListAllRegister = copyListAllRegister.filter(item => {
            var searchValue = item["TenMH"].toLowerCase();
            return searchValue.indexOf(e.target.value.toLowerCase()) !== -1;
        });
        if(searchListAllRegister.length > 0) {
            this.setState({ listAllRegister: searchListAllRegister });
        }else{
            this.setState({ listAllRegister: 'not found' });
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getAllRegister();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { listAllRegister } = this.state;
        const { user, status, deleteRegister } = this.props;
        return(
            <Fragment>
            { (listAllRegister.length > 0)
                ?
                <div className="iz-register-wrapper">
                    <div className="iz-header"><h3>Danh sách của tất cả giáo viên đăng ký</h3></div>
                    <div className="iz-body">
                        <LiveSearch handleLiveSearch={this.handleLiveSearch} />
                        <div className="iz-data iz-register-data">
                            { (listAllRegister === "not found")
                                ? <div>Không tìm thấy dữ liệu ...</div>
                                : <RegisterTable user={user} listRegister={listAllRegister} deleteRegister={deleteRegister} />
                            }
                        </div>
                    </div>
                </div>        
                : (listAllRegister.length === 0 && listAllRegister !== '')
                    && <EmptyRegister status={status} />
            }
        </Fragment>
        )
    }
}

export default connect()(AllRegister);