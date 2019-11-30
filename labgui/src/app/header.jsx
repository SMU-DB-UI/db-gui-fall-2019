import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import React, {Component} from 'react'
import {Routes} from '../Routes'
import {Link} from 'react-router-dom'

export class Header extends Component{

    state = {
        showOptions: false
    }

    render () {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar iconElementLeft='' title="HR App" onLeftIconButtonClick={() => this.props.toggleNav()}>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}