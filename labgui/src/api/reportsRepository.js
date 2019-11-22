import axios from 'axios';
import { thisExpression } from '@babel/types';


export class ReportsRepository {
    url = 'http://35.223.74.36:3000'
    session = {
        Headers: {
            Cookie: 'connect.sid=s%3AtEcov4TELtJYgPrDxACW7iA_N1tAKr8J.7sQjkOYo%2Bhotmfgh6pIF3LHoYMxBM%2FzrljRWYWBWsTc'
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
            return axios.get(`${this.url}/reports/${userId}`, this.session)
            .then(x => console.log(x))
            .catch(x => alert(x));
        //     }
        // return new Promise((resolve, reject) => {
        //     axios.get(`${this.url}/:${userId}/profile/report_history`, this.config)
        //     .then(x => resolve(x.data))
        //     .catch(x => alert(x));
        // });
    }


}