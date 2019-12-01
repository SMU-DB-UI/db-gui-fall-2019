import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Report } from './models/Report'

class HrReports extends Component {

    constructor(props) {
        super(props);

        // this.state ={
        //     by: null,
        //     for: null,
        //     reports: null,
        //     creationDate: null,
        //     status: null,
        //     close_reason: null,
        //     severity: null
        // }

        let rep1 = new Report("1", "Me", "You", "Your code sucks", "Today", "Open", "High");
        let rep2 = new Report("2", "You", "Me", "Hire me pls", "Yesterday", "Closed", "Low");
        let rep3 = new Report("3", "Other Person", "You", "Extra report", "Nov 21, 2019", "Closed", "Mid")
        this.state = {
            reports: [rep1, rep2, rep3]
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

    generateReport(report) {
        
        return <div className="report-bound-box report-instance white">

            <div>
                <ul className="horizontal no-bullets no-padding width-100">
                    <li className="auto-margin-left">
                        <strong>Report for: </strong> {report.forId}
                    </li>
                    <li>
                        <ul className="no-bullets float-right">
                            <li>
                                <strong>Date: </strong>{report.date}
                            </li>
                            <li>
                                <strong>Status: </strong>{report.status}
                            </li>
                            <li className={this.getSeverity(report.severity)}>
                                <strong className="black-text">Severity:</strong>{report.severity}
                            </li>
                        </ul>
                        <div className={"clear"}></div>
                    </li>
                </ul>

            </div>

            <div className="auto-margin-left margin-tbl report-bound-box">
                <strong>Report: </strong>
                <p>
                    {report.reportText}
                </p>
            </div>

            <div className="auto-margin-left margin-tbl">
                {/* {this.getCloseReason(report.status, report.close_reason)} */}
                <strong className="">Submitted by: </strong> {report.byId}
            </div>


        </div>

    }


    render() {

        return (
            <div>

                <h1>All Reports</h1>

                {this.state.reports.map(report => <li className="no-bullets" key={report.reportBy + report.reportFor} value={report.reports} >

                    {this.generateReport(report)}

                </li>)}

            </div>
        );

    }
}

export default HrReports;