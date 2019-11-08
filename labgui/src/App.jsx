import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import {AccountEditor} from './app/AccountEditor'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      accountEditor: []
    }
  }
  componentWillMount(){
    var page =[];
    // page.push(<LoginScreen appContext={this} key={"login-screen"}/>);
    // this.setState({
    //               loginPage:page
    //                 })
    page.push(<AccountEditor/>);
    this.setState({
        accountEditor:page
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
        {this.state.accountEditor}
      </div>
    );
  }
}

export default App;