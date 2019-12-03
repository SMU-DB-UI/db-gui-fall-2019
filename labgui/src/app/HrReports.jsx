import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Report } from '../models/Report';
import { ReportCard } from './ReportCard';

class HrReports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [
                new Report(1, 1, 2, "disgusting", 'Oct-15-2019', 1, 5),
                new Report(2, 1, 2, "ok", 'Oct-15-2019', 1, 3),
                new Report(3, 1, 2, "good", 'Oct-15-2019', 1, 1),
            ],
        }
    }

    getSeverity(severity) {
        if (severity === "Low") {
            return "green-text";
        }
        if (severity === "Mid") {
            return "orange-text"
        }
        if (severity === "High") {
            return "red-text"
        }
        return "gray-text"
    }

    // getCloseReason(status, closeReason) {//Leaving this here because not sure if we'll bring back close reasons
    //     if (status !== "Closed") {
    //         return null
    //     }

    //     return <div className="margin-bottom"><strong>Reason for close: </strong> {closeReason}</div>
    // }


    // generateNReport(report) {

    //     return <div className="report-bound-box report-instance white">

    //         <div>
    //             <ul className="horizontal no-bullets no-padding width-100">
    //                 <li className="auto-margin-left">
    //                     <strong>Report for: </strong> {report.forId}
    //                 </li>
    //                 <li>
    //                     <ul className="no-bullets float-right">
    //                         <li>
    //                             <strong>Date: </strong>{report.date}
    //                         </li>
    //                         <li>
    //                             <strong>Status: </strong>{report.status}
    //                         </li>
    //                         <li className={this.getSeverity(report.severity)}>
    //                             <strong className="black-text">Severity:</strong>{report.severity}
    //                         </li>
    //                     </ul>
    //                     <div className={"clear"}></div>
    //                 </li>
    //             </ul>

    //         </div>

    //         <div className="auto-margin-left margin-tbl report-bound-box">
    //             <strong>Report: </strong>
    //             <p>
    //                 {report.reportText}
    //             </p>
    //         </div>

    //         <div className="auto-margin-left margin-tbl">
    //             {/* {this.getCloseReason(report.status, report.close_reason)} */}
    //             <strong className="">Submitted by: </strong> {report.byId}
    //         </div>


    //     </div>

    // }


    render() {

        return (

            <div>

                <nav className='navbar-fluid' title='login'>
                    <ol className="breadcrumb breadcrumb-light">
                        <li className="breadcrumb-item">Your Reports</li>
                    </ol>
                </nav>

                <div className='card mt-3 bg-info  text-white'>
                    <ul className='card-body'
                        style={{ 'list-style': 'none' }, { 'paddingLeft': 0 }}>

                        {this.state.reports.map(report => <li className="no-bullets" key={report.reportBy + report.reportFor} value={report.reports} >

                            <ReportCard report={report} key={report.id} />

                        </li>)}
                    </ul>
                </div>
            </div>
        );

    }
}

export default HrReports;