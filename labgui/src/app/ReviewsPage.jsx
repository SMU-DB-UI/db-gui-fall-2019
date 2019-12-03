import React, { Component } from 'react';
import { Review } from '../models/PerfReview';
import {ReviewCard} from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import {ReviewsRepository} from '../api/reviewRepository'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export class ReviewsPage extends Component {

    onSubmitReview(rev) {
        this.setState(prevState => {
            prevState.yourReviews.push(rev);
            return prevState;
        })
        this.reviewsRepo.addReview(rev);
    }

    state = {
        yourReviews: [
            new Review(1, 1, 2, "Develops successful administrative strategies such as [task] that led to [results]",5, 'Oct-15-2019'),
            new Review(2, 1, 2, "Continuously examines administrative effectiveness and seeks better procedures such as [tasks]", 4,'Oct-15-2019'),
            new Review(3, 1, 2, "Shows a sincere interest in employees and the solutions to their problems",3, 'Oct-15-2019'),
            new Review(3, 1, 2, "Always submits work late.",1, 'Oct-15-2019'),

        ],
        reviewsOnYou: [
            new Review(4, 2, 1, "Effectively communicates expectations",5, 'Oct-16-2019')
        ]
    }

    reviewsRepo = new ReviewsRepository()


    setReviewInfo() {
        this.reviewsRepo.getReviewHistory(1)
        .then (x => {
            this.setState({yourReviews: x.data.yourReviews, reportsOnYou: x.data.reviewsOnYou});
            this.state.yourReports.forEach(rev => {
                let revInf = this.reviewsRepo.getEmpInfo(rev.id)
                rev.byId = revInf.by;
                rev.forId = revInf.for;
            });
            this.state.reviewsOnYou.forEach(rev => {
                let revInf = this.reviewsRepo.getEmpInfo(rev.id)
                rev.byId = revInf.data.by;
                rev.forId = revInf.data.for;
            });
        })
    }

    getAvgRating(){
        let counter = 0;
        let avg = 0;
        this.state.reviewsOnYou.forEach(rev => {
            avg = avg + rev.rating;
            counter = counter + 1;
        });
        console.log("here")
        console.log(avg);
        return avg = avg / counter;
        
    }

    componentDidMount() {
        this.reviewsRepo.login()
        .then (x => {
                this.reviewsRepo.login();
        })


        console.log(this.state.yourReviews)
    }

    render() {
        return (
            <>
            <nav className='navbar-fluid' title='login'>
                <ol className="breadcrumb breadcrumb-light">
                    <li className="breadcrumb-item">Performance Reviews</li>
                </ol>
            </nav>
            <div className='container'>
                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Your performance reviews</h2>
                    <ul className = 'card-body' 
                        style={{'list-style': 'none'}, {'paddingLeft': 0}}>
                        {
                        this.state.yourReviews.map(review => 
                            <ReviewCard review={review} key={review.id}/>
                        )}
                    </ul>
                </div>
                <div className='card mt-3 bg-light  text-black'>
                    <h2>
                        <div>
                            <span>Your average rating: </span>
                            <span> 
                                <span className={this.getAvgRating() == 1 ? 'text-danger'
                                    : this.getAvgRating() == 5 ? 'text-success'
                                        :'text-warning'}>
                                    {this.getAvgRating()}
                                </span>
                            </span>
                        </div>
                    </h2>
                </div>
                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Reviews on you</h2>
                    <ul className = 'card-body'
                        style={{'list-style': 'none'}, {'paddingLeft': 0}}>
                        {
                            this.state.reviewsOnYou.map(review => 
                            <ReviewCard review={review} key={review.id}/>
                        )}
                    </ul>
                </div>

                <h2>Submit a performance review</h2>
                <ReviewForm userId={1} empIds={[1, 2]} submitReview={x => this.onSubmitReview(x)}/>
            
            </div>
            </>
        );
    }
}