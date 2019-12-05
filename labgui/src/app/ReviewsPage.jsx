import React, { Component } from 'react';
import { Review } from '../models/PerfReview';
import ReviewCard from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import {ReviewsRepository} from '../api/reviewRepository'
import { Redirect } from 'react-router-dom';

var apiBaseUrl = 'http://35.238.147.205:3000';
export class ReviewsPage extends Component {

    onSubmitReview(rev) {
        this.setState(prevState => {
            prevState.yourReviews.push(rev);
            return prevState;
        })
        this.reviewsRepo.addReview(rev);
    }
    

    state = {
        yourReviews: [],
        reviewsOnYou: [],
        reviewChoices: []
    }

    reviewsRepo = new ReviewsRepository()

    getChoices() {
        let choices = [];
        this.reviewsRepo.getChoices()
        .then(x => {
            x.forEach(employee => {
                if (employee.id != window.location.userId){
                    choices.push([employee.id, employee.fname +" "+ employee.lname])
                    this.setState({reviewChoices: choices})
                }
            })
        })
    }   

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
        // let counter = 0;
        // let avg = 0;
        // console.log("hehhehehehehe");
        // this.state.reviewsOnYou.forEach(rev => {
        //     console.log(rev.rating);
        //     avg = avg + rev.rating;
        //     counter = counter + 1;
        // });
        // // console.log("here")
        // // console.log(avg);
        // return avg = avg/counter;
        // //return avg = avg / counter;
        
        
    }

    getEmp()
    {
        var list = this.reviewsRepo.getEmpInfo();
        console.log(list);
        //let promise = new Promise((res, rej) => {
        let people = null;
        let revOnYou = this.state.reviewsOnYou;
        let yourRevs = this.state.yourReviews;
        list.then(res =>{
            for(let i = 0; i < yourRevs.length; i++)
            {
                for(let j = 0; j < res.length; j++)
                {
                    if(yourRevs[i].byId === res[j].id)
                    {
                        let name = res[j].fname + ' ' + res[j].lname;
                        
                        yourRevs[i].byId = name;
                        console.log(yourRevs[i].byId);
                    }
                }
                //this.reviewsRepo.getEmpInfo(yourReviews[i].byId);
    
            }
            for(let i = 0; i < revOnYou.length; i++)
            {
                for(let j = 0; j < res.length; j++)
                {
                    if(revOnYou[i].byId === res[j].id)
                    {
                        console.log("this");
                        let name = res[j].fname + ' ' + res[j].lname;
                        revOnYou[i].byId = name;
                    }
                }
                //this.reviewsRepo.getEmpInfo(yourReviews[i].byId);
    
            }
        })
        this.setState({reviewsOnYou:revOnYou, yourReviews:yourRevs});
    
    }



        componentDidMount() {
        //emp_id, review, score, creation_date

        // this.reviewsRepo.login()
        // .then (x => {
        //         this.reviewsRepo.login();
        // })
        let currentComponent = this;
        this.reviewsRepo.getReviewHistory(currentComponent)
        .then(x => {console.log("getReviewHistory returns"); console.log(x)})
        console.log("state after getReviewHistory")
        console.log(this.state)
        this.reviewsRepo.getYourReviewHistory(currentComponent)
        .then( () => {
        console.log("state after getYourReviewHistory")
        console.log(this.state)})
        this.getAvgRating();
        this.getEmp();
        this.getChoices();
    }

    render() {
        if(window.location.userId === -1){
            return <Redirect to='/'/>
          }

        return (
            <>
            <div className='container'>
                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Your performance reviews</h2>
                    <ul className = 'card-body' 
                        style={{'list-style': 'none'}, {'paddingLeft': 0}}>
                        {
                        this.state.yourReviews.map(review => 
                            <ReviewCard review={review} key={review.id} type='on'/>
                        )}
                    </ul>
                </div>
                <div className='card mt-3 bg-light  text-black'>
                    <h2>
                        <div>
                            <span>Your average rating: </span>
                            <span> 
                                <span className={this.getAvgRating == 1 ? 'text-danger'
                                    : this.getAvgRating == 5 ? 'text-success'
                                        :'text-warning'}>
                                    {this.getAvgRating}
                                </span>
                            </span>
                        </div>
                    </h2>
                </div>
                <div className='card mt-3 bg-info  text-white'>
                    <h2 className='card-header'>Reviews on you</h2>
                    <ul className = 'card-body'
                        style={{'list-style': 'none'}, {'paddingLeft': 0} }>
                        {
                            this.state.reviewsOnYou.map(review => 
                            <ReviewCard review={review} key={review.id} type='by'/>
                        )}
                    </ul>
                </div>

                <h2>Submit a performance review</h2>
                <ReviewForm userId={1} reviewChoices={this.state.reviewChoices} submitReview={x => this.onSubmitReview(x)}/>
            
            </div>
            </>
        );
    }
}