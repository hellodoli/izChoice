import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from '../../user-context';

import EnrolGo from './EnrolGo';

import ExamModel from '../../model/Exam';
import RegisterModel from '../../model/Register';
import ScoreModel from '../../model/Score';

import { 
    Button,
    Form,
    Input,
    InputGroup, 
    InputGroupAddon,
    Alert
  } from 'reactstrap';

function getUnique(arr,comp) {
    const unique = arr.map(e => e[comp])
        // store the keys of the unique objects
        .map((i, item, final) => final.indexOf(i) === item && item)
        // eliminate the dead keys & store unique objects
        .filter(item => arr[item]).map(item => arr[item]);
    return unique;
}

const MainEnrol = (props) => (
    <div className="iz-enrol-fixed-wrapper">
        <div className="iz-enrol-wrapper">
            <div className="iz-enrol-container">

                <Alert color="primary">
                    <h4 className="alert-heading mb-xsmall"> Well come user <strong>{props.user.username}</strong>!!!</h4>
                    <p>Click <a href="#" className="alert-link" onClick={ props.logout }>here</a> to Logout</p>
                    <hr />
                    <p>Bạn hãy nhập mã môn học cần thi ở ô bên dưới.</p>
                </Alert>

                <Form onSubmit={ e => e.preventDefault() }>
                    <InputGroup>
                        <Input id="searchStartCourse" type="search" placeholder="Nhập mã môn học cần thi ..." />
                        <InputGroupAddon addonType="append">
                            <Button type="button" color="secondary" onClick={props.checkAndPush}> Tìm kiếm </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
                { props.canStart === false &&
                    <Alert color="danger" style={{ marginTop: '20px' }}>
                        Mã môn thi không chính xác !!!
                    </Alert>
                }
            </div>
        </div>
    </div>
);

class Enrol extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exam: new ExamModel(),
            regis: new RegisterModel(),
            score: new ScoreModel(),
            list: '',
            listShow: '',
            countTime: '', // kt sinh vien da thi lan 1 lan 2 chua
            canStart: '',
        }
    }

    checkAndPush = async () => {
        const search = document.getElementById('searchStartCourse');
        if( search.value.trim() === '' ) {
            return;
        }else {
            let { userInfo: user } = this.context;
            await this.searchRegister( user.username, search.value );
            await this.checkExistTime( user.username, search.value );
            if( this.state.canStart === true ) this.props.history.push(`/enrol/${search.value}`);
        }
    }

    // lấy danh sách mã đề của môn thi đã được đăng ký cho học sinh
    searchRegister = async ( username, subjectId ) => {
        const { regis } = this.state;
        await regis.searchRegister( username, subjectId );
        if(this._isMounted){
            if( regis.getListsearchRegister.length > 0 ) {
                this.setState({
                    list: regis.getListsearchRegister,
                    listShow: getUnique(regis.getListsearchRegister,'Lan'),
                    canStart: true
                });
            }else {
                this.setState({
                    list: [],
                    listShow: [],
                    canStart: false
                });
            }
        }
    }

    // kiểm tra học sinh đã thi môn này lần 1, lần 2 chưa.
    checkExistTime = async ( username, subjectId ) => {
        const { score } = this.state;
        await score.checkExistTime( username, subjectId );
        if(this._isMounted) {
            if(score.getListCheckExistTime.length > 0){
                this.setState({ countTime: score.getListCheckExistTime });
            }else{
                this.setState({ countTime: [] });
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { match, logout } = this.props;
        const { listShow, canStart, countTime } = this.state;
        let { userInfo: user } = this.context;
        
        return(
            <div className="iz-main-controller">
                <Switch>
                    <Route exact path={match.url} render={() => 
                        <MainEnrol 
                            checkAndPush={this.checkAndPush} 
                            canStart={canStart} 
                            logout={logout} 
                            user={user} />
                    } />
                    <Route path={`${match.url}/:id`} render={props => 
                        <EnrolGo
                            {...props}
                            user={user}
                            listShow={listShow}
                            canStart={canStart}
                            countTime={countTime} />
                    } />
                </Switch>
            </div>
        );
    }
}
Enrol.contextType = UserContext;
export default Enrol;