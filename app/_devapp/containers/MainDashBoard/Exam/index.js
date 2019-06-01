import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import ExamModel from '../../../model/Exam';

import ExamTable from './ExamTable';
import ExamDeTail from './ExamDeTail';
import AddExam from './AddExam';
import IZPagination from '../../../components/Pagination';

import { UserContext } from '../../../user-context';

import { role, limitPage } from '../../../config';

import { renderIZPagination } from '../../../func-action';

const ExamMain = (props) => {
    const { 
        listExam, user, match, 
        hasPagination, arrPagination, clickPagination, pdefault
    } = props;
    const error = user.role === role.teacher ? 'Bạn chưa tạo đề trong môn học này.' : 'Không có đề nào được tạo trong môn học này';
    return(
        ( listExam.length > 0 )
            ? 
            <Fragment>
                <div className="iz-header"><h3>Danh sách đề đã tạo trong môn: { listExam[0]["TenMH"] }</h3></div>
                <div className="iz-body">
                    <div className="iz-data iz-exam-data">
                        { listExam === 'not found'
                            ? <div>Rất tiếc, Không tìm thấy đề</div>
                            :
                            <div>
                                <ExamTable
                                    match={match}
                                    listExam={listExam}
                                    pdefault={pdefault}
                                />
                                { hasPagination === true &&
                                    <IZPagination
                                        match={match}
                                        arrPagination={arrPagination}
                                        clickPagination={clickPagination}
                                        pdefault={pdefault}
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
            : ( listExam.length === 0 && listExam !== '' ) &&
                <div className="iz-header"><h3>{ error }</h3></div>
    );
}

class Exam extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            exam: new ExamModel(),
            listExam: '',

            listExamSplit: [],
            limit: limitPage, // number data row
            hasPagination: false,
            arrPagination: [],
            startClickPagination: false,
            pdefault: 0 // index của pagination
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        let user = this.context.userInfo;
        if( user.role === role.teacher ) {
            console.log(`Đây là toàn bộ mã đề của môn ${id} và gv: ${user.username}`);
            this.getExamCount( user.username, id );
        }else if(user.role === role.basis || user.role === role.school) {
            console.log(`Đây là toàn bộ mã đề của tất cả giáo viên trong môn ${id}`);
            this.getAllExamCount(id);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillUpdate( nextProps, nextState ) {
        if( nextState.startClickPagination === true &&
            nextState.listExamSplit.length > 0
        ) {
            const query = new URLSearchParams(nextProps.location.search);
            const p = query.get('p');
            if( p !== null ) {
                const num = parseInt(p);
                const tempListExamSplit = nextState.listExamSplit.slice();
                this.setState({
                    pdefault: (num - 1),
                    listExam: tempListExamSplit[num-1],
                    startClickPagination: false
                });
            }
        }
    }

    // render pagination
    renderPagination = (arrDataPag, arrPagination, p) => {
        this.setState({
            listExamSplit: arrDataPag, // dùng khi user chuyển pag
            listExam: arrDataPag[p-1],
            hasPagination: true,
            arrPagination: arrPagination,
            pdefault: (p - 1)
        });
    }
    
    invalidRenderPagination = (note) => {
        this.setState({ listExam: note }); // listExam: 'not found'
    }

    noRenderPagination = (data) => { 
        this.setState({ listExam: data });
    }

    clickPagination = () => { this.setState({ startClickPagination: true }) };

    getExamCount = async (userId,courseName) => {
        const { exam } = this.state;
        await exam.getExamCount( userId,courseName );
        if(this._isMounted) {
            if(exam.getListExamCount.length > 0) {
                // render Pagination
                renderIZPagination( exam.getListExamCount, this.state.limit, this.props.location.search, 
                    this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );
            } else {
                this.setState({ listExam: [] });
            }
        }
    }

    getAllExamCount = async (courseId) => {
        const { exam } = this.state;
        await exam.getAllExamCount( courseId );
        if(this._isMounted) {
            if(exam.getListAllExamCount.length > 0) {
                // render Pagination
                renderIZPagination( exam.getListAllExamCount, this.state.limit, this.props.location.search, 
                    this.renderPagination, this.invalidRenderPagination, this.noRenderPagination );
            } else {
                this.setState({ listExam: [] });
            }
        }
    }

    render() {
        const {
            listExam,
            hasPagination, arrPagination, pdefault,
        } = this.state;

        let user = this.context.userInfo;

        const { match } = this.props;

        return(
            <div className="iz-exam-wrapper">
                <Switch>
                    <Route exact path={match.url} render={props => 
                        <ExamMain 
                            {...props}
                            listExam={listExam}
                            user={user}
                            
                            arrPagination={arrPagination}
                            hasPagination={hasPagination}
                            clickPagination={this.clickPagination}
                            pdefault={pdefault} />
                    }/>
                    <Route path={`${match.url}/add`} render={() =>
                        ( user.role === role.teacher ) && <AddExam {...this.props} user={user} />
                    } />
                    <Route path={`${match.url}/:id`} component={ExamDeTail} />
                </Switch>
            </div>
        );
    }
}
Exam.contextType = UserContext;
export default Exam;