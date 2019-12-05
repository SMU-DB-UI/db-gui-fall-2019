import React, { Component } from 'react';
import { employee } from '../models/employee';

const labels = ["First Name", "Last Name", "Address", "Phone"];
const departments = ['Computer Science', 'Mechanical Engineering', 'Marketing', 'Human Resources', 'Sanitation'];

class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fname: this.props.emp.fname,
            lname: this.props.emp.lname,
            address: this.props.emp.address,
            phone: this.props.emp.phone
        }

        // this.state = {
        //     fname: this.props.fname,
        //     lname: this.props.lname,
        //     address: this.props.address,
        //     phone: this.props.phone
        // }
    }

    handleClick() {

        if (this.props.updating === false) {
            this.props.updateEmployee(this.state.fname, this.state.lname, this.state.address, this.state.phone);

        } else {
            this.props.endUpdate(this.state.fname, this.state.lname, this.state.address, this.state.phone);
        }
    }

    render() {

        console.log("Employee Render Method");

        let userInfo;

        if (this.props.updating) {


            userInfo = <div>

                {Object.entries(this.state).map(([key, value], i) => (
                    <p key={key}>
                        <strong>{labels[i]}: </strong>
                        <input type="text"
                            id={key}
                            name={labels[i]}
                            className="no-margins"
                            value={value}
                            onChange={e => this.setState({ [key]: e.target.value })} />

                    </p>
                ))}

            </div>

        } else {

            userInfo = <div>
                <p><strong>First Name: </strong>{this.state.fname}</p>
                <p><strong>Last Name: </strong>{this.state.lname}</p>
                <p><strong>Address: </strong>{this.state.address}</p>
                <p><strong>Phone: </strong>{this.state.phone}</p>
            </div>;
        }

        return (

            <div className="emp-details gray-border">
                <div className="name-block horizontal auto-margins width-100 d-flex">
                    <h1>
                        {this.props.titleName}
                    </h1>

                    <div className="auto-margins-right">
                        {/* <button width="50" height="50" onclick={this.props.updateEmployee(this.props.fname, this.props.lname, this.props.address, this.props.phone)}> */}
                        <button width="50" height="50" onClick={() => this.handleClick()}>
                            <img src={require('../assets/pencil.jpg')} width="50" height="50" alt="Pencil Image" />
                        </button>
                    </div>

                </div>

                <div>
                    {userInfo}
                    <p><strong>Department: </strong>{departments[(this.props.emp.dep_id)-1]}</p>
                    <p><strong>Position: </strong>{this.props.emp.position}</p>
                    <p><strong>Manager: </strong>{this.props.emp.manager}</p>
                    <p><strong>Rating: </strong>{this.props.emp.rating}</p>
                    <p><strong>Strikes: </strong>{this.props.emp.strikes}</p>
                </div>
            </div>

        );

    }
}

export default Employee;