import axios from 'axios';
import { thisExpression } from '@babel/types';


export class ReportsRepository {
    url = 'http://35.238.147.205:3000'
    session = {
        withCredentials: false,
        Headers: {
            'Authorization':'please',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
     
    }
        // headers: {
        //     Authorization: 0,
        //     session: {
        //         active: true
        //     }
        // },
        // session: {
            
        // }
    // }

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

    getReportHistory(userId) {
            return axios.get(`${this.url}/employees/${userId}/profile/report-history`, this.session)
            .then()
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

    getEmpInfo(repId) {
      console.log("in getEmpInfo")
        return axios.get(`${this.url}/reports/${repId}/profiles`, this.session)
        .then(x => {console.log("EmpInfo");console.log(x); return x.data.profiles})
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

    addReport(rep) {
        return axios.post(`${this.url}/reports`, rep, this.session)
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