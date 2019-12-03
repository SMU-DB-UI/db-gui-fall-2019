import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import {ReportsPage} from './app/ReportsPage'
import {ReviewsPage} from './app/ReviewsPage'

import {Route, BrowserRouter, Switch, Link} from 'react-router-dom'
import {Routes} from './Routes'
import {Header} from './app/header'

class App extends Component {

  state = {
    navigating: false
  }

  toggleNav() {
    this.setState({navigating: !this.state.navigating})
  }
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      reportsPage: [],
      reviewsPage: []
    }
  }
  componentWillMount(){
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
  render() {
    return (
      
      <div className="App">
        <BrowserRouter>
            <Header toggleNav={x => (this.toggleNav())}></Header>
            <div className='col-2 align-left float-left card text-left jumbotron jumbotron-fluid bg-info maxHeight' 
                style={{'display': (this.state.navigating ? 'block' : 'none')}}>
                    {
                        Routes().map(x => (
                              <Link to={x[0]} className='text-light'>
                                  <h3 className='ml-3'>{x[2]}</h3>
                              </Link>
                        ))
                    }
            </div>
            <div className={(this.state.navigating ? 'col-10 float-right' : '')}>
                <Switch>
                {
                  Routes().map(x => (
                    <Route exact path={x[0]} component={x[1]} key={x[0]}></Route>
                  ))
                }
                </Switch>
            </div>
            {/* {this.state.loginPage}
            {this.state.uploadScreen}
            {this.state.reportsPage} */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;