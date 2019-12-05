import React, { Component } from 'react';
import Employee from './Employee';
import API from "./api";
import { employee } from "../models/employee"

import { Redirect } from 'react-router-dom'

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state ={
      currentEmp: null,
      isLoading: true,
      updating: false
    }

  }

  updateEmployee(fname, lname, address, phone) {
    console.log("Update Employee");
    this.setState(prevState => ({
      fname,
      lname,
      address,
      phone,
      updating: true
    }));
  }

  endUpdate = (fname, lname, address, phone) => {
    console.log("End Update");
    let newEmp = this.state.currentEmp

    newEmp.fname = fname;
    newEmp.lname = lname;
    newEmp.address = address;
    newEmp.phone = phone;

    this.setState(prevState => ({
      currentEmp: newEmp,
      updating: false
    }));
  }

  sendEmployeeUpdate = () => {

    let requestBody = {
      "fname": this.state.currentEmp.fname,
      "lname": this.state.currentEmp.lname,
      "address": this.state.currentEmp.address,
      "phn_num": this.state.currentEmp.phone
    }

    debugger;

    const response = API.put('/employees/' + window.location.userId + '/profile', requestBody)
    .then((response) => {

      console.log("response")
      debugger;

    })

    alert("Changes Submitted");

  }

  async componentWillMount() {
    
    // Load employee data asynchronously

    //const response = await API.get('employees/2')
    const response = await API.get('employees/' + window.location.userId)
      .then((response) => {
        // Success
        console.log("Successful call to db")

        let contactInfo = response.data.profile.profile;
        let currentEmp = new employee(contactInfo.id, contactInfo.fname, contactInfo.lname, contactInfo.dep_id, contactInfo.position, contactInfo.manager, contactInfo.address, contactInfo.phone, contactInfo.rating, contactInfo.strikes, contactInfo.active);

        this.setState({
          currentEmp,
          isLoading: false
        })

      })
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

    console.log("Finished DB call update");

  }

  render() {

    if(window.location.userId === -1){
      return <Redirect to='/'/>
    }

    const loadingMessage = <span className="d-flex m-auto">Loading...</span>;

    if (this.state.isLoading === true) {

      return (
        <div>
          <h1 className="loading-message auto-margins">
            {loadingMessage}
          </h1>
        </div>
      );

    } else {

      return (
        <div>
          <Employee emp={this.state.currentEmp} titleName={this.state.currentEmp.fname} isLoading={this.state.isLoading} updating={this.state.updating} updateEmployee={x => this.updateEmployee(x)} endUpdate={this.endUpdate} />
          <button type="button" className="btn btn-success mt-3" onClick={this.sendEmployeeUpdate}>Submit Changes</button>
        </div>
      );
    }
  }
}

export default HomePage;