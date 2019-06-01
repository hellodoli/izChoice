import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import { role as r } from '../../../config';

export const EmptyStudent = ({ status }) => (
    <div className="iz-student-nofound">{ status.text }</div>
);

const StudentItem = ({ index, student, role, match }) => {
    const stt = index + 1;
    return(
        <tr>
            <td>{ stt }</td>
            <td>{ student["MaSV"] }</td>
            <td>{`${student["Ho"]} ${student["Ten"]}`}</td>
            <td>{ student["Diachi"] }</td>
            <td>{ student["Ngaysinh"] }</td>
            { role === r.basis &&
                <td>
                    <div role="group">
                        <Link to={`${match.url}/${student["MaSV"]}/update`} className="btn btn-sm btn-warning">Sửa thông tin sinh viên</Link>
                    </div>
                </td>
            }
        </tr>
    );
}

export const StudentTable = (props) => (
    <Table className="iz-student-table" bordered striped>
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Địa chỉ</th>
                <th>Ngày sinh</th>
                { props.user.role === r.basis && <th>Thao tác</th> }
            </tr>
        </thead>
        {/* ./end thead */}
        <tbody>
            { props.listStudent.map((student,index) =>
                <StudentItem
                    key={student.MaSV}
                    index={index}
                    student={student}
                    role={props.user.role}
                    match={props.match}
                />
            )}
        </tbody>
        {/* ./end tbody */}
    </Table>
);