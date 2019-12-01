import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { employee } from './models/employee';

class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fname: this.props.fname,
            lname: this.props.lname,
            address: this.props.address,
            phone: this.props.phone
        }
    }

    handleClick() {

        if (this.props.updating === false) {
            this.props.updateEmployee(this.state.fname, this.state.lname, this.state.address, this.state.phone);
            this.setState({
                updating: true
            });
        } else {
            this.props.endUpdate();
            this.setState({
                updating: false
            });
        }
    }

    render() {

        console.log("Employee Render Method");

        let userInfo;

        if (this.props.updating) {

            userInfo = <div>
                <p>
                    <strong>First Name: </strong>
                    <input type="text"
                        id="fname"
                        name="First Name"
                        className="no-margins"
                        value={this.state.fname}
                        onChange={e => this.setState({ fname: e.target.value })} />
                </p>
                <p>
                    <strong>Last Name: </strong>
                    <input type="text"
                        id="lname"
                        name="Last Name"
                        className="no-margins"
                        value={this.state.lname}
                        onChange={e => this.setState({ lname: e.target.value })} />
                </p>
                <p>
                    <strong>Address: </strong>
                    <input type="text"
                        id="address"
                        name="Address"
                        className="no-margins"
                        value={this.state.address}
                        onChange={e => this.setState({ address: e.target.value })} />
                </p>
                <p>
                    <strong>Phone: </strong>
                    <input type="text"
                        id="phone"
                        name="Phone Number"
                        className="no-margins"
                        value={this.state.phone}
                        onChange={e => this.setState({ phone: e.target.value })} />
                </p>
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
                        {this.props.fname}
                    </h1>

                    <div className="auto-margins-right">
                        {/* <button width="50" height="50" onclick={this.props.updateEmployee(this.props.fname, this.props.lname, this.props.address, this.props.phone)}> */}
                        <button width="50" height="50" onClick={() => this.handleClick()}>
                            <img src={require('./assets/pencil.jpg')} width="50" height="50" alt="Pencil Image" />
                        </button>
                    </div>

                </div>

                <div>
                    {userInfo}
                </div>
            </div>

        );

    }
}

export default Employee;