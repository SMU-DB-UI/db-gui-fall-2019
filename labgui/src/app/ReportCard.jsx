import React, { Component } from 'react';
import { Report } from '../models/Report';

export const ReportCard = (props) => {
    return (
        <li className='mt-3 mb-3 row container' style={{'list-style': 'none'}}>
            <div className='col-3 bg-none mt-3'>
                <h3>
                    <div className='badge badge-info'>
                        {props.report.date}
                    </div>
                    <div className='w-100'></div>
                    <div className='badge badge-success'
                        style={{ 'display': (props.report.status == 1) ? 'relative': 'none' }}>
                        Closed
                    </div>
                    <div className='badge badge-danger'
                        style={{ 'display': (props.report.status == 0) ? 'relative': 'none' }}>
                        Open
                    </div>
                </h3>
            </div>
            <div className='card bg-light col-9 text-dark'>
                <div className='card-header'>
                    
                <h3>
                    {/* <span className='float-left badge badge-success'
                    style={{ 'display': (props.report.status == 1) ? 'relative': 'none' }}>
                    Closed
                    </span>
                    <span className='float-left badge badge-danger'
                        style={{ 'display': (props.report.status == 0) ? 'relative': 'none' }}>
                        Open
                    </span> */}
                        <span className= 'float-left'>Report by: {props.report.byId}</span>
                        <span className = 'float-right'>Severity: {props.report.severity}</span>
                    </h3>

                </div>
                <div className='card-body bg-light'>
                    <div className = 'card-text text-left'>{props.report.reportText}</div>
                </div>
            </div>
        </li>
    );
}