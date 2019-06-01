import React, { Fragment } from 'react';
import { Table, Button } from 'reactstrap';

import { role as r } from '../../../config';

export const EmptyRegister = ({ status }) => (
    <div className="iz-header"><h3>{ status.text }</h3></div>
);

const RegisterItem = ({ index, res, role, deleteRegister }) => {
    const stt = index + 1;
    return(
        <tr>
            <td>{ stt }</td>
            <td>{ res["TenMH"] }</td>
            <td>{ res["MaLop"] }</td>
            <td>{ res["Lan"] }</td>
            <td>{ res["Ngaythi"] }</td>
            <td>{ res["Socauthi"] }</td>
            <td>{ `${res["Thoigian"]} phút` }</td>
            <td>{ res["Trinhdo"] }</td>
            { role === r.basis &&
                <Fragment>
                    <td><Button size="sm" color="danger" onClick={() => deleteRegister( res["MaLop"], res["MaMH"], res["Lan"] )}>Xóa</Button></td>
                    <td>{ res["Ten"] }</td>
                </Fragment>
            }
            { role === r.school && <td>{ res["Ten"] }</td> }
        </tr>
    );
}

export const RegisterTable = (props) => (
    <Table className="iz-register-table" striped bordered>
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên môn học</th>
                <th>Mã lớp thi</th>
                <th>Lần thi</th>
                <th>Ngày thi</th>
                <th>Số câu thi</th>
                <th>Thời gian</th>
                <th>Trình độ (A,B,C)</th>
                { props.user.role === r.basis &&
                    <Fragment>
                        <th>Thao tác</th>
                        <th>Đăng ký bởi</th>
                    </Fragment>
                }
                { props.user.role === r.school && <th>Đăng ký bởi</th> }
            </tr>
        </thead>
        {/* ./end thead */}
        <tbody>
            {
                props.listRegister.map((res,index) =>
                    <RegisterItem
                        key={index+1}
                        index={index}
                        res={res}
                        role={props.user.role}
                        deleteRegister={props.deleteRegister}
                    />
                )
            }
        </tbody>
        {/* ./end tbody */}
    </Table>
);