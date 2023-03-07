import React, {Component} from "react";
import {BrowserRouter, Routes, Route, Link, Redirect, Navigate} from "react-router-dom";
import LoginPage from "./LoginPage";
import Auth from "./Auth";
import DeviceList from "./DeviceList";
import Device_Gateway from "./Device_Gateway";
import Device_thermometer from "./Device_thermometer";

const Router = () => 
    <BrowserRouter>
        <Routes>
            {Auth.isAuthenticated() && (
            <>
                <Route exact path='/' element={<DeviceList />} />
                <Route path='/Dashboard' element={<DeviceList />}/>
                <Route path='/Device/:id' element={<Device_thermometer />}/>
            </>)}

            <Route path='/login' element={<LoginPage />}> </Route>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    </BrowserRouter> 

export default Router
