import axios from 'axios';
import { thisExpression } from '@babel/types';


export class ReviewsRepository {
    url = 'http://35.238.147.205:3000'
    session = {
        withCredentials: false,
        Headers: {
            'Authorization':'please',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
     
    }

    login() {
            return axios.put(`${this.url}/login`, {
                "username":"mfontenot",
                "password":"password"
            },this.session)
                .then(x => {
                    // this.session = x.data.config;
                    console.log("logged in")
                    console.log(x);})
                .catch(x => console.log("failed to log in", x));
    }

    getReviewHistory(userId) {
            return axios.get(`${this.url}/employees/${userId}/profile/review-history`, this.session)
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
        //     }
        // return new Promise((resolve, reject) => {
        //     axios.get(`${this.url}/:${userId}/profile/report_history`, this.config)
        //     .then(x => resolve(x.data))
        //     .catch(x => alert(x));
        // });
    }

    getEmpInfo(revId) {
        return axios.get(`${this.url}/reviews/${revId}/profiles`, this.session)
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

    addReview(rev) {
        return axios.post(`${this.url}/reviews`, rev, this.session)
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