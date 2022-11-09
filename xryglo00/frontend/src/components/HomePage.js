import React, {Component} from "react";
import {BrowserRouter, Routes, Route, Link, redirect} from "react-router-dom";
import LoginPage from "./LoginPage";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
        <BrowserRouter> 
            <Routes>
                <Route exact path='/' element={<p> Domovská stránka</p>}></Route>
                <Route path='/login' element={<LoginPage />}> </Route>
            </Routes>

        </BrowserRouter>
    );}

}