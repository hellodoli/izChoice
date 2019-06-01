import React from 'react';
import { Table } from 'reactstrap';

import { role as r } from '../../../config';

export const EmptyRegister = ({ status }) => (
    <div className="iz-header"><h3>{ status.text }</h3></div>
);

const ScoreItem = ({ index, score }) => {
    const stt = index + 1;
    return(
        <tr>
            <td>{ stt }</td>
            <td>{ score["MaBD"] }</td>
            <td>{ score["MaSV"] }</td>
            <td>{`${score["Ho"]} ${score["Ten"]}`}</td>
            <td>{ score["Diem"] }</td>
            <td>{ score["Ngaythi"] }</td>
        </tr>
    );
}

export const ScoreTable = (props) => (
    <Table className="iz-score-table" bordered striped>
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã đề</th>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Điểm</th>
                <th>Ngày thi</th>
            </tr>
        </thead>
        {/* ./end thead */}
        <tbody>
            { props.list.map(( score, index ) =>
                <ScoreItem
                    key={score["MaSV"]}
                    index={index}
                    score={score} />
            )}
        </tbody>
        {/* ./end tbody */}
    </Table>
);