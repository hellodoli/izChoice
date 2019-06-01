import React from 'react';
import { Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col
  } from 'reactstrap';

export const StudentUpdate = (props) => {
  const { 
    listStudent,
    handleFirstName, handleLastName, handleBirth, handleAddress, updateStudent
  } = props;

  return(
    <main className={'update'}>
      <div className="iz-student-form">
        <div className="form-list">
          { listStudent.length > 0 && listStudent.map((item,index) =>
              <Form
                key={index+1}
                onSubmit={ (e) => updateStudent(e,index) }
                className="form-item is-edit"
              >
                {/* Mã sinh viên */}
                <FormGroup>
                  <Label>Mã sinh viên:</Label>
                  <Input
                    type="text"
                    placeholder="Mã sinh viên gồm 8 kí tự và là số ..."
                    defaultValue={ item["MaSV"] }
                    disabled={true}
                  />
                </FormGroup>

                {/* Họ tên */}
                <FormGroup row>
                  <Col sm={6}>
                    <Label>Họ:</Label>
                    <Input 
                      type="text" 
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      placeholder="Bạn hãy nhập họ của sinh viên..."
                      defaultValue={ item["Ho"] }
                      onChange={ (e) => handleFirstName(e,index) }
                    />
                  </Col>
                  <Col sm={6}>
                    <Label>Tên:</Label>
                    <Input 
                      type="text" 
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      placeholder="Bạn hãy nhập tên của sinh viên..."
                      defaultValue={ item["Ten"] }
                      onChange={ (e) => handleLastName(e,index) }
                    />
                  </Col>
                </FormGroup>

                {/* Ngày sinh */}
                <FormGroup>
                  <Label>Ngày sinh:</Label>
                  <Input 
                    type="date"
                    required={true}
                    defaultValue={ item["Ngaysinh"] }
                    onChange={ (e) => handleBirth(e,index) }
                  />
                </FormGroup>

                {/* Address */}
                <FormGroup>
                  <Label>Địa chỉ:</Label>
                  <Input
                    type="text"
                    required={true}
                    pattern=".*\S+.*"
                    title="Bạn không được nhập khoảng trống"
                    placeholder="Nhập địa chỉ ..."
                    defaultValue={ item["Diachi"] }
                    onChange={ (e) => handleAddress(e,index) }
                  />
                </FormGroup>

                <div role="group">
                  <Button type="submit" color="primary">Lưu</Button>{' '}
                  <Button type="button" outline color="primary">Hủy</Button>
                </div>

              </Form>
          )}
        </div>
      </div>
    </main>
  );
}

export const StudentAdd = (props) => {

  const { 
    listStudent,
    handleStudentID, handleStudentFirstName, handleStudentLastName, handleStudentBirth, handleStudentAddress,
    checkStudent, insertStudent
  } = props;

  return(
    <main className={'add'}>
      <div className="iz-student-form">
        
        <div className="form-list">
          { listStudent.length > 0 && listStudent.map(( item, index ) =>
              <Form
                key={index+1}
                onSubmit={ (e) => insertStudent( e, index ) }
                className="form-item is-edit"
              >
                {/* Mã sinh viên */}
                <FormGroup row>
                  <Col sm={8}>
                    <Label>Mã sinh viên:</Label>
                    <Input
                      type="text"
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      maxLength={8}
                      placeholder="Mã sinh viên gồm 8 kí tự và là số ..."
                      defaultValue={ item["MaSV"] }
                      onChange={ e => handleStudentID(e, index) }
                    />
                  </Col>
                  <Col sm={4}>
                    <Label className="invisible">Invisible label</Label>
                    <Button color="success" className="btn-block" onClick={ () => checkStudent( index ) }>Kiểm tra mã SV</Button>
                  </Col>
                </FormGroup>

                {/* Họ tên */}
                <FormGroup row>
                  <Col sm={6}>
                    <Label>Họ:</Label>
                    <Input 
                      type="text" 
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      placeholder="Bạn hãy nhập họ của sinh viên..."
                      defaultValue={ item["Ho"] }
                      onChange={ (e) => handleStudentFirstName(e,index) }
                    />
                  </Col>
                  <Col sm={6}>
                    <Label>Tên:</Label>
                    <Input 
                      type="text" 
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      placeholder="Bạn hãy nhập tên của sinh viên..."
                      defaultValue={ item["Ten"] }
                      onChange={ (e) => handleStudentLastName(e,index) }
                    />
                  </Col>
                </FormGroup>

                {/* Ngày sinh */}
                <FormGroup>
                  <Label>Ngày sinh:</Label>
                  <Input 
                    type="date"
                    required={true}
                    onChange={ (e) => handleStudentBirth(e,index) }
                  />
                </FormGroup>

                {/* Address */}
                <FormGroup>
                  <Label>Địa chỉ:</Label>
                  <Input
                    type="text"
                    required={true}
                    pattern=".*\S+.*"
                    title="Bạn không được nhập khoảng trống"
                    placeholder="Nhập địa chỉ ..."
                    defaultValue={ item["Diachi"] }
                    onChange={ (e) => handleStudentAddress(e,index) }
                  />
                </FormGroup>

                <div role="group">
                  <Button type="submit" color="primary">Lưu</Button>{' '}
                  <Button type="button" outline color="primary">Hủy</Button>
                </div>

              </Form>
          )}
        </div>
      </div>
    </main>
  );
}