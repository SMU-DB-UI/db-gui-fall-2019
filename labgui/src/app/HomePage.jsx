import React, { Component } from 'react';
import Employee from './Employee';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import API from "./api";
import { employee } from "../models/employee"

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
    debugger;
    console.log("End Update");
    let newEmp = this.state.currentEmp

    newEmp.fname = fname

    this.setState(prevState => ({
      currentEmp: newEmp,
      updating: false
    }));
  }

  async componentWillMount() {
    // Load employee data asynchronously

    const response = await API.get('employees/2')
    //const response = await API.get('employees/' + window.location.userId)
      .then((response) => {
        // Success
        console.log("Successful call to db")

        let contactInfo = response.data.profile.profile;
        let currentEmp = new employee(contactInfo.id, contactInfo.fname, contactInfo.lname, contactInfo.dep_id, contactInfo.position, contactInfo.manager, contactInfo.address, contactInfo.phone, contactInfo.rating, contactInfo.strikes, contactInfo.active);

        this.setState({
          currentEmp,
          isLoading: false
        })

        // let id = contactInfo.id;
        // let fname = contactInfo.fname;
        // let lname = contactInfo.lname;
        // let dep_id = contactInfo.deptId;
        // let position = contactInfo.position;
        // let manager = contactInfo.manager;
        // let address = contactInfo.address;
        // let phone = contactInfo.phone;
        // let rating = contactInfo.rating;
        // let strikes = contactInfo.strikes;
        // let active = contactInfo.active;

        // this.setState({
        //   id,
        //   fname,
        //   lname,
        //   dep_id,
        //   position,
        //   manager,
        //   address,
        //   phone,
        //   rating,
        //   strikes,
        //   active,
        //   isLoading: false
        // })

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
        </div>
      );
    }
  }
}

export default HomePage;