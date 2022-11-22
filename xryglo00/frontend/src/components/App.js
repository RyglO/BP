import React, { Component } from 'react';
import {render} from "react-dom";
import Router from './Router';
import LoginPage from './LoginPage';
import Hotbar from './Hotbar';

export default class App extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
        <div> 
            <Hotbar />
            <Router />
        </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);