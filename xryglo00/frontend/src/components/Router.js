import React, {Component} from "react";
import {BrowserRouter, Routes, Route, Link, Redirect, Navigate} from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Auth from "./Auth";

const Router = () => 
    <BrowserRouter>
        <Routes>
            {Auth.isAuthenticated() && (
            <>
                <Route exact path='/' element={<p> Tady bude jednou přehled zařízení</p>} />
                <Route path='/Dashboard' element={<Dashboard />}/>
            </>)}

            <Route path='/login' element={<LoginPage />}> </Route>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    </BrowserRouter> 

export default Router
