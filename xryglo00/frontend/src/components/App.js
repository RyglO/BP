import React, { Component } from 'react';
import {render} from "react-dom";
import Router from './Router';
import LoginPage from './LoginPage';
import Hotbar from './Hotbar';
import { AuthProvider } from './AuthContetxt';
import Footer from './Footer';
import {ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#2A3D5C',
          },
        secondary: {
            main: '#0AA9C5'
        }
    }
  });


export default class App extends Component{
    constructor(props){
        super(props);

    }
    
    render(){
        return (
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Hotbar /> 
                    <Router />
                    <Footer />
                </AuthProvider>    
            </ThemeProvider>
            
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);