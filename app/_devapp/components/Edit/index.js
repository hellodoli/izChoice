import React from 'react';
import { Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Alert
  } from 'reactstrap';
import { Link } from 'react-router-dom';

export const UpdateForm = (props) => {
  const { list, klass } = props;
  return(
    <main className={'update'}>
      <div className={klass}>
        <div className="form-list">
          { list.length > 0 && list.map((item,index) =>
              <Form
                key={index+1}
                onSubmit={ (e) => e.preventDefault() }
                className="form-item is-edit"
              >
                <div>Hello</div>
          
                
              </Form>
          )}
        </div>
      </div>
    </main>
  );
}