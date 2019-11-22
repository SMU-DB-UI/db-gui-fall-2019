import React, { Component } from 'react';
import { Report } from '../models/Report';
import {ReportCard} from './ReportCard';
import { ReportForm } from './ReportForm';
import {ReportsHistory, ReportsRepository} from '../api/reportsRepository'

export class ReportsPage extends Component {

    onSubmitReport(rep) {
        this.setState(prevState => {
            prevState.yourReports.push(rep);
            return prevState;
        })
        //TODO put report to DB
    }

    state = {
        yourReports: [
            new Report(1, 1, 2, "disgusting", 'Oct-15-2019', 1, 5)
        ],
        reportsOnYou: [
            new Report(1, 2, 1, "awful", 'Oct-16-2019', 0, 5)
        ]
    }

    reportsRepo = new ReportsRepository()

    componentWillMount() {
        this.reportsRepo.login();

        // this.reportsRepo.getReportHistory(1)
        // .then ( report => {
        //     if (report) {
        //     this.setState({yourReports: [report]})
        //     }
        // })
        // .catch (x => alert(x))
    }

    componentDidMount() {
        console.log(this.state.yourReports)
    }

    render() {
        return (
            
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

        );
    }
}