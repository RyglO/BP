import React, { Component } from 'react';
import {render} from "react-dom";
import Router from './Router';
import LoginPage from './LoginPage';
import Hotbar from './Hotbar';
import { AuthProvider } from './AuthContetxt';
import Footer from './Footer';

export default class App extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <AuthProvider>
                <Hotbar /> 
                <Router />
                <Footer />
            </AuthProvider>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);