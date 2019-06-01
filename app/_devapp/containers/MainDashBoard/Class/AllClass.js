import React, { Component, Fragment } from 'react';

import ClassModel from '../../../model/Class';

import { ClassTable, EmptyClass } from './ClassTable';

import { LiveSearch } from '../Search';
import IZPagination from '../../../components/Pagination';

import { renderIZPagination } from '../../../func-action';

import { limitPage } from '../../../config';

import { connect } from 'react-redux';

class AllClass extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            classs: new ClassModel(),
            listAllClass: '',
            copyListAllClass: '',
            
            listAllClassSplit: [],
            limit: limitPage, // number data row
            hasPagination: false,
            arrPagination: [],
            startClickPagination: false,
            pdefault: 0 // index của pagination
        };
    }

    // render pagination
    renderPagination = (arrDataPag, arrPagination, p) => {
        this.setState({
            listAllClassSplit: arrDataPag, // dùng khi user chuyển pag
            listAllClass: arrDataPag[p-1],
            copyListAllClass: arrDataPag[p-1],
            hasPagination: true,
            arrPagination: arrPagination,
            pdefault: (p - 1)
        });
    }

    invalidRenderPagination = (note) => { this.setState({ listAllClass: note }) }

    noRenderPagination = (data) => {
        this.setState({
            listAllClass: data,
            copyListAllClass: data
        });
    }

    clickPagination = () => { this.setState({ startClickPagination: true }) };

    getAllClass = async () => {
        const { classs } = this.state;
        this.props.dispatch({ type: 'ON_LOADING' });
        await classs.getAllClass();
        this.props.dispatch({ type: 'OFF_LOADING' });
        if(this._isMounted) {
            if(classs.getListAllClass.length > 0) {
                // render Pagination
                renderIZPagination( classs.getListAllClass, this.state.limit, this.props.location.search, 
                    this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );

            }else{
                this.setState({ listAllClass: [] }); 
            }
        }
    }

    // live search
    handleLiveSearch = (e) => {
        const { copyListAllClass }  = this.state;
        var searchlistAllClass = copyListAllClass.filter(item => {
            var searchValue = item["TenLop"].toLowerCase();
            return searchValue.indexOf(e.target.value.toLowerCase()) !== -1;
        });
        if(searchlistAllClass.length > 0) {
            this.setState({ listAllClass: searchlistAllClass });
        }else{
            this.setState({ listAllClass: 'not found' });
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getAllClass();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillUpdate( nextProps, nextState ) {
        if( nextState.startClickPagination === true &&
            nextState.listAllClassSplit.length > 0
        ) {
            const query = new URLSearchParams(nextProps.location.search);
            const p = query.get('p');
            if( p !== null ) {
                const num = parseInt(p);
                const tempListAllClassSplit = nextState.listAllClassSplit.slice();
                this.setState({
                    pdefault: (num - 1),
                    listAllClass: tempListAllClassSplit[num-1],
                    copyListAllClass: tempListAllClassSplit[num-1],
                    startClickPagination: false
                });
            }
        }
    }

    render() {
        const { 
            listAllClass,
            hasPagination, arrPagination, pdefault
        } = this.state;
        const { user, status, match } = this.props;
        const matchCustom = {
            url: `${match.url}/all`
        }
        return(
            <Fragment>
                { (listAllClass.length > 0)
                    ?
                    <div className="iz-class-wrapper">
                        <div className="iz-header"><h3>Danh sách tất cả các lớp</h3></div>
                        <div className="iz-body">
                            <LiveSearch handleLiveSearch={this.handleLiveSearch} />
                            <div className="iz-data iz-class-data">
                                { ( listAllClass === "not found" )
                                    ? <div>Không tìm thấy dữ liệu ...</div>
                                    : 
                                    <div>
                                        <ClassTable 
                                            match={match}
                                            user={user}
                                            listClass={listAllClass}
                                            pdefault={pdefault} />
                                        { hasPagination === true &&
                                            <IZPagination
                                                match={matchCustom}
                                                arrPagination={arrPagination}
                                                clickPagination={this.clickPagination}
                                                pdefault={pdefault} />
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>        
                    : (listAllClass.length === 0 && listAllClass !== '')
                        && <EmptyClass status={status} />
                }
            </Fragment>
        )
    }
}

export default connect()(AllClass);