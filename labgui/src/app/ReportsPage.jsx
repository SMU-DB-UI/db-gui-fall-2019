import React, { Component } from 'react';
import { Report } from '../models/Report';
import {ReportCard} from './ReportCard';
import { ReportForm } from './ReportForm';

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
            new Report(1, 1, 2, "disgusting", 1, 5)
        ],
        reportsOnYou: [
            new Report(1, 2, 1, "awful", 0, 5)
        ]
    }

    render() {
        return (
            <div className='container'>
                <h2>Your reports</h2>
                <ol>
                    {
                    this.state.yourReports.map(report => 
                        <ReportCard report={report}/>
                    )}
                </ol>

                <h2>Reports on you</h2>
                <ol>
                    {
                        this.state.reportsOnYou.map(report => 
                        <ReportCard report={report}/>
                    )}
                </ol>

                <h2>Submit a report</h2>
                <ReportForm userId={1} empIds={[1, 2]} submitReport={x => this.onSubmitReport(x)}/>
            </div>

        );
    }
}