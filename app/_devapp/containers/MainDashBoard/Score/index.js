import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { UserContext } from '../../../user-context';

import { role } from '../../../config';

import ScoreModel from '../../../model/Score';

import { ScoreTable } from './ScoreTable';
import { SearchScore } from '../Search';
import { connect } from 'react-redux';
const MainSearchScore = (props) => {
    const { 
        list, handleInput,
        handleSubjectID, handleClassID, handleCount,
        search,
        listMain
    } = props;
    return(
        <Fragment>
            <div className="iz-header"><h3>Tra cứu bảng điểm</h3></div>
            <div className="iz-body">
                <SearchScore
                    list={list}
                    handleInput={handleInput}

                    handleSubjectID={handleSubjectID}
                    handleClassID={handleClassID}
                    handleCount={handleCount}
                    search={search} 
                />
                <div className="iz-data iz-score-data">
                    { listMain.length > 0
                        ? <ScoreTable list={listMain} />
                        : ( listMain.length === 0 && listMain !== '') &&
                            <div>Không tìm thấy dữ liệu</div>
                    }
                </div>
            </div>
        </Fragment>
        
    );
}

class Score extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            score: new ScoreModel(),
            listSubject: '',
            listClass: '',
            listCount: '',
            listMain: '',
            subjectIDSelect: '',
            classIDSelect: '',
            countSelect: '',

            inputSearch: '',
            searchBy: 'Tìm kiếm theo',
            menuSearchBy: ['Mã giáo viên','Mã khoa','Tên', 'Học vị'],
            startSearch: false
        };
    }

    getSubjectScore = async () => {
        const { score } = this.state;
        await score.getSubjectScore();
        if(this._isMounted) {
            if( score.getListSubjectScore.length > 0 ){
                this.setState({ listSubject: score.getListSubjectScore });
            }else{
                this.setState({ listSubject: [] });
            }    
        }
        
    }
    getClassScore = async ( subjectID ) => {
        const { score } = this.state;
        await score.getClassScore( subjectID );
        if(this._isMounted) {
            if( score.getListClassScore.length > 0 ) {
                this.setState({ listClass: score.getListClassScore });
            }else{
                this.setState({ listClass: [] });
            }    
        }
    }
    getCountScore = async ( subjectID, classID ) => {
        const { score } = this.state;
        await score.getCountScore( subjectID, classID );
        if( this._isMounted ) {
            if( score.getListCountScore.length > 0 ) {
                this.setState({ listCount: score.getListCountScore });
            }else{
                this.setState({ listCount: [] });
            }    
        }
    }

    // lấy danh sách bảng điểm theo mã môn, mã lớp, lần thi ( dùng cho search )
    getScoreByBy = async ( subjectID, classID, count ) => {
        const { score } = this.state;
        await score.getScoreByBy( subjectID, classID, count );
        if( this._isMounted ) {
            if( score.getListScoreBy.length > 0 ) {
                this.setState({ listMain: score.getListScoreBy });
            }else{
                this.setState({ listMain: [] });
            }
        }
    }

    handleSubjectID = async (e) => {
        await this.setState({ subjectIDSelect: e.target.value });
        if( this.state.listCount === '' ) {
            // đổi class thôi
            this.getClassScore( this.state.subjectIDSelect );
        }else {
            // đổi class và đổi lần thi
            await this.getClassScore( this.state.subjectIDSelect );
            await this.getCountScore( this.state.subjectIDSelect, this.state.classIDSelect );
        }
    }
    handleClassID = async (e) => {
        await this.setState({ classIDSelect: e.target.value });
        this.getCountScore( this.state.subjectIDSelect, this.state.classIDSelect );
    }
    handleCount = async (e) => {
        this.setState({ countSelect: e.target.value });
    }

    search = (e) => {
        e.preventDefault();
        //const { subjectIDSelect, classIDSelect, countSelect } = this.state;
        this.getScoreByBy( this.state.subjectIDSelect, this.state.classIDSelect, this.state.countSelect );
    }

    componentDidMount() {
        this._isMounted = true;
        let user = this.context.userInfo;
        if( user && ( user.role === role.basis || user.role === role.school ) ) this.getSubjectScore();
    }

    componentWillMount(){
        this.props.dispatch({ 
            type: 'ACTIVE_SIDEBAR',
            data: 'Score'
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let user = this.context.userInfo;
        const { match } = this.props;

        const { listSubject, listClass, listCount, listMain,
            subjectIDSelect, classIDSelect, countSelect
        } = this.state;

        const list = { listSubject, listClass, listCount  };
        const handleInput = { subjectIDSelect, classIDSelect, countSelect };

        return(
            <div className="iz-score-wrapper">
                {/* Search Score */}
                <Route path={`${match.url}/search`} render={() =>
                    (user.role === role.basis || user.role === role.school) &&
                        <MainSearchScore 
                            list={list}
                            handleInput={handleInput}
                            listMain={listMain}

                            handleSubjectID={this.handleSubjectID}
                            handleClassID={this.handleClassID}
                            handleCount={this.handleCount}
                            search={this.search}
                        />
                }/>
            </div>
        );
    }
}
Score.contextType = UserContext;
export default connect()(Score);