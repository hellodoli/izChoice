import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Alert } from 'reactstrap';

// check username và loginname.
function checkNameError( labelError, type, isError= '', feedBackState= false, feedBackText= '' ){
    if( labelError === 1 ){
        isError = 'is-invalid';
        feedBackState = false;
        feedBackText = `${type} phải từ 8 đến 12 ký tự`;
    }else if( labelError === 2 ){
        isError = 'is-invalid';
        feedBackState = false;
        feedBackText = `${type} không được chứa số ở đầu`;
    }else if( labelError === 3 ){
        isError = 'is-invalid';
        feedBackState = false;
        feedBackText = `${type} không được có ký tự đặc biệt`;
    }else if( labelError === 4 ){
        isError = 'is-invalid';
        feedBackState = false;
        feedBackText = `${type} không hợp lệ`;
    }else if( labelError === 5 ){
        isError = 'is-invalid';
        feedBackState = false;
        feedBackText = `${type} đã được đăng ký rồi`;
    }else if( labelError === false ){
        isError = 'is-valid';
        feedBackState = true;
        feedBackText = 'Bạn có thể dùng tên để đăng ký';
    }
    return { isError, feedBackState, feedBackText };
}

export const AccountAdd = (props) => {
    const { 
        listAccount, listRole,
        handleLoginName, handleUserName, handlePass1, handlePass2, handleSelectRole, createAccount,
        labelError: { labelELoginName, labelEUserName, labelEPass1, labelEPass2 },
        typeAccount
    } = props;

    //loginname
    const { 
        isError: isErrorL, // dùng cho className của input
        feedBackState: feedBackStateL, // dùng cho feedback dưới input
        feedBackText: feedBackTextL // dùng cho feedback text dưới input
    } = checkNameError( labelELoginName, 'Loginname' );

    //username
    const { 
        isError: isErrorU, // dùng cho className của input
        feedBackState: feedBackStateU, // dùng cho feedback dưới input
        feedBackText: feedBackTextU // dùng cho feedback text dưới input
    } = checkNameError( labelEUserName, 'Username' );

    // password
    let isErrorP1 = '';
    let feedBackStateP1 = false;
    let feedBackTextP1 = '';
    if( labelEPass1 === 1 ){
        isErrorP1 = 'is-invalid';
        feedBackStateP1 = false;
        feedBackTextP1 = `Password không được có ký tự đặc biệt`;
    }else if( labelEPass1 === 2 ){
        isErrorP1 = 'is-invalid';
        feedBackStateP1 = false;
        feedBackTextP1 = `Password phải từ 12 đến 20 ký tự`;
    }else if( labelEPass1 === false ){
        isErrorP1 = 'is-valid';
        feedBackStateP1 = true;
        feedBackTextP1 = `Password hợp lệ`;
    }

    // re password
    let isErrorP2 = '';
    let feedBackStateP2 = false;
    let feedBackTextP2 = '';
    if( labelEPass2 === true ){
        isErrorP2 = 'is-invalid';
        feedBackStateP2 = false;
        feedBackTextP2 = 'Password nhập lại không chính xác';
    }else if( labelEPass2 === false ){
        isErrorP2 = 'is-valid';
        feedBackStateP2 = true;
        feedBackTextP2 = 'Password nhập lại chính xác';
    }

    return(
        <main className={'add'}>
            <div className="iz-account-form">
            
            <div className="form-list">
                { listAccount.length > 0 && listAccount.map(( item, index ) =>
                    <Form
                        key={index+1}
                        onSubmit={ (e) => createAccount(e,index) }
                        className="form-item is-edit" >

                        {/* Chọn role */}
                        <FormGroup row>
                            <Col sm={2}>
                                <Label>Loại tài khoản <span className="text-danger">*</span></Label>
                            </Col>
                            <Col sm={10}>
                                <Input type="select" defaultValue="" required={true} onChange={ (e) => handleSelectRole(e,index) }>
                                    <option value="" disabled={true}>Hãy chọn loại tài khoản muốn tạo</option>
                                    { listRole.map(item =>
                                        <option key={item.role} value={item.role}>{ item.text } </option>
                                    )}
                                </Input>
                            </Col>
                        </FormGroup>
                        
                        {/* Chọn username */}
                        { ( typeAccount === 'g' || typeAccount === 's' ) &&
                            <FormGroup row>
                                <Col sm={2}>
                                    <Label>User Name: <span className="text-danger">*</span></Label>
                                </Col>
                                <Col sm={10}>
                                    <Input 
                                        type="text"
                                        placeholder="Username phải từ 8 đến 12 ký tự ..."
                                        required={true}
                                        maxLength={12}
                                        className={isErrorU}
                                        defaultValue={ item["username"] }
                                        onChange={ (e) => handleUserName(e,index,typeAccount) }
                                    />
                                    <FormFeedback valid={feedBackStateU}>{ feedBackTextU }</FormFeedback>
                                </Col>
                            </FormGroup>
                        }

                        {/* Chọn loginname */}
                        { typeAccount.length > 0 &&
                            <FormGroup row>
                                <Col sm={2}>
                                    <Label>Login Name: <span className="text-danger">*</span></Label>
                                </Col>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        placeholder="Loginname phải từ 8 đến 12 ký tự ..."
                                        required={true}
                                        maxLength={12}
                                        className={isErrorL}
                                        defaultValue={ item["loginname"] }
                                        onChange={ (e) => handleLoginName(e,index,typeAccount) }
                                    />
                                    <FormFeedback valid={feedBackStateL}>{ feedBackTextL }</FormFeedback>
                                </Col>
                            </FormGroup> 
                        }
                        
                        
                        {/* Chọn password */}
                        { typeAccount.length > 0 &&
                            <FormGroup row>
                                <Col sm={2}>
                                    <Label>Password: <span className="text-danger">*</span></Label>
                                </Col>
                                <Col sm={10}>
                                    <Input
                                        type="password"
                                        placeholder="Password từ 12 đến 20 ký tự ..."
                                        required={true}
                                        maxLength={20}
                                        defaultValue={ item["password1"] }
                                        onChange={ (e) => handlePass1(e,index) }
                                        className={ isErrorP1 }
                                    />
                                    <FormFeedback valid={feedBackStateP1}>{ feedBackTextP1 }</FormFeedback>
                                </Col>
                            </FormGroup>
                        }
                        
                        {/* Nhập lại password */}
                        { labelEPass1 === false &&
                            <FormGroup row>
                                <Col sm={2}>
                                    <Label>Nhập lại Password: <span className="text-danger">*</span></Label>
                                </Col>
                                <Col sm={10}>
                                    <Input
                                        type="password"
                                        placeholder="Bạn hãy nhập lại Password ..."
                                        required={true}
                                        maxLength={20}
                                        defaultValue={ item["password2"] }
                                        onChange={ (e) => handlePass2(e,index) }
                                        className={ isErrorP2 }
                                    />
                                    <FormFeedback valid={feedBackStateP2}>{ feedBackTextP2 }</FormFeedback>
                                </Col>
                            </FormGroup>    
                        }
                        
                        <div role="group">
                            <Button type="submit" color="primary">Tạo tài khoản</Button>{' '}
                            <Button type="button" outline color="primary">Hủy</Button>
                        </div>
    
                    </Form>
                )}
            </div>
            </div>
        </main>
    );
}

export const AccountAddNote = () => (
    <Alert color="info">
        <h4 className="alert-heading">Lưu ý !</h4>
        <hr />
        <p className="mb-xsmall"> Chọn tài khoản bạn muốn tạo trong form bên dưới.</p>
        <p className="mb-xsmall"> Đối với tài khoản <strong>SINH VIÊN</strong> hoặc <strong>GIẢNG VIÊN</strong> Username phải trùng với ID của người dùng. </p>
        <p> Đối với tài khoản <strong>CƠ SỞ</strong> hoặc <strong>TRƯỜNG</strong> chỉ cần nhập Loginname là đủ</p>
    </Alert>
);


