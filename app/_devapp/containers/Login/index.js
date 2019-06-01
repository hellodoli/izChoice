import React from 'react';
import { Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  FormFeedback
} from 'reactstrap';

import { withRouter } from 'react-router-dom';

const LoginForm = (props) => {

  const { 
    labelLoginErrorText,
    isLoading,
    checkUserToLogin,
    
    handleLoginname,
    handlePassword 
  } = props;

  var klassLoginname = '';
  var klassPassword = '';

  if (labelLoginErrorText.loginname !== '') klassLoginname = 'is-invalid';
  if (labelLoginErrorText.password !== '') klassPassword = 'is-invalid';
    
  return(
    <Form onSubmit={ checkUserToLogin }>

      <FormGroup>
        <Label className="small text-dark">Username</Label>
        <Input
          type="text"
          placeholder="Username"
          maxLength="20"
          required={true}
          onChange={handleLoginname}
          className={klassLoginname}
        />
        { klassLoginname === 'is-invalid' &&
            <FormFeedback invalid="true">{ labelLoginErrorText.loginname }</FormFeedback>
        }
      </FormGroup>

      <FormGroup>
        <Label className="small text-dark">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          maxLength="20"
          required={true}
          onChange={handlePassword}
          className={klassPassword}
        />
        { klassPassword === 'is-invalid' &&
            <FormFeedback invalid="true">{ labelLoginErrorText.password }</FormFeedback>
        }
      </FormGroup>
              
      <FormGroup>
        <Button type="submit" color="primary" className="btn-login">
          <span>Login</span>
          { isLoading &&
              <div style={{ marginLeft: '8px' }}>
                <Spinner color="light" size={'sm'} />
              </div>
          }
        </Button>
      </FormGroup>
    
    </Form>
  );
}

const LoginWrapper = (props) => (
  <div className="iz-login-wrapper">
      <div className="iz-login-wall left" style={{ backgroundImage: "url('app/assets/img/bg.jpg')" }}>
        <div className="iz-login-logo">
          <div className="circle-logo circle-logo--center">
            <img src="app/assets/img/logo.png" alt="logo" />
          </div>
        </div>
      </div>  
      
      <div className="col-md-4 right-inner">
        <div className="right">
          <h4 className="mb-medium">LOGIN</h4>
          { props.children }
        </div>
      </div>
  </div>
);


class Login extends React.Component {
  render() {
    return(
      <LoginWrapper>
        <LoginForm {...this.props} />
      </LoginWrapper>
    );
  }
}

export default withRouter(Login);