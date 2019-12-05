import axios from 'axios';
import {Review} from '../models/PerfReview'
import { thisExpression } from '@babel/types';


export class ReviewsRepository {
    url = 'http://35.238.147.205:3000'
    session = {
        withCredentials: false,
        Headers: {
            'id':window.location.userId,
            'Authorization':'please',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
     
    }



    getReviewHistory(currentComponent) {
      ///employees/'+window.location.userId+'/profile/performance_reviews
            return axios.get(`${this.url}/employees/${window.location.userId}/profile/performance_reviews`, {headers: {"id":window.location.userId}})
            .then(function (response) {
              console.log(response);
              if(response.status == 200){
               if (response.data.message == "succeed") {
                 console.log("Got perf reviews");

                 response.data.reviews.forEach((item) =>{
                  console.log(item);
                 var rev = new Review(item.id, item.by_emp_id, item.emp_id,item.review,item.score,item.creation_date);
                 console.log(rev);
                 currentComponent.setState(prevState => {
                     prevState.reviewsOnYou.push(rev);
                     return prevState;
                 })
             });
             }
             }
              else{
                console.log("Error getting perf reviews");
              }
            })
            .catch(function (error) {
              console.log(error);
            });

    }

    getYourReviewHistory(currentComponent) {
      ///employees/'+window.location.userId+'/profile/performance_reviews
            return axios.get(`${this.url}/employees/manager/perf_reviews`, {headers: {"id":window.location.userId}})
            .then(function (response) {
              //console.log(response);
              if(response.status == 200){
               if (response.data.message == "succeed") {
                 console.log("Got perf reviews");
                 response.data.reviews.forEach((item) =>{
                 var rev = new Review(item.id, window.location.userId, item.emp_id,item.review,item.score,item.creation_date);
                 //console.log(rev);
                 currentComponent.setState(prevState => {
                     prevState.yourReviews.push(rev);
                     return prevState;
                 })
             });
             }
             }
              else{
                console.log("Error getting perf reviews");
              }
            })
            .catch(function (error) {
              console.log(error);
            });

    }

    getEmpInfo() {
        return axios.get(`${this.url}/employees`, {headers: {"id":window.location.userId}})
        .then(x => {
          //console.log(x.data.employees);
          return x.data.employees;
        })
        .catch((error) => {
            // Error
            if (error.response) {
              /*
               * The request was made and the server responded with a
               * status code that falls out of the range of 2xx
               */
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              /*
               * The request was made but no response was received, `error.request`
               * is an instance of XMLHttpRequest in the browser and an instance
               * of http.ClientRequest in Node.js
               */
              console.log(error.request);
            } else {
              // Something happened in setting up the request and triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }

    addReview(rev) {
      //review, score, creation_date
      var payload={
        "review":rev.reviewText,
        "score":rev.rating,
        "creation_date":rev.date
      }
      console.log(window.location.userId);
        return axios.post(`${this.url}/employees/5/profile/performance_reviews`, payload, {headers: {"id":window.location.userId}})
        .then(x => console.log(x))
        .catch((error) => {
            // Error
            if (error.response) {
              /*
               * The request was made and the server responded with a
               * status code that falls out of the range of 2xx
               */
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              /*
               * The request was made but no response was received, `error.request`
               * is an instance of XMLHttpRequest in the browser and an instance
               * of http.ClientRequest in Node.js
               */
              console.log(error.request);
            } else {
              // Something happened in setting up the request and triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }


}