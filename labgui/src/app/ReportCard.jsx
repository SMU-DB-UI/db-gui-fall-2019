import React, { Component } from 'react';
import { Report } from '../models/Report';
import './ReportCard.css'

export const ReportCard = (props) => {
    return (
        <li className='mt-3 mb-3 row container' style={{'list-style': 'none'}}>
            <h4 className='col-3 bg-none mt-3 mr-1'>
                <div className='badge badge-success'
                    style={{ 'display': (props.report.status != "open") ? 'relative' : 'none' }}>
                    Closed
                </div>
                <div className='badge badge-danger'
                    style={{ 'display': (props.report.status == "open") ? 'relative' : 'none' }}>
                    Open
                </div>
                <div className=''>
                    {props.report.date}
                </div>
            </h4>
            <div className='card bg-light col text-dark'>
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
                    <div>
                        <span className= 'float-left' style={{'display': props.type == 'by' ? 'inline' : 'none'}}>Report by: {props.report.byId}</span>
                        <span className= 'float-left' style={{'display': props.type == 'on' ? 'inline' : 'none'}}>Report on: {props.report.forId}</span>
                        <div className= 'float-left' style={{'display': props.type == 'manager' ? 'block' : 'none'}}>
                            <div>On: {props.report.forId}</div>
                            <div>By: {props.report.byId}</div>
                        </div>

                        <span className = 'float-right'>Severity: 
                            <span className={props.report.severity <= 1 ? 'text-success'
                                : props.report.severity == 5 ? 'text-danger'
                                    :'text-warning'}>
                                {props.report.severity}
                            </span>
                        </span>
                    </div>
                    </h3>

                </div>
                <div className='card-body bg-light'>
                    <div className = 'card-text text-left'>{props.report.reportText}</div>
                    <button className= 'float-right btn btn-danger' 
                            style={{'display': ((props.type == 'manager') && (props.report.status=='open')) ? 'inline' : 'none'}}
                            onClick = {() => props.closeReport(props.report.id)}>
                        Close
                    </button>
                </div>
            </div>
        </li>
    );
}