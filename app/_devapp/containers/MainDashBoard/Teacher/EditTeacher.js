import React from 'react';
import { Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Spinner
  } from 'reactstrap';

export const TeacherUpdate = (props) => {

  const { 
    listTeacher,
    handleD, handleFirstName, handleLastName, updateTeacher
  } = props;

  return(
    <main className={'update'}>
      <div className="iz-teacher-form">
        
        <div className="form-list">
          { listTeacher.length > 0 && listTeacher.map((item,index) =>
              <Form
                key={index+1}
                onSubmit={ e => updateTeacher(e,index) }
                className="form-item is-edit"
              >
                <FormGroup row>
                  <Col sm={6}>
                    <Label>Mã giáo viên</Label>
                    <Input 
                      type="text"
                      defaultValue={item["MaGV"]}
                      disabled={true}
                    />
                  </Col>
                  <Col sm={6}>
                    <Label>Mã khoa</Label>
                    <Input 
                      type="text"
                      defaultValue={item["MaKhoa"]}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={6}>
                    <Label>Họ:</Label>
                    <Input 
                      type="text"
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      defaultValue={item["Ho"]}
                      onChange={ e => handleFirstName(e,index) }
                    />
                  </Col>
                  <Col sm={6}>
                    <Label>Tên:</Label>
                    <Input 
                      type="text"
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      defaultValue={item["Ten"]}
                      onChange={ e => handleLastName(e,index) }
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <label>Học vị:</label>
                  <Input type="select" defaultValue={item["Hocvi"]} onChange={ (e) => handleD(e,index) }>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Tiến sĩ">Tiến sĩ</option>
                    <option value="Phó giáo sư">Phó giáo sư</option>
                    <option value="Giáo sư">Giáo sư</option>
                  </Input>
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

export const TeacherAdd = (props) => {
  const { 
    listTeacher, listAllFal,
    handleD, handleFirstName, handleLastName, handleFalID,
    insertTeacher,
    isLoadingRandom
  } = props;
  return(
    <main className={'add'}>
      <div className="iz-teacher-form">
        
        <div className="form-list">
          { listTeacher.length > 0 && listTeacher.map((item,index) =>
              <Form
                key={index+1}
                onSubmit={ e => insertTeacher(e,index) }
                className="form-item is-edit"
              >
                {/* Mã giáo viên */}
                <FormGroup>
                  <Label>Mã giáo viên</Label>
                  <div className="input-group-inline custom">
                    <div className="input-item" style={{ width: '50px' }}>
                      <Input type="text" defaultValue={"GC"} disabled={true} />
                    </div>

                    <div className="input-item">
                      { isLoadingRandom
                        ? <div className="spinner-inside-wrapper"><Spinner size="sm" color="primary" /></div>
                        : null
                      }
                      <Input type="text" readOnly={true} defaultValue={item["MaGV"]} maxLength="6" />
                    </div>
                  </div>
                </FormGroup>

                {/* Mã khoa */}
                <FormGroup>
                  <Label>Mã khoa</Label>
                  <Input type="select" defaultValue="" required={true} onChange={ e => handleFalID(e,index) }>
                    <option value="" disabled={true}>Bạn hãy chọn 1 khoa</option>
                    { listAllFal.length > 0 && listAllFal.map(item => 
                        <option key={item["Makhoa"]} value={item["Makhoa"]}>{ item["Tenkhoa"] }</option>
                    )}
                  </Input>
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
                      placeholder="Bạn hãy nhập họ ..."
                      defaultValue={item["Ho"]}
                      onChange={ e => handleFirstName(e,index) }
                    />
                  </Col>
                  <Col sm={6}>
                    <Label>Tên:</Label>
                    <Input 
                      type="text"
                      required={true}
                      pattern=".*\S+.*"
                      title="Bạn không được nhập khoảng trống"
                      placeholder="Bạn hãy nhập tên ..."
                      defaultValue={item["Ten"]}
                      onChange={ e => handleLastName(e,index) }
                    />
                  </Col>
                </FormGroup>

                {/* Học vị */}
                <FormGroup>
                  <label>Học vị:</label>
                  <Input type="select" defaultValue="" required={true} onChange={ (e) => handleD(e,index) }>
                    <option value="" disabled={true}>Bạn hãy chọn một học vị</option>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Tiến sĩ">Tiến sĩ</option>
                    <option value="Phó giáo sư">Phó giáo sư</option>
                    <option value="Giáo sư">Giáo sư</option>
                  </Input>
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