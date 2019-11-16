import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import {ReportsPage} from './app/ReportsPage'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      reportsPage: []
    }
  }
  componentWillMount(){
    var reports = [];
    reports.push(<ReportsPage/>)
    this.setState({
      reportsPage:reports
    })
    // var loginPage =[];
    // loginPage.push(<LoginScreen appContext={this} key={"login-screen"}/>);
    // this.setState({
    //               loginPage:loginPage
    //                 })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
        {this.state.reportsPage}
      </div>
    );
  }
}

export default App;