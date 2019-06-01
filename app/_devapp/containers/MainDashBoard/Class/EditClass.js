import React from 'react';
import { Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Spinner
  } from 'reactstrap';

export const ClassUpdate = (props) => {
  const { 
    listClass,
    handleClassName, updateClass
  } = props;

  return(
    <main className={'update'}>
      <div className="iz-class-form">
        <div className="form-list">
          { listClass.length > 0 && listClass.map((item,index) =>
              <Form
                key={index+1}
                onSubmit={ e => updateClass(e,index) }
                className="form-item is-edit"
              >

                <FormGroup row>
                    <Col sm={6}>
                      <Label>Mã lớp:</Label>
                      <Input type="text" defaultValue={item["MaLop"]} disabled={true} />
                    </Col>
                    <Col>
                      <Label>Mã khoa:</Label>
                      <Input type="text" defaultValue={item["MaKhoa"]} disabled={true} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Label>Tên lớp:</Label>
                    <Input type="text"
                        required={true}
                        pattern=".*\S+.*"
                        title="Bạn không được nhập khoảng trống"
                        defaultValue={ item["TenLop"] }
                        onChange={ e => handleClassName(e,index) }
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

export const ClassAdd = (props) => {

  const { 
    listClass, listAllFal,
    handleClassName, handleFalID, insertClass,
    isLoadingRandom
  } = props;

  return(
    <main className={'add'}>
      <div className="iz-class-form">
        
        <div className="form-list">
          { listClass.length > 0 && listClass.map(( item, index) =>
              <Form
                key={index+1}
                onSubmit={ e => insertClass(e,index) }
                className="form-item is-edit"
              >

                <FormGroup>
                  <Label>Mã lớp:</Label>
                  <div className="input-group-inline custom">
                    <div className="input-item" style={{ width: '40px' }}>
                      <Input type="text" defaultValue={"C"} disabled={true} />
                    </div>
                    
                    <div className="input-item">
                      { isLoadingRandom
                          ? <div className="spinner-inside-wrapper"><Spinner size="sm" color="primary" /></div>
                          : null
                      }
                      <Input type="text" defaultValue={item["MaLop"]} readOnly={true} maxLength="7" />
                    </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Mã khoa:</Label>
                  <Input type="select" required={true} defaultValue="" onChange={ e => handleFalID(e,index) }>
                    <option value="" disabled={true}>Bạn hãy chọn 1 khoa</option>
                    { listAllFal.length > 0 && listAllFal.map(item =>
                      <option key={item["Makhoa"]} value={item["Makhoa"]}>{ item["Tenkhoa"] }</option>
                    )}
                  </Input>
                </FormGroup>

                <FormGroup>
                    <Label>Tên lớp:</Label>
                    <Input type="text" 
                        required={true} 
                        pattern=".*\S+.*" 
                        title="Bạn không được nhập khoảng trống"
                        placeholder="Bạn hãy nhập tên ..."
                        defaultValue={item["TenLop"]}
                        onChange={ e => handleClassName(e,index) }
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