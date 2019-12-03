import React, { Component } from 'react';
import { Review } from '../models/PerfReview';
import { Card } from 'material-ui';

export class ReviewForm extends Component {

    onSubmit() {
        let review = new Review(0, 
                        this.state.fromId, 
                        this.state.toId, 
                        this.state.comment,
                        this.state.rating,
                        'Nov-16-2019');
        this.setState({
            fromId: this.props.userId,
            toId:0,
            comment:'',
            rating: 0});
        this.props.submitReview(review);
    }

    state = {
        fromId: this.props.userId,
        toId:0,
        comment:'',
        rating: 0
    }

    render() {
        return (
            <form>
                <div className='card'>
                    <h3><div className='card-header bg-danger '>Review</div></h3>
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
                                    this.props.empIds.map(
                                        x => 
                                        <option value={x} key={x}>{x}</option>
                                    )
                                }               
                                </select>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='select'>
                                    Rating
                                </label>
                                <select type='text'
                                        id='select'
                                        name='select'
                                        className = 'form-control'
                                        value={this.state.rating}
                                        onChange={e => this.setState({rating: e.target.value})}>
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
                            Submit review
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}