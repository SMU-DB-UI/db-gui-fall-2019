import axios from 'axios';
import { thisExpression } from '@babel/types';


export class ReportsRepository {
    url = 'http://35.223.74.36:3000'
    session = {

     
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
                    this.session = x.data.session;
                    console.log("logged in")
                    console.log(x);})
                .catch(x => console.log("failed to log in", x));
    }

    getReportHistory(userId) {
        return new Promise((resolve, reject) => {
            return axios.get(`${this.url}/reports/1`, this.session)
            .then(x => console.log(x))//resolve(x.data))
            .catch(x => alert(x));
        });

        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/:${userId}/profile/report_history`, this.config)
            .then(x => resolve(x.data))
            .catch(x => alert(x));
        });
    }


}