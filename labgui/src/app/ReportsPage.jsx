import React, { Component } from 'react';
import { Report } from '../models/Report';
import {ReportCard} from './ReportCard';
import { ReportForm } from './ReportForm';
import { ReportsRepository} from '../api/reportsRepository'
import { Redirect } from 'react-router-dom';

export class ReportsPage extends Component {

    onSubmitReport(rep) {

        let DBRep = {
            for_emp_id: rep.forId,
            report_body: rep.reportText,
            severity: rep.severity
        }
        this.reportsRepo.addReport(DBRep)
        .then(() => {
           this.setReportInfo();
        })
    }

    state = {
        yourReports: [
            new Report('Loading...', 1, 2, "Loading...", 'Loading...', 1, 0)
        ],
        reportsOnYou: [
            new Report('Loading...', 1, 2, "Loading...", 'Loading...', 1, 0)
        ],
        reportChoices: []
    }

    reportsRepo = new ReportsRepository()


    setReportInfo() {
        console.log("User id = " + window.location.userId)
        this.reportsRepo.getReportHistory(window.location.userId)
        .then (x => {
            let yourReps = [];
            let repsOnYou = [];
            console.log("response to gethistory")
            console.log(x)
            x.data.reportHistory.forEach(rep => {
                if (rep.for_emp_id == window.location.userId) {
                    let ourRep = new Report(rep.id, rep.by_emp_id, rep.for_emp_id, rep.report, rep.creation_date, rep.status, rep.severity)
                    repsOnYou.push(ourRep);
                }
                else if (rep.by_emp_id == window.location.userId) {
                    let ourRep = new Report(rep.id, rep.by_emp_id, rep.for_emp_id, rep.report, rep.creation_date, rep.status, rep.severity)
                    yourReps.push(ourRep);
                }
                else{
                    // alert("Weird data in report history")
                }
            })

            let promise = new Promise((res, rej) => {
                for (let i = 0; i < yourReps.length; i++){
                    this.reportsRepo.getEmpInfo(yourReps[i].id)
                    .then(info => {
                        yourReps[i].byId = info[0].fname +" "+ info[0].lname;
                        yourReps[i].forId = info[1].fname +" "+ info[1].lname;
                        this.setState({yourReports: yourReps, reportsOnYou: repsOnYou});
                    })
                }
                for (let i =0; i < repsOnYou.length; i++){
                    this.reportsRepo.getEmpInfo(repsOnYou[i].id)
                    .then(info => {
                        repsOnYou[i].byId = info[1].fname +" "+ info[1].lname;
                        repsOnYou[i].forId = info[0].fname +" "+ info[0].lname;
                        this.setState({yourReports: yourReps, reportsOnYou: repsOnYou});
                    })
                }
            })

        });
    }

    componentDidMount() {
        this.setReportInfo()
        this.reportsRepo.getChoices()
        .then(x => {
            let pairs = [];
            x.forEach(employee => {
                if (employee.id != window.location.userId){
                    pairs.push([employee.id, employee.fname +" "+ employee.lname])
                }
            })
            this.setState({reportChoices: pairs});
        });
    }

    render() {

        if(window.location.userId === -1){
            return <Redirect to='/'/>
        }

        return (
            <>
            <div className='container'>
                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Your reports</h2>
                    <ul className = 'card-body' 
                        style={{'list-style': 'none'}, {'paddingLeft': 0}}>
                        {
                        this.state.yourReports.map(report => 
                            <ReportCard report={report} key={report.id} type='on'/>
                        )}
                        <h3 style={{'display': this.state.yourReports.length <= 0 ? 'block' : 'none'}}>
                            <span className='text-white  badge badge-success' >No Reports Found</span>
                        </h3>
                    </ul>
                </div>

                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Reports on you</h2>
                    <ul className = 'card-body'
                        style={{'list-style': 'none'}, {'paddingLeft': 0}}>
                        {
                            this.state.reportsOnYou.map(report => 
                            <ReportCard report={report} key={report.id} type='by'/>
                        )}
                        <h3 style={{'display': this.state.reportsOnYou.length <= 0 ? 'block' : 'none'}}>
                            <span className='text-white  badge badge-success' >No Reports Found</span>
                        </h3>
                    </ul>
                </div>

                <h2>Submit a report</h2>
                <ReportForm userId={1} reportChoices={this.state.reportChoices} submitReport={x => this.onSubmitReport(x)}/>
            </div>
            </>
        );
    }
}