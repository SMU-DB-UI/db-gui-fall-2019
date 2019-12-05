import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';


var apiBaseUrl = "http://35.238.147.205:3000";
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      // first_name:'',
      // last_name:'',
      email:'',
      username:'',
      password:''
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.email.length>0 && this.state.password.length>0){
      var payload={
      // "first_name": this.state.first_name,
      // "last_name":this.state.last_name,
      "email":this.state.email,
      "username":this.state.username,
      "password":this.state.password
      //"role":role
      }
      axios.post(apiBaseUrl+'/register', payload)
      .then(function (response) {
        console.log(response.status);
        if(response.status == 200){
          if (response.data.message == "succeed") {
          //  console.log("registration successfull");
          var loginscreen=[];
          console.log("here");
          loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
          self.props.parentContext.setState({loginscreen:loginscreen,
          buttonLabel:"Register",
          isLogin:true
            });
        }
      }
      else if(response.status == 210)
      {
        console.log("heredfds");
        alert("This account already exists. Please try again.");
      }
       else{
         console.log(response);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
    var userhintText,userLabel;
    if(this.props.role === "employee"){
      userhintText="Enter your Employee Id";
      userLabel="Employee Id";
    }
    else{
      userhintText="Enter your HR Id";
      userLabel="HR Id";
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
           {/* <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/> */}
           <TextField
             hintText="Enter Your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter a Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter a Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;