import React, {Component} from 'react';
import { Department, Phone } from '../models'
import { PhoneList } from './PhoneList';
import { PhoneEditor } from './PhoneEditor';

export class EmpAccountEditor extends Component {

    state = {
        fname: 'John',
        lname: 'Johnov',
        address: '1234 Dyer st.',
        phoneNumbers: [
            new Phone('214-555-1212', 'Fax'),
            new Phone('817-555-1212', 'notFax')
        ]
    };

    initState() {
        //TODO
    }

    
    onSubmit() {
        //TODO
        /* /employees:/emp_id/profile/put */
    }

    onPhoneAdded(phone){
        this.setState(prevState => {
            prevState.phoneNumbers.push(phone);
            return prevState;
        });
    }

    onPhoneRemoved(phone) {
        this.setState(prevState => {
            prevState.phoneNumbers.forEach((p, i) => {
                if (p.number == phone) {
                    prevState.phoneNumbers.splice(i, 1);
                }
            });
            return prevState;
        });
    }

    render() {
        return (
            <form>
                <h1 className='App-header'>
                    My Account Settings
                </h1>
                <div className="form-group">
                    <label htmlFor="fname">
                        First name
                    </label>

                    <input type="text"
                            id = "fname"
                            name ="fname"
                            className = "form-control" 
                            value={this.state.fname} 
                            onChange={e => this.setState({fname: e.target.value})} />
                </div>

                <div className="form-group">
                    <label htmlFor="lname">
                        Last name
                    </label>

                    <input type="text"
                            id = "lname"
                            name ="lname"
                            className = "form-control" 
                            value={this.state.lname} 
                            onChange={e => this.setState({lname: e.target.value})} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">
                        Address
                    </label>

                    <input type="address"
                            id = "address"
                            name ="address"
                            className = "form-control" 
                            value={this.state.address} 
                            onChange={e => this.setState({address: e.target.value})} />
                </div>

                <label htmlFor='phoneList'>
                    Current Phones
                </label>
                <PhoneList phoneNumbers={this.state.phoneNumbers} />
                <label htmlFor='phoneEditor'>
                    Add/remove a phone
                </label>
                <PhoneEditor onPhoneAdded={x => this.onPhoneAdded(x)} 
                            phoneNumbers={this.state.phoneNumbers} 
                            onPhoneRemoved={x => this.onPhoneRemoved(x)}/>

                <div className = 'row mt-4 mb-4'>
                    <div className="col-3">
                            <button
                                type="button"
                                className="btn btn-success btn-block"
                                onClick={ () => this.onSubmit() }>
                                Submit Changes
                            </button>
                    </div>
                </div>
            </form>);
            
    }
}