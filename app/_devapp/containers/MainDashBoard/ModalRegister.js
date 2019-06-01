import React from 'react';
import { 
    Button, 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Input, Label, Form, FormGroup, Col,
    Alert
    } from 'reactstrap';

const backdrop = "static";
const scrollable = "modal-dialog-scrollable";

const AlertCusTom = (props) => 
    <div className="iz-form-alert-wrapper">
        <Alert color={props.color}>{ props.children }</Alert>
    </div>

const ModalRegister= (props) => {
    const { modal, toggleModal, getInfo, resetInfo, checkRegister, listExamLevel, registerInfo, listClass,
        labelError: {
            labelClassError,
            labelTimeError,
            labelDateError,
            labelDuarationError,
            labelCountExamError,
            labelLevelError
        }
    } = props;

    const classMarkValid = ( labelClassError.length === 2 || labelClassError === 'blank') ? 'is-invalid' : ( labelClassError !== '' && labelClassError !== 'blank' && labelClassError.length < 2) ? 'is-valid' : '';
    const timeMarkValid = (labelTimeError === true || labelTimeError === 'blank') ? 'is-invalid' : (labelTimeError === false) ? 'is-valid' : '';
    const dateMarkValid = (labelDateError === true || labelDateError === 'blank' ) ? 'is-invalid' : (labelDateError === false) ? 'is-valid' : '';

    const durationMarkValid = (labelDuarationError === true || labelDuarationError === 'blank') ? 'is-invalid' : (labelDuarationError === false) ? 'is-valid' : '';
    const countExamMarkValid = (labelCountExamError === true || labelCountExamError === 'blank') ? 'is-invalid' : (labelCountExamError === false) ? 'is-valid' : '';
    const levelMarkValid = (labelLevelError === true || labelLevelError === 'blank') ? 'is-invalid' : (labelLevelError === false) ? 'is-valid' : '';
    return(
        <Modal id="modalRegister" 
            isOpen={modal}
            toggle={toggleModal}
            backdrop={backdrop}
            onOpened={getInfo}
            onClosed={resetInfo}
            className={scrollable}
        >
            <ModalHeader toggle={toggleModal}>{`Đăng ký môn thi: ${  registerInfo[1] } `}</ModalHeader>
                 
            <ModalBody>

                <Form id="modalRegisterForm" onSubmit={ e => {e.preventDefault()} }>

                    <FormGroup row>
                        <Col sm={6}>
                            <Label htmlFor="subjectID">Mã môn học</Label>
                            <Input id="subjectID" type="text" value={ registerInfo[0] } disabled={true} />
                        </Col>
                        <Col sm={6}>
                            <Label htmlFor="subjectName">Tên môn học</Label>
                            <Input id="subjectName" type="text" value={ registerInfo[1] } disabled={true} />
                        </Col>
                    </FormGroup>

                    {/* chon lop thi */}
                    <FormGroup>
                        <label htmlFor="classSelect">Chọn lớp</label>
                        <Input id="classSelect" defaultValue="-1" type="select" className={ classMarkValid }>
                            <option value="-1" disabled={true}>Chọn một lớp thi</option>
                            { listClass.length > 0 && listClass.map(item => <option key={item.MaLop} value={item.MaLop}>{ item.TenLop }</option>) }
                        </Input>
                        { labelClassError.length === 2  && <AlertCusTom color="danger">Lớp này đã đăng ký thi 2 lần trong cơ sở dữ liệu. Vui lòng chọn lớp khác.</AlertCusTom> }
                        { labelClassError === 'blank' && <AlertCusTom color="danger"> Bạn chưa chọn lớp </AlertCusTom> }
                    </FormGroup>
                    
                    <FormGroup>
                        <Label>Chọn lần thi</Label>
                        <Input id="countSelect" type="select" disabled={true} className= { classMarkValid }
                            value={ (labelClassError.length === 0 && labelClassError !== '') ? '1' : '2' }>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </Input>
                    </FormGroup>

                    {/* chon trinh do */}
                    <FormGroup>
                        <Label>Chọn trình độ</Label>
                        <Input id="levelExamSelect" type="select" defaultValue="-1" className={ levelMarkValid }>
                            <option value="-1" disabled={true}>Chọn trình cho độ bài thi</option>
                            { listExamLevel.length > 0 && listExamLevel.map(item => <option key={item.Trinhdo} value={item.Trinhdo}>{ item.Trinhdo }</option>) }
                        </Input>
                        { labelLevelError === 'blank' && <AlertCusTom color="danger"> Bạn chưa chọn trình độ </AlertCusTom> }
                    </FormGroup>

                    {/* datetime */}
                    <FormGroup row>
                        <Col sm={6}>
                            <Label htmlFor="dayExam">Chọn ngày thi</Label>
                            <Input type="date" id="dayExam" min="" max="2020-12-31" className={ dateMarkValid } />
                        </Col>
                        <Col sm={6}>
                            <Label htmlFor="timeExam">Chọn giờ thi</Label>
                            <Input type="time" id="timeExam" min="07:00" max="18:00" className={ timeMarkValid } />
                        </Col>
                        { labelDateError === true && <AlertCusTom color="danger"> Bạn chọn ngày thi không chính xác. Ngày thi không được nhỏ hơn ngày hiện tại. </AlertCusTom> }
                        { labelDateError === 'blank' && <AlertCusTom color="danger"> Bạn chưa chọn ngày thi </AlertCusTom> }
                        { labelTimeError === true && <AlertCusTom color="danger"> Bạn chọn giờ thi không chính xác. Giờ phải từ 7:00 đến 18:00 </AlertCusTom> }
                        { labelTimeError === 'blank' && <AlertCusTom color="danger"> Bạn chưa chọn giờ thi </AlertCusTom> }
                    </FormGroup>

                    {/* so cau thi, trong bao lau */}
                    <FormGroup row>
                        <Col sm={6}>
                            <Label htmlFor="countExamSelect">Số câu thi</Label>
                            <Input id="countExamSelect" type="number" min="10" max="100" defaultValue="30" className={ countExamMarkValid }/>
                        </Col>
                        <Col sm={6}>
                            <Label htmlFor="durationSelect">Trong thời gian (phút)</Label>
                            <Input id="durationSelect" type="number" min="15" max="60" defaultValue="45" className={ durationMarkValid } />
                        </Col>
                        { labelCountExamError === 'blank' && <AlertCusTom color="danger"> Bạn chưa chọn số câu thi </AlertCusTom> }
                        { labelDuarationError === 'blank' && <AlertCusTom color="danger"> Bạn chưa chọn thời gian thi bao lâu </AlertCusTom> }
                    </FormGroup>

                </Form>
            
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={checkRegister}>Đăng ký</Button>
                <Button color="secondary" onClick={toggleModal}>Hủy bỏ</Button>
            </ModalFooter>

        </Modal>
    )
};

export default ModalRegister;