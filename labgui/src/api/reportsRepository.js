import axios from 'axios';

export class ReportsRepository {
    url = 'http://35.223.74.36:3000'
    config = {
        headers: {
            Authorization: 0
        }
    }

    getReportHistory(userId) {
        return axios.get(`${this.url}/:${userId}/profile/report_history/get`, this.config)
        .then(x => resolve(x.data))
        .catch(x => alert(x));
    }


}