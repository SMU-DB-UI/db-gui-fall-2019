import React, { Component } from 'react';
import { Report } from '../models/Report';
import { Card } from 'material-ui';

export class ReportForm extends Component {

    onSubmit() {
        let report = new Report(0, 
                        this.state.fromId, 
                        this.state.toId, 
                        this.state.comment,
                        'Nov-16-2019', 
                        this.state.status, 
                        this.state.severity);
        this.setState({
            fromId: this.props.userId,
            toId:0,
            status:0,
            severity:0,
            comment:''});
        this.props.submitReport(report);
    }

    state = {
        fromId: this.props.userId,
        toId:0,
        status:0,
        severity:0,
        comment:''
    }

    render() {
        return (
            <form>
                <div className='card'>
                    <h3><div className='card-header bg-danger '>Report</div></h3>
                    <div className='card-body'>
                        <div className='form-row'>
                            <div className='col-8'>
                                <label htmlFor='to'>
                                    Select an employee
                                </label>
                                <select type='text'
                                        id='to'
                                        name='to'
                                        className = 'form-control'
                                        value={this.state.toId}
                                        onChange={e => this.setState({toId: e.target.value})}>
                                <option></option>
                                {
                                    this.props.reportChoices.map(
                                        x => 
                                        <option value={x[0]} key={x[0]}>{x[1]}</option>
                                    )
                                }               
                                </select>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='select'>
                                    Severity
                                </label>
                                <select type='text'
                                        id='select'
                                        name='select'
                                        className = 'form-control'
                                        value={this.state.severity}
                                        onChange={e => this.setState({severity: e.target.value})}>
                                <option></option>
                                {
                                    [1, 2, 3, 4, 5].map(
                                        x => 
                                        <option value={x} key={x}>{x}</option>
                                    )
                                }               
                                </select>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-12'>
                                <label htmlFor='comment'>
                                    Comment
                                </label>
                                <textarea
                                        rows='4'
                                        id='comment'
                                        name='comment'
                                        className = 'form-control'
                                        value={this.state.comment}
                                        onChange={e => this.setState({comment: e.target.value})}/>
                            </div>
                        </div>

                        <button type='button' 
                                className='btn btn-danger'
                                onClick={() => this.onSubmit()}>
                            Submit report
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}