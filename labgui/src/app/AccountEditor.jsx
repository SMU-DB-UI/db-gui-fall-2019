import React, {Component} from 'react';
import { Department, Phone } from '../models'
import { PhoneList } from './PhoneList';
import { PhoneEditor } from './PhoneEditor';
import './AccountEditor.css';

export class AccountEditor extends Component {

    departments = [
        new Department(1, 'HR'),
        new Department(2, 'Marketing'),
        new Department(3, 'Accounting'),
        new Department(4, 'IT'),
    ];

    state = {
        fname: 'John',
        lname: 'Lawrimore',
        manager: 'Mark Fontenot',
        departmentId: 4,
        isAdmin: true,
        position: 'Intern',
        address: '1234 Dyer st.',
        phoneNumbers: [
            new Phone('214-555-1212', 'Fax'),
        ]
    };

    initState() {
        //TODO
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

    onSubmit() {
        //TODO
        /* /employees:/emp_id/profile/put */

    }

    render() {
        return (
            <div className='acct-editor'>
            <div className='App-header'>
            <h1 className='App-header'>
                Employee Account Editor For {this.state.fname + " " + this.state.lname}
            </h1>
            </div>

            <div>
            <form>
               
               {/* first and last name */}
                <div className='form-group row mt-3 mb-3 justify-content-center'>                
                        <label htmlFor="fname">
                            First name
                        </label>
                        <input type="text"
                                id = "fname"
                                name ="fname"
                                className = 'form-control col-4 ml-4'
                                value={this.state.fname} 
                                onChange={e => this.setState({fname: e.target.value})} />

                        <label htmlFor="lname" className='ml-4'>
                            Last name
                        </label>

                        <input type="text"
                                id = "lname"
                                name ="lname"
                                className = 'form-control col-4 ml-4'
                                value={this.state.lname} 
                                onChange={e => this.setState({lname: e.target.value})} />
                </div>

                {/* manager and position */}
                <div className="form-group row mt-4 mb-3 justify-content-center" 
                    style={{ 'display': this.state.isAdmin ? 'flexbox': 'none' }}>
                
                        <label htmlFor="manager">
                            Manager
                        </label>

                        <input type="manager"
                                id = "manager"
                                name ="manager"
                                className = 'form-control col-4 ml-4'
                                value={this.state.manager} 
                                onChange={e => this.setState({manager: e.target.value})} />

                    <label htmlFor="position" className='ml-4'>
                        Position
                    </label>

                    <input type="text"
                            id = "position"
                            name ="position"
                            className = 'form-control col-4 ml-4'
                            value={this.state.position} 
                            onChange={e => this.setState({position: e.target.value})} />
                </div>

                {/* department and address */}
                <div className="form-group row mt-4 mb-3 justify-content-center"
                        style={{ 'display': this.state.isAdmin ? 'flexbox': 'none' }}>
                    <label htmlFor="departmentId">
                        Department
                    </label>

                    <select type="text"
                            id = "departmentId"
                            name ="departmentId"
                            className = "form-control col-4 ml-4"
                            value={this.state.departmentId} 
                            onChange={e => this.setState({departmentId: e.target.value})} >
                    <option></option>
                    {
                        this.departments.map(x => <option value={x.id} key={x.id}>{x.name}</option>)
                        //or (department, index) => <option key = index> ... </option>
                    }
                    </select>

                    <label htmlFor="address"  className='ml-4'>
                        Address
                    </label>

                    <input type="address"
                            id = "address"
                            name ="address"
                            className = "form-control col-4 ml-4"
                            value={this.state.address} 
                            onChange={e => this.setState({address: e.target.value})} />
                </div>

                {/* just address for employee view only */}
                <div className="form-group row mt-4 mb-3" 
                    style={{ 'display': this.state.isAdmin ? 'none': 'flexbox' }}>
                    
                    <label htmlFor="address"  className='ml-4'>
                        Address
                    </label>

                    <input type="address"
                            id = "address"
                            name ="address"
                            className = "form-control col-10 ml-4"
                            value={this.state.address} 
                            onChange={e => this.setState({address: e.target.value})} />
                </div>

                <label htmlFor='phoneList'>
                    Current Phones
                </label>
                <PhoneList phoneNumbers={this.state.phoneNumbers} className='col-6'/>
                <label htmlFor='phoneEditor' className='mt-3'>
                    Add/remove a phone
                </label>
                <PhoneEditor onPhoneAdded={x => this.onPhoneAdded(x)} 
                            phoneNumbers={this.state.phoneNumbers} 
                            onPhoneRemoved={x => this.onPhoneRemoved(x)}/>

                <a href="employeeId/writeUps"
                    style={{ 'display': this.state.isAdmin ? 'flexbox': 'none' }}>
                    Edit Employee Write Ups
                </a>

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
            </form>
            </div>
            </div>);
    }
}