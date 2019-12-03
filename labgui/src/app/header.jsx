import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import React, {Component} from 'react'
import {Routes} from '../Routes'
import {Link} from 'react-router-dom'

export class Header extends Component{

    state = {
        showOptions: false
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

    render () {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar iconElementLeft='' title={this.getTitle()} onLeftIconButtonClick={() => this.props.toggleNav()}>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}