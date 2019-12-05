import axios from 'axios';
import { thisExpression } from '@babel/types';


export class EmpRepository {
    url = 'http://35.238.147.205:3000'
    session = {
        withCredentials: false,
        Headers: {
            'Authorization':'please',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
     
    }

    getManagers() {
        return axios.get(`${this.url}/employees/managers`, this.session)
            .then (x => {return x.data.managers})
            .catch (x => alert('Issue'));
    }

    addEmployee(empInfo) {
        return axios.post(`${this.url}/employees`, empInfo, this.session)
            .then(x => console.log(x))
            .catch(x =>  alert('Something went wrong'));
    }

}