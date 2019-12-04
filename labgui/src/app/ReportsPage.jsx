import React, { Component } from 'react';
import { Report } from '../models/Report';
import {ReportCard} from './ReportCard';
import { ReportForm } from './ReportForm';
import {ReportsHistory, ReportsRepository} from '../api/reportsRepository'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export class ReportsPage extends Component {

    onSubmitReport(rep) {
        this.setState(prevState => {
            prevState.yourReports.push(rep);
            return prevState;
        })
        this.reportsRepo.addReport(rep);
    }

    state = {
        yourReports: [
            new Report(1, 1, 2, "disgusting", 'Oct-15-2019', 1, 5),
            new Report(2, 1, 2, "ok", 'Oct-15-2019', 1, 3),
            new Report(3, 1, 2, "good", 'Oct-15-2019', 1, 1),
        ],
        reportsOnYou: [
            new Report(4, 2, 1, "awful", 'Oct-16-2019', 0, 5)
        ]
    }

    reportsRepo = new ReportsRepository()


    setReportInfo() {
        console.log("User id = " + window.location.userId)
        let newState = {};
        this.reportsRepo.getReportHistory(1)
        .then (x => {
            let yourReps = [];
            let repsOnYou = [];

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
                    })
                }
                for (let i =0; i < repsOnYou.length; i++){
                    this.reportsRepo.getEmpInfo(repsOnYou[i].id)
                    .then(info => {
                        repsOnYou[i].byId = info[1].fname +" "+ info[1].lname;
                        repsOnYou[i].forId = info[0].fname +" "+ info[0].lname;
                    })
                }
            })
            .then(() => {
                this.setState({yourReports: yourReps, reportsOnYou: repsOnYou});
            debugger;
            console.log("actual new state:")
            console.log(this.state)
            })
            .catch( () => {
                this.setState({yourReports: yourReps, reportsOnYou: repsOnYou});
                debugger;
                console.log("actual new state:")
                console.log(this.state)
            })


            

            newState = this.state;
        });
        // this.setState(newState);
                
        // console.log("newState:")
        // console.log(newState)
        // console.log("actual actual new state:")
        // console.log(this.state)
    }

    componentDidMount() {
        // this.reportsRepo.login()
        // .then (x => {
        //         this.reportsRepo.login();
        // })
        this.setReportInfo()


        console.log(this.state.yourReports)
    }

    render() {
        return (
            <>
            <div className='container'>
                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Your reports</h2>
                    <ul className = 'card-body' 
                        style={{'list-style': 'none'}, {'paddingLeft': 0}}>
                        {
                        this.state.yourReports.map(report => 
                            <ReportCard report={report} key={report.id}/>
                        )}
                    </ul>
                </div>

                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Reports on you</h2>
                    <ul className = 'card-body'
                        style={{'list-style': 'none'}, {'paddingLeft': 0}}>
                        {
                            this.state.reportsOnYou.map(report => 
                            <ReportCard report={report} key={report.id}/>
                        )}
                    </ul>
                </div>

                <h2>Submit a report</h2>
                <ReportForm userId={1} empIds={[1, 2]} submitReport={x => this.onSubmitReport(x)}/>
            
            </div>
            </>
        );
    }
}