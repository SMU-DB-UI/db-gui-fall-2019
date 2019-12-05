import React, { Component } from 'react';
import { Review } from '../models/PerfReview';
import './ReportCard.css'
import axios from 'axios';

var apiBaseUrl = 'http://35.238.147.205:3000';
class ReviewCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.review.forId,
            userName: null
        }
    }

    async getEmpName(){
        axios.get((apiBaseUrl + '/employees/' + this.state.id), )
            .then(res => {
                this.setState({
                    userName: res.data.profile.profile.fname
                })
            })
    }

    componentDidMount() {
        this.getEmpName();
    }

    render() {

        if (this.state.userName === null) {
            return (
                <div>Loading...</div>
            )
        } else {

            return (
                <li className='mt-3 mb-3 row container' style={{ 'list-style': 'none' }}>
                    <h4 className='col-3 bg-none mt-3 mr-1'>
                        <div className=''>
                            {this.props.review.date}
                        </div>
                    </h4>
                    <div className='card bg-light col text-dark'>
                        <div className='card-header'>
                            <h3>
                                <div>
                                    <span className='float-left' style={{'display': this.props.type == 'by' ? 'inline' : 'none'}}>Review by: {this.state.userName}</span>
                                    <span className='float-left' style={{'display': this.props.type == 'on' ? 'inline' : 'none'}}>Review on: {this.state.userName}</span>
                                    <span className='float-right'>Rating:
                            <span className={this.props.review.rating == 1 ? 'text-danger'
                                            : this.props.review.rating == 5 ? 'text-success'
                                                : 'text-warning'}>
                                            {this.props.review.rating}
                                        </span>
                                    </span>
                                </div>
                            </h3>
                        </div>
                        <div className='card-body bg-light'>
                            <div className='card-text text-left'>{this.props.review.reviewText}</div>
                        </div>
                    </div>
                </li>
            );
        }
    }
}

export default ReviewCard;