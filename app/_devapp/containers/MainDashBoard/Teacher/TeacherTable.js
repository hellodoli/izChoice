import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import { role as r, limitPage } from '../../../config';

export const EmptyTeacher = ({ status }) => (
    <div className="iz-header"><h3>{ status.text }</h3></div>
);

const TeacherItem = ({ index, teacher, role, match, pdefault }) => {
    const stt = ( pdefault * limitPage ) + (index + 1);
    return(
        <tr>
            <td>{ stt }</td>
            <td>{ teacher["MaGV"] }</td>
            <td>{ teacher["MaKhoa"] }</td>
            <td>{`${teacher["Ho"]} ${teacher["Ten"]}`}</td>
            <td>{ teacher["Hocvi"] }</td>
            { role === r.basis &&
                <td>
                    <div role="group">
                        <Link to={`${match.url}/${teacher["MaGV"]}/update`} className="btn btn-sm btn-warning"> Sửa thông tin </Link>
                    </div>
                </td>
            }
        </tr>
    );
}

export const TeacherTable = (props) => (
    <Table className="iz-teacher-table" bordered striped>
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã GV</th>
                <th>Mã Khoa</th>
                <th>Họ Tên</th>
                <th>Học vị</th>
                { props.user.role === r.basis && <th>Thao tác</th> }
            </tr>
        </thead>
        {/* ./end thead */}
        <tbody>
            { props.listTeacher.map((teacher,index) =>
                <TeacherItem
                    key={teacher["MaGV"]}
                    index={index}
                    teacher={teacher}
                    role={props.user.role}
                    match={props.match}
                    pdefault={props.pdefault} />
            )}
        </tbody>
        {/* ./end tbody */}
    </Table>
);