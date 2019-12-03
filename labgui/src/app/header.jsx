import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import React, {Component} from 'react'
import {Routes} from '../Routes'
import {Link, Redirect} from 'react-router-dom'

export class Header extends Component{

    state = {
        redirect: false
    }

    getTitle() {
        console.log("header location");
        console.log(window.location);
        let curr = window.location.pathname;
        let title = 'Hr App';
        Routes().all.forEach(route => {
            if (route[0] == curr){
                title = route[2];
            }
        });
        return title;
    }

    getLoginOut() {
        if (window.location.pathname == '/')
            return ''//<Link to='/' className='btn btn-success'>Login</Link>
        else
            return <button type='button' className='btn btn-danger' onClick={() => this.confirmLogout()}>Logout</button>
    }

    confirmLogout() {
        if (window.confirm("Are you sure you want to log out?"))
        {
            this.setState({redirect:true})
        }
        else {}
    }

    logout()
    {
        if (this.state.redirect)
        {
            this.setState({redirect:false})
            //TODO  add api stuff
            return <Redirect to='/'/>

        }
        else{}
    }

    render () {
        return (
            <div>
                {this.logout()}
                <MuiThemeProvider>
                    <AppBar iconElementLeft='' title={this.getTitle()} onLeftIconButtonClick={() => this.props.toggleNav()} 
                        iconElementRight= {this.getLoginOut()}>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}