import React from 'react';
import { 
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Alert,
    CustomInput,
  } from 'reactstrap';
import { Link } from 'react-router-dom';

import { role as r } from '../../../config';

const ExamDetail = (props) => {
    const { listExamDetail, listExamDetailArray, toggleUpdate, 
        updateExamDetailForm, deleteExamDetailForm } = props;
    return(
        <div className="form-list iz-exam-detail-list">
            { listExamDetail.map((item,index) => {
                    return(
                        <Form
                            key={item.Cauhoi}
                            onSubmit={(e) => updateExamDetailForm( e, index, item.MaBD, item.Cauhoi )}
                            className={ `form-item iz-exam-detail-item ${!listExamDetailArray[index] ? 'is-edit' : ''}` } 
                        >
            
                            <FormGroup row>
                                <Col sm={2}><Label>Câu hỏi:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={(index + 1)} name="edquestion" disabled={true} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>Nội dung:</Label></Col>
                                <Col sm={10}>
                                    <Input 
                                        type="textarea" 
                                        pattern=".*\S+.*"
                                        name="edcontent"
                                        defaultValue={item.Noidung}
                                        disabled={listExamDetailArray[index]}
                                        required={!listExamDetailArray[index]}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={2}><Label>Đáp án:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={item.Dapan} name="edcorrect" disabled={true} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>A:</Label></Col>
                                <Col sm={10}>
                                    <Input 
                                        type="text"
                                        pattern=".*\S+.*"
                                        name="eda"
                                        defaultValue={item.A}
                                        disabled={listExamDetailArray[index]}
                                        required={!listExamDetailArray[index]}
                                    />
                                </Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>B:</Label></Col>
                                <Col sm={10}><Input type="text" pattern=".*\S+.*" defaultValue={item.B} name="edb"
                                disabled={listExamDetailArray[index]} required={!listExamDetailArray[index]} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>C:</Label></Col>
                                <Col sm={10}><Input type="text" pattern=".*\S+.*" defaultValue={item.C} name="edc"
                                disabled={listExamDetailArray[index]} required={!listExamDetailArray[index]} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>D:</Label></Col>
                                <Col sm={10}><Input type="tex" pattern=".*\S+.*" defaultValue={item.D} name="edd"
                                disabled={listExamDetailArray[index]} required={!listExamDetailArray[index]} /></Col>
                            </FormGroup>

                            { listExamDetailArray[index] &&
                                <div role="group" className="btn-group-update">
                                    <Button color="warning" className="btn-update" onClick={() => toggleUpdate( index )}>Sửa câu hỏi { index + 1 }</Button>{' '}
                                </div>
                            }
                            { !listExamDetailArray[index] &&
                                <div role="group">
                                    <Button type="submit" color="primary" className="btn-save">Lưu câu hỏi</Button>{' '}
                                    <Button color="success" className="btn-cancel" onClick={() => toggleUpdate( index )}>Hủy</Button>
                                </div>
                            }

                        </Form>
                    )
                })   
            }
        </div>
    );
}

// Update
export const ExamDetailMultiple = (props) => {
    const { listExamDetail, listExamDetailArray, toggleUpdate, updateExamDetailForm, deleteExamDetailForm, match } = props;
    return(
        <main className={'update'}>
            <Alert color="info" className="bonus-button">
                <p>Đưa chuột qua câu hỏi bạn cần sửa và nhấn vào button <strong>Sửa đề</strong></p>
                {/*<p><strong>Lưu ý:</strong> Khi bạn xóa một câu hỏi và thêm mới một câu hỏi thì mặc định câu hỏi mới sẽ thêm vào vị trí câu hỏi bạn đã xóa.</p>*/}
                <hr></hr>
                <Link to={`${match.url}`} className="btn btn-info">Chuyển sang chế độ chỉ được đọc.</Link>
            </Alert>
            <div className="iz-exam-detail-form">
                <div>
                    {/* Thông tin đề */}
                    <FormGroup row>
                        <Col sm={6}>
                            <Label>Môn học</Label>
                            <Input type="text" value={ listExamDetail[0].MaMH } disabled={true} />
                        </Col>
                        <Col sm={6}>
                            <Label>Mã đề</Label>
                            <Input type="text" value={ props.match.params.id } disabled={true} />
                        </Col>
                    </FormGroup>

                    {/* Chọn trình độ */}
                    <FormGroup row>
                        <Col sm={2}><Label>Chọn trình độ:</Label></Col>
                        <Col sm={10}>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="level" checked={ listExamDetail[0].Trinhdo === 'A' || false } disabled />{' '}
                                    Dễ
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="level" checked={ listExamDetail[0].Trinhdo === 'B' || false } disabled />{' '}
                                    Trung bình
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="level" checked={ listExamDetail[0].Trinhdo === 'C' || false } disabled />{' '}
                                    Khó
                                </Label>
                            </FormGroup>
                    </Col>
                    </FormGroup>
                </div>
                {/* ./end BoDe */}
                
                <ExamDetail
                    listExamDetailArray={listExamDetailArray}
                    listExamDetail={listExamDetail}
                    toggleUpdate={toggleUpdate}
                    updateExamDetailForm={updateExamDetailForm}
                    deleteExamDetailForm={deleteExamDetailForm}
                />
            </div>
        </main>
    );
}

// Read only
export const ExamDetailReadOnly = (props) => {
    const { listExamDetail , match, user } = props;
    return(
        <main className={'read'}>
        
            { ( user.role === r.teacher || user.role === r.basis ) &&
                <Alert color="info" className="bonus-button">
                    <h4 className="alert-heading">Welcome!</h4>
                    <p>Bạn có thể sửa đề của mình bằng cách nhần vào nút<strong> "Sửa đề này" </strong>.</p>
                    <hr></hr>
                    <Link to={`${match.url}/update`} className="btn btn-warning">Sửa đề này</Link>
                </Alert>
            }
            
            <div className="iz-exam-detail-form">
                <div>
                    {/* Thông tin đề */}
                    <FormGroup row>
                        <Col sm={6}>
                            <Label>Môn học</Label>
                            <Input type="text" value={ listExamDetail[0].MaMH } disabled={true} />
                        </Col>
                        <Col sm={6}>
                            <Label>Mã đề</Label>
                            <Input type="text" value={ match.params.id } disabled={true} />
                        </Col>
                    </FormGroup>
                    {/* Chọn trình độ */}
                    <FormGroup row>
                        <Col sm={2}><Label>Chọn trình độ:</Label></Col>
                        <Col sm={10}>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="level" checked={ listExamDetail[0].Trinhdo === 'A' || false } disabled={true} />{' '}
                                    Dễ
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="level" checked={ listExamDetail[0].Trinhdo === 'B' || false } disabled={true} />{' '}
                                    Trung bình
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="level" checked={ listExamDetail[0].Trinhdo === 'C' || false } disabled={true} />{' '}
                                    Khó
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </div>
                {/* ./end BoDe */}
                
                {/* Bộ đề chi tiết */}
                <div className="form-list iz-exam-detail-list">
                    { listExamDetail.map((item,index) =>
                        
                        <Form key={item.Cauhoi} onSubmit={ e => e.preventDefault() } className="form-item iz-exam-detail-item">
                            <FormGroup row>
                                <Col sm={2}><Label>Câu hỏi:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={index + 1} disabled={true} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>Nội dung:</Label></Col>
                                <Col sm={10}><Input type="textarea" defaultValue={item.Noidung} disabled={true} /></Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={2}><Label>Đáp án:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={item.Dapan} disabled={true} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>A:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={item.A} disabled={true} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>B:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={item.B} disabled={true} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>C:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={item.C} disabled={true} /></Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Col sm={2}><Label>D:</Label></Col>
                                <Col sm={10}><Input type="text" defaultValue={item.D} disabled={true} /></Col>
                            </FormGroup>
                        </Form>
                    )}
                </div>
            </div>
        </main>
    );
}

// Add
export const ExamDetailAdd = (props) => {

    const { 
        match,
        listDefault, examID,
        handleChangeA, handleChangeB, handleChangeC, handleChangeD,
        handleChangeAns, handleChangeContent, handleChangeExamLevel, handleChangeCount,
        addExamView, submit
    } = props;
    
    return(
        <main className={'add'}>

            <div className="role">
                <Button color="success" onClick={() => addExamView(1)}>+ Thêm 1 câu hỏi</Button>{' '}
                <Button color="success" onClick={() => addExamView(2)}>+ Thêm 2 câu hỏi</Button>{' '}
                <Button color="success" onClick={() => addExamView(5)}>+ Thêm 5 câu hỏi</Button>
            </div>

            <div className="iz-exam-detail-form">
                <Form onSubmit={e => submit(e)}>

                    <div>
                        {/* Thông tin đề */}
                        <FormGroup row>
                            <Col sm={2}><Label>Môn học</Label></Col>
                            <Col sm={10}>
                                <Input type="text" defaultValue={ match.params.id } disabled={true} />
                            </Col>
                        </FormGroup>

                        {/* Mã đề */}
                        <FormGroup row>
                            <Col sm={2}><Label>Mã đề:</Label></Col>
                            <Col sm={10}>
                                <Input type="text" defaultValue={examID} disabled={true} />
                            </Col>
                        </FormGroup>

                        {/* Chọn trình độ */}
                        <FormGroup row onChange={ handleChangeExamLevel }>
                            <Col sm={2}><Label>Chọn trình độ:</Label></Col>
                            <Col sm={10}>
                                <FormGroup check inline>
                                    <CustomInput id="ExamLevelA" type="radio" name="level" label="Dễ" value="A" defaultChecked />
                                </FormGroup>
                                <FormGroup check inline>
                                    <CustomInput id="ExamLevelB" type="radio" name="level" label="Trung bình" value="B" />
                                </FormGroup>
                                <FormGroup check inline>
                                    <CustomInput id="ExamLevelC" type="radio" name="level" label="Khó" value="C" />
                                </FormGroup>
                            </Col>
                        </FormGroup>

                        {/* Chọn lần thi */}
                        <FormGroup row>
                            <Col sm={2}>
                                <Label>Chọn lần thi:</Label>
                            </Col>
                            <Col sm={10}>
                                <Input type="select" defaultValue="1" onChange={ handleChangeCount }>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </div>
                    {/* ./end BoDe */}

                    <div className="form-list iz-exam-detail-list">
                        { listDefault.map((item,index) => {
                            return(
                                <div key={ (index+1) } className="form-item iz-exam-detail-item">

                                    <FormGroup row>
                                        <Col sm={2}><Label>Câu hỏi:</Label></Col>
                                        <Col sm={10}><Input type="text" defaultValue={index + 1} disabled={true}/></Col>
                                    </FormGroup>
                    
                                    <FormGroup row>
                                        <Col sm={2}><Label>Nội dung:</Label></Col>
                                        <Col sm={10}>
                                            <Input
                                                type="textarea"
                                                value={item.Noidung}
                                                placeholder="Nhập nội dung câu hỏi..."
                                                pattern=".*\S+.*"
                                                required={true}
                                                onChange={(e) => handleChangeContent(e,index)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={2}><Label>Đáp án:</Label></Col>
                                        <Col sm={10}>
                                            <Input type="select" required={true} defaultValue="" onChange={(e) => handleChangeAns(e,index)} >
                                                <option value="" disabled={true}>Chọn 1 đáp án</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </Input>   
                                        </Col>
                                    </FormGroup>
                    
                                    <FormGroup row>
                                        <Col sm={2}><Label>A:</Label></Col>
                                        <Col sm={10}>
                                            <Input 
                                                type="text" 
                                                pattern=".*\S+.*"
                                                required={true}
                                                placeholder="Nhập câu trả lời A ..."
                                                value={item.A}
                                                onChange={e => handleChangeA(e,index)}
                                            />
                                        </Col>
                                    </FormGroup>
                    
                                    <FormGroup row>
                                        <Col sm={2}><Label>B:</Label></Col>
                                        <Col sm={10}>
                                            <Input 
                                                type="text"
                                                pattern=".*\S+.*"
                                                required={true}
                                                placeholder="Nhập câu trả lời B ..."
                                                value={item.B}
                                                onChange={e => handleChangeB(e,index)}
                                            />
                                        </Col>
                                    </FormGroup>
                    
                                    <FormGroup row>
                                        <Col sm={2}><Label>C:</Label></Col>
                                        <Col sm={10}>
                                            <Input 
                                                type="text"
                                                pattern=".*\S+.*"
                                                required={true} 
                                                placeholder="Nhập câu trả lời C ..."
                                                value={item.C}
                                                onChange={e => handleChangeC(e,index)}
                                            />
                                        </Col>
                                    </FormGroup>
                    
                                    <FormGroup row>
                                        <Col sm={2}><Label>D:</Label></Col>
                                        <Col sm={10}>
                                        <Input 
                                            type="text"
                                            pattern=".*\S+.*"
                                            required={true}
                                            placeholder="Nhập câu trả lời D ..."
                                            value={item.D}
                                            onChange={e => handleChangeD(e,index)}/>
                                        </Col>
                                    </FormGroup>
        
                                </div>
                            )
                        })}
                    </div>
                    {/* ./end BodeCT */}
                    
                    <br></br>
                    
                    <div className="role">
                        <Button color="primary" type="submit"> Thêm </Button>
                    </div>

                </Form>
            </div>
        </main>
    );
}

export const ExamDetailEnrol = (props) => {
    const { listExamDetail, listExamDetailCopy, getRecord } = props;
    return(
        <div className="iz-exam-detail-form">
            <div className="form-list iz-exam-detail-list">
                { listExamDetail.map( (item,index) => (
                    <div key={ item["Cauhoi"] } className="form-item iz-exam-detail-item">
                        
                        <FormGroup row>
                            <Col sm={2}><Label>Câu hỏi:</Label></Col>
                            <Col sm={10}><Input type="text" value={(index + 1)} name={`edquestion-${index+1}`} disabled={true} /></Col>
                        </FormGroup>
            
                        <FormGroup row>
                            <Col sm={2}><Label>Nội dung:</Label></Col>
                            <Col sm={10}>
                                <Input 
                                    type="textarea" 
                                    name={`edcontent-${index+1}`}
                                    value={item["Noidung"]}
                                    disabled={true}
                                />
                            </Col>
                        </FormGroup>

                        <CustomInput 
                            type="radio"
                            id={`exampleCustomRadio1-${index+1}`}
                            name={`edabcd-${index+1}`}
                            value='A'
                            checked={ listExamDetailCopy[index] === 'A' }
                            onChange={ (e) => getRecord(e,index) }
                            label={ item["A"] }
                        />

                        <CustomInput 
                            type="radio"
                            id={`exampleCustomRadio2-${index+1}`}
                            name={`edabcd-${index+1}`}
                            value='B'
                            checked={ listExamDetailCopy[index] === 'B' }
                            onChange={ (e) => getRecord(e,index) }
                            label={ item["B"] }
                        />

                        <CustomInput 
                            type="radio"
                            id={`exampleCustomRadio3-${index+1}`}
                            name={`edabcd-${index+1}`}
                            value='C'
                            checked={ listExamDetailCopy[index] === 'C' }
                            onChange={ (e) => getRecord(e,index) }
                            label={ item["C"] }
                        />

                        <CustomInput 
                            type="radio"
                            id={`exampleCustomRadio4-${index+1}`}
                            name={`edabcd-${index+1}`}
                            value='D'
                            checked={ listExamDetailCopy[index] === 'D' }
                            onChange={ (e) => getRecord(e,index) }
                            label={ item["D"] }
                        />
                        
                    </div>
                ))}
            </div>
        </div>
    );
}