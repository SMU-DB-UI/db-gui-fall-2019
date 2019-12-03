import React, { Component } from 'react';
import Employee from './Employee';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import API from "./api";
import { employee } from "../models/employee"

class HomePage extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   fname: null,
    //   lname: null,
    //   address: null,
    //   phone: null,
    //   isLoading: true,
    //   updating: false
    // };

    this.state = {//Use this incase the db is down
      fname: "Mark",
      lname: "Fontenot",
      address: "123 SMU Lane",
      phone: "123-456-7890",
      isLoading: false,
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

  endUpdate = () => {
    console.log("End Update");
    this.setState(prevState => ({
      updating: false
    }));
  }

  async componentWillMount() {
    // Load employee data asynchronously

    const response = await API.get('employees/ ' + this.props.empId + '/profile')
      .then((response) => {
        // Success
        console.log("Successful call to db")
        let contactInfo = response.data.contactinfo.contactinfo;

        let fname = contactInfo.fname;
        let lname = contactInfo.lname;
        let address = contactInfo.address;
        let phone = contactInfo.phone;

        this.setState({
          fname,
          lname,
          address,
          phone,
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
          <Employee fname={this.state.fname} lname={this.state.lname} address={this.state.address} phone={this.state.phone} isLoading={this.state.isLoading} updating={this.state.updating} updateEmployee={x => this.updateEmployee(x)} endUpdate={this.endUpdate} />
        </div>
      );

    }

  }

}

export default HomePage;