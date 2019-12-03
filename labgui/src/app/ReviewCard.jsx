import React, { Component } from 'react';
import { Review } from '../models/PerfReview';
import './ReportCard.css'

export const ReviewCard = (props) => {
    return (
        <li className='mt-3 mb-3 row container' style={{'list-style': 'none'}}>
            <h4 className='col-3 bg-none mt-3 mr-1'>
                <div className=''>
                    {props.review.date}
                </div>
            </h4>
            <div className='card bg-light col text-dark'>
                <div className='card-header'>
                <h3>
                    <div>
                        <span className= 'float-left'>Report by: {props.review.byId}</span>
                        <span className = 'float-right'>Rating: 
                            <span className={props.review.rating == 1 ? 'text-danger'
                                : props.review.rating == 5 ? 'text-success'
                                    :'text-warning'}>
                                {props.review.rating}
                            </span>
                        </span>
                    </div>
                    </h3>
                </div>
                <div className='card-body bg-light'>
                    <div className = 'card-text text-left'>{props.review.reviewText}</div>
                </div>
            </div>
        </li>
    );
}