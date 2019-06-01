import React, { Fragment } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { role as r, limitPage } from '../../../config';

import { UserContext } from '../../../user-context';


export const EmptyCourse = ({ status }) => (
    <div className="iz-header"><h3>{ status.text }</h3></div>
);

const CourseItem = ({ index, course, setUpInfo, pdefault }) => {
    const stt = ( pdefault * limitPage ) + (index + 1);
    const count = (course.count) ? course.count : 0;
    return(
        <UserContext.Consumer>
            { ({ userInfo: { role }}) => (
                <tr>
                    <td>{ stt }</td>
                    <td>{ course.TenMH }</td>
                    <td>
                        { ( role === r.teacher ) &&
                            <div role="group">
                                <Link to={`/dashboard/course/${course.MaMH}/add`} className="btn btn-success btn-sm"> + Thêm đề </Link>{' '}
                                { count > 0 &&
                                    <Fragment>
                                        <Button size="sm" color="primary"
                                        onClick={() => setUpInfo( course.MaMH, course.TenMH )}> Đăng ký môn thi </Button>{' '}
                                        <Link to={`/dashboard/course/${course.MaMH}`} className="btn btn-info btn-sm"> Xem các đề bạn đã tạo </Link>
                                    </Fragment>
                                }
                            </div>
                        }
                        { ( role === r.basis || role === r.school ) &&
                            <div role="group">
                                { count > 0
                                    ? <Link to={`/dashboard/course/${course.MaMH}`} className="btn btn-info btn-sm"> Xem đề </Link>
                                    : <Button size="sm" color="secondary" disabled={true}>Không có đề được tạo trong môn này</Button>
                                }
                            </div>
                        }

                    </td>
                    <td>
                        { (count > 0) 
                            ? count
                            : <span className="text-muted">0</span>
                        }
                    </td>
                </tr>
            )}
        </UserContext.Consumer>
    );
}

export const CourseTable = (props) => (
    <Table className="iz-course-table" bordered>
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên môn học</th>
                <th>Thao tác</th>
                <UserContext.Consumer>
                    { ({ userInfo: { role }}) => (
                        <th>{ role === r.teacher ? 'Số đề bạn đã tạo' : 'Tổng số đề' }</th>   
                    )}
                </UserContext.Consumer>
            </tr>
        </thead>
        {/* ./end thead */}
        <tbody>
            { props.listCourse.map((course,index) =>
                <CourseItem
                    key={course.MaMH}
                    index={index}
                    course={course}
                    setUpInfo={props.setUpInfo}
                    pdefault={props.pdefault} />
            )}
        </tbody>
        {/* ./end tbody */}
    </Table>
);