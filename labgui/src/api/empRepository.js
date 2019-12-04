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

    addEmployee(empInfo) {
        axios.post(`${this.url}/employees`, empInfo, this.session)
        .catch(x =>  alert('Something went wrong'));
    }

}