import React, { Component } from 'react';
import { Review } from '../models/PerfReview';
import ReviewCard from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import {ReviewsRepository} from '../api/reviewRepository'
import { Redirect } from 'react-router-dom';

var apiBaseUrl = 'http://35.238.147.205:3000';
export class ReviewsPage extends Component {

    onSubmitReview(rev) {

        this.reviewsRepo.addReview(rev, rev.forId)
        .then( 
            this.setState(prevState => {
                prevState.yourReviews.push(rev);
                return prevState;
            })
        )
        .catch(x => {
            console.log("Error adding"); 
            console.log(x); 
            if (x.response.status == 400) {
                alert("Error! You do not manage this user!");
            }
        } 
        )
    }
    

    state = {
        yourReviews: [],
        reviewsOnYou: [],
        reviewChoices: [],
        averageRating: 0
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
            console.log(this.state.reviewsOnYou)
            this.getAvgRating();
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
            // this.getAvgRating()
        })
    }

    getAvgRating(){
        let counter = 0;
        let avg = 0;
        console.log("hehhehehehehe");
        this.state.reviewsOnYou.forEach(rev => {
            console.log(rev.rating);
            avg = avg + rev.rating;
            counter = counter + 1;
        });
        // console.log("here")
        // console.log(avg);
        avg = avg /counter;
        this.setState({averageRating:avg});
        // //return avg = avg / counter;
        // let total = 0;
        // console.log("totalling")
        //     for (let i = 0; i < this.state.reviewsOnYou.length; i++)
        //     {
        //         total = total + this.state.reviewsOnYou[i].rating;
        //         console.log("total: " + total)
        //     }
        //     let average = total/this.state.reviewsOnYou.length;

        //     this.setState({averageRating: average})        
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
            this.getAvgRating();
            console.log("state after getYourReviewHistory")
        console.log(this.state)}
        )
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
                            <ReviewCard review={review} key={review.id + review.review} type='on'/>
                        )}
                        <h3 style={{'display': this.state.yourReviews.length <= 0 ? 'block' : 'none'}}>
                            <span className='text-white  badge badge-success' >No Reviews Found</span>
                        </h3>
                    </ul>
                </div>
                <div className='card mt-3 bg-light  text-black'>
                    <h2>
                        <div>
                            <span>Your average rating: </span>
                            <span> 
                                <span className={this.state.averageRating == 1 ? 'text-danger'
                                    : this.state.averageRating == 5 ? 'text-success'
                                        :'text-warning'}>
                                    {this.state.averageRating}
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
                        <h3 style={{'display': this.state.reviewsOnYou.length <= 0 ? 'block' : 'none'}}>
                            <span className='text-white  badge badge-success' >No Reviews Found</span>
                        </h3>
                    </ul>
                </div>

                <div style={{'display': (parseInt(window.location.userId) <= 3 && parseInt(window.location.userId) >= 1) ? 'block' : 'none'}}>
                    <h2>Submit a performance review</h2>
                    <ReviewForm userId={window.location.userId} 
                                reviewChoices={this.state.reviewChoices} 
                                submitReview={x => this.onSubmitReview(x)}/>
                </div>
            </div>
            </>
        );
    }
}