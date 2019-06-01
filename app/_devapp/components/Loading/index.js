import React from 'react';
import { Spinner } from 'reactstrap';


export const LoadingCenter = () => (
    <div className="iz-loading-container">
        <div className="iz-loading-wrapper">
            <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} />
        </div>
    </div>
);