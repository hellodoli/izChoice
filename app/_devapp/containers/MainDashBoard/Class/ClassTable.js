import React,{ Fragment } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import { role as r, limitPage } from '../../../config';

export const EmptyClass = ({ status }) => (
    <div className="iz-header"><h3>{ status.text }</h3></div>
);

const ClassItem = ({ index, cls, role, match, pdefault }) => {
    const stt = ( pdefault * limitPage ) + (index + 1);
    return(
        <tr>
            <td>{ stt }</td>
            <td>{ cls["MaLop"] }</td>
            <td>{ cls["TenLop"] }</td>
            <td>
                <div role="group">
                    { role === r.basis &&
                        <Fragment>
                            <Link to={`${match.url}/${cls.MaLop}/add`} className="btn btn-sm btn-success">+ Thêm sinh viên</Link>{' '}
                            <Link to={`${match.url}/${cls.MaLop}/update`} className="btn btn-sm btn-warning">Sửa thông tin lớp</Link>
                        </Fragment>
                    }
                    {' '}
                    <Link to={`${match.url}/${cls.MaLop}`} className="btn btn-sm btn-info"> Xem danh sách sinh viên </Link>
                </div>
            </td>
        </tr>
    );
}

export const ClassTable = (props) => (
    <Table className="iz-class-table" bordered striped>
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã lớp</th>
                <th>Tên lớp</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        {/* ./end thead */}
        <tbody>
            { props.listClass.map((cls,index) =>
                <ClassItem
                    key={cls["MaLop"]}
                    index={index}
                    cls={cls}
                    role={props.user.role}
                    match={props.match} 
                    pdefault={props.pdefault}
                />
            )}
        </tbody>
        {/* ./end tbody */}
    </Table>
);