import React, { Component } from 'react';
import { Report } from '../models/Report';

export const ReportCard = (props) => {
    return (
        <li className='card bg-info mt-3'>
            <div className='container card-header text-white'>
                <h3>
                    <span className='float-left badge badge-success'
                    style={{ 'display': (props.report.status == 1) ? 'relative': 'none' }}>
                    Closed
                    </span>
                    <span className='float-left badge badge-danger'
                        style={{ 'display': (props.report.status == 0) ? 'relative': 'none' }}>
                        Open
                    </span>

                    <span>Report by: {props.report.byId}</span>
                    <span className = 'float-right'>Severity: {props.report.severity}</span>
                </h3>

            </div>
            <div className='card-body bg-light'>
                <div className = 'card-text text-left'>{props.report.reportText}</div>
            </div>
        </li>
    );
}