import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import { UserContext } from '../../../user-context';
import { role, limitPage } from '../../../config';

const ExamItem = ({ item, index, match, pdefault }) => {
    const stt = ( pdefault * limitPage ) + (index + 1);
    return(
        <UserContext.Consumer>
            { ({ userInfo : user }) => (
                <tr>
                    <td>{ stt }</td>
                    <td>{ item.MaBD }</td>
                    <td>{ (item.Trinhdo === "A") ? 'Dễ (A)' : (item.Trinhdo === "B") ? 'Trung bình (B)' : 'Khó (C)' }</td>
                    <td>{ item.Lan }</td>
                    <td>
                        { (user.role === role.teacher || user.role === role.basis) &&
                            <div role="group">
                                <Link to={`${match.url}/${item.MaBD}`} className="btn btn-info btn-sm"> Xem chi tiết đề tài </Link>{' '}
                                <Link to={`${match.url}/${item.MaBD}/update`} className="btn btn-warning btn-sm"> Sửa đề tài </Link>{' '}
                            </div>
                        }
                        { ( user.role === role.school ) &&
                            <div role="group">
                                <Link to={`${match.url}/${item.MaBD}`} className="btn btn-info btn-sm"> Xem chi tiết đề tài </Link>{' '}
                            </div>
                        }
                    </td>
                    { ( user.role === role.basis || user.role === role.school ) &&
                        <td>{ item.Ten }</td>
                    }
                </tr>
            )}
        </UserContext.Consumer>
    );
}

const ExamTable = (props) =>
    <Table className="iz-exam-table" striped bordered>
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã đề</th>
                <th>Trình độ</th>
                <th>Lần thi</th>
                <th>Thao tác</th>
                <UserContext.Consumer>
                    { ({ userInfo }) => 
                        (userInfo.role === role.basis || userInfo.role === role.school) &&
                            <th>Tạo bởi giáo viên</th>
                    }
                </UserContext.Consumer>
            </tr>
        </thead>
        {/* ./end thead */}
        <tbody>
            { props.listExam.map((item,index) =>
                <ExamItem
                    key={item.MaBD}
                    item={item}
                    index={index}
                    match={props.match}
                    pdefault={props.pdefault} />
            )}
        </tbody>
        {/* ./end tbody */}
        </Table>

export default ExamTable;