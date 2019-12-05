import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import {ReportsPage} from './app/ReportsPage'
import {ReviewsPage} from './app/ReviewsPage'

import {Route, BrowserRouter, Switch, Link, Redirect} from 'react-router-dom'
import {Routes} from './Routes'
import {Header} from './app/header'
import { HardwareDesktopWindows } from 'material-ui/svg-icons';

class App extends Component {

  state = {
    navigating: false,
  }

  toggleNav() {
    this.setState({navigating: !this.state.navigating})
  }
  stopNav() {
    this.setState({navigating: false})
  }

  getRoutes() {
    if (window.location.auth == 0) {
      return (
        Routes().all.map(x => (
          <Route exact path={x[0]} component={x[1]} key={x[0]}></Route>
        ))
      )
    }
    else if (window.location.auth == 1) {
      return (
        Routes().all.map(x => (
          <Route exact path={x[0]} component={x[1]} key={x[0]}></Route>
        ))
      )
    }
    else if (window.location.userId == -1) {
      return (
        Routes().all.map(x => (
          <Route exact path={x[0]} component={x[1]} key={x[0]}></Route>
        ))
      )
    }
  }

  getNavLinks() {
    if (window.location.auth == 0) {
      return (
        Routes().employee.map(x => (
              <Link to={x[0]} className='text-light' onClick={() => this.toggleNav()} key={x[0]}>
                  <h3 className='ml-3'>{x[2]}</h3>
              </Link>
        ))
      )
    }
    else if (window.location.auth == 1) {
    return (
        Routes().hr.map(x => (
          <Link to={x[0]} className='text-light' onClick={() => this.toggleNav()} key={x[0]}>
              <h3 className='ml-3'>{x[2]}</h3>
          </Link>
        ))
      )
    }
    else if (window.location.userId == -1) {
      return (
          Routes().public.map(x => (
            <Link to={x[0]} className='text-light' onClick={() => this.toggleNav()} key={x[0]}>
                <h3 className='ml-3'>{x[2]}</h3>
            </Link>
          ))
        )
      }
  }
  constructor(props){
    super(props);
    // this.state={
    //   loginPage:[],
    //   uploadScreen:[],
    //   reportsPage: [],
    //   reviewsPage: []
    // }
  }
  componentWillMount(){
    document.title = 'HR App'
    window.location.userId = -1;
    window.location.auth = -1;
    var reports = [];
    reports.push(<ReportsPage/>)
    var reviews = [];
    reviews.push(<ReviewsPage/>)
    this.setState({
      reportsPage:reports,
      reviewsPage:reviews
    })

    // var loginPage =[];
    // loginPage.push(<LoginScreen appContext={this} key={"login-screen"}/>);
    // this.setState({
    //               loginPage:loginPage
    //                 })
  }

  forceToLogin() {
    if (!this.state.logedin) {
      return <Redirect to='/'/>
    }
    else{}
  }

  render() {
    return (
      <div className="App">

        <BrowserRouter>
            <Header stopNav={x => (this.stopNav())} toggleNav={x => (this.toggleNav())}></Header>
              <div className='col-2 align-left float-left card text-left jumbotron jumbotron-fluid bg-info maxHeight' 
                  style={{'display': (this.state.navigating ? 'block' : 'none')}}>
                      {this.getNavLinks()}
              </div>
              <div className={(this.state.navigating ? 'col-10 float-right' : '')}>
                  <Switch>           
                  {this.getRoutes()}
                  </Switch>
              </div>
              {/* {this.forceToLogin()} */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;