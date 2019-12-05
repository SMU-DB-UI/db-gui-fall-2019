import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Report } from '../models/Report';
import { ReportCard } from './ReportCard';
import { ReportsRepository } from '../api/reportsRepository';

class HrReports extends Component {

    reportsRepo = new ReportsRepository();

    constructor(props) {
        super(props);
        this.state = {
            reports: [
                // new Report(1, 1, 2, "disgusting", 'Oct-15-2019', 1, 5),
                // new Report(2, 1, 2, "ok", 'Oct-15-2019', 1, 3),
                // new Report(3, 1, 2, "good", 'Oct-15-2019', 1, 1),
            ]
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

    setReportInfo() {
        console.log("User id = " + window.location.userId)
        this.reportsRepo.getManagerReports(window.location.userId)
        .then (x => {
            let reports = [];
            x.forEach(rep => {
                if (rep.status == 'closed')
                    console.log("fetching closed")
                let ourRep = new Report(rep.id, rep.by_emp_id, rep.for_emp_id, rep.report, rep.creation_date, rep.status, rep.severity)
                reports.push(ourRep);      
            })
            for (let i = 0; i < reports.length; i++){
                this.reportsRepo.getEmpInfo(reports[i].id)
                .then(info => {
                    reports[i].byId = info[0].fname +" "+ info[0].lname;
                    reports[i].forId = info[1].fname +" "+ info[1].lname;
                    this.setState({reports: reports});
                })
            }
        });
    }

    componentDidMount() {
        this.setReportInfo();
    }

    closeReport(reportId) {
        this.reportsRepo.closeReport(reportId)
        .then( () =>
            {this.setReportInfo();}
        )
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

            <div className='container'>

                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Employee Reports</h2>
                    <ul className='card-body'
                        style={{ 'list-style': 'none' }, { 'paddingLeft': 0 }}>
                        {this.state.reports.map(report => 
                        <div className="no-bullets" key={report.id} >
                            <ReportCard report={report} 
                                        key={report.id + report.byId} 
                                        type='manager' 
                                        closeReport={x => this.closeReport(x)}/>
                        </div>)}
                    </ul>
                </div>
            </div>
        );

    }
}

export default HrReports;