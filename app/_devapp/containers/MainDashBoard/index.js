import React from 'react';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';

import Course from './Course';
import Register from './Register';
import Class from './Class';
import Teacher from './Teacher';
import Score from './Score';
import Account from './Account';

import { connect } from 'react-redux';
import { LoadingCenter } from '../../components/Loading';

class MainDashBoard extends React.Component {
    render() {
        const { match, isLoadingData } = this.props;
        
        return(
            <div className="iz-controller-right">

                {/* Loading */}

                { isLoadingData ? <LoadingCenter /> : null }
                    
                <Container>
                    <div className="iz-controller-right-wrapper">
                        <div className="iz-main-controller">
                            <Switch>
                                <Route path={`${match.url}/course`} render={props => <Course {...props} />} />
                                <Route path={`${match.url}/register`} render={props => <Register {...props} />} />
                                <Route path={`${match.url}/class`} render={props => <Class {...props} />} />
                                <Route path={`${match.url}/teacher`} render={props => <Teacher {...props} />} />
                                <Route path={`${match.url}/score`} render={props => <Score {...props} />} />
                                <Route path={`${match.url}/account`} render={props => <Account {...props} />} />
                            </Switch>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return{
        isLoadingData: store.isLoadingData
    }
}
export default connect(mapStateToProps)(MainDashBoard);