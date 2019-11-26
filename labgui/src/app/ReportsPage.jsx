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
        this.reportsRepo.getReportHistory(1)
        .then (x => {
            this.setState({yourReports: x.yourReports, reportsOnYou: x.reportsOnYou});
            this.state.yourReports.forEach(rep => {
                let repInf = this.reportsRepo.getEmpInfo(rep.id)
                rep.byId = repInf.by;
                rep.forId = repInf.for;
            });
            this.state.reportsOnYou.forEach(rep => {
                let repInf = this.reportsRepo.getEmpInfo(rep.id)
                rep.byId = repInf.by;
                rep.forId = repInf.for;
            });
        })
    }

    componentDidMount() {
        this.reportsRepo.login()
        .then (x => {
                this.reportsRepo.login();
        })
        // this.setReportInfo()


        console.log(this.state.yourReports)
    }

    render() {
        return (
            <>
        <MuiThemeProvider>
        <AppBar title="Reports"/>
        </MuiThemeProvider>

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