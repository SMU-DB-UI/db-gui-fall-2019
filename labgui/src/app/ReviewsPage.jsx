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
            new Review(1, 1, 2, "disgusting",5, 'Oct-15-2019'),
            new Review(2, 1, 2, "ok", 1,'Oct-15-2019'),
            new Review(3, 1, 2, "good",3, 'Oct-15-2019'),
        ],
        reviewsOnYou: [
            new Review(4, 2, 1, "awful",4, 'Oct-16-2019')
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