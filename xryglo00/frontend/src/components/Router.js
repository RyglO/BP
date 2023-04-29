import React, {Component} from "react";
import {BrowserRouter, Routes, Route, Link, Redirect, Navigate} from "react-router-dom";
import LoginPage from "./LoginPage";
import Auth from "./Auth";
import DeviceDashboard from "./Modules/Devices/DeviceDashboard";
import Device_General from "./Modules/Devices/Dashboards/Device_General";
import ListDevices from "./Modules/Devices/ListDevices";
import { AuthContext, AuthProvider } from "./AuthContetxt";
import ModuleList from "./ModulesList";
import ListUsers from "./Modules/Users/ListUsers";
import CurrentUserProfile from "./Modules/Users/CurrentuserProfile";

const Router = () => 
    <BrowserRouter basename="/">
        <AuthContext.Consumer>
            {({isAdmin}) => 
                <Routes>
                    {isAdmin && <Route path='*' element={<div>ahoj</div>} />}
                    {Auth.isAuthenticated() && (
                    <>
                        <Route exact path='/' element={<ModuleList />} />
                        <Route path='/ListDevices' element={<ListDevices />} />
                        <Route path='/Users' element={<ListUsers />} />
                        <Route path='/Devices' element={<DeviceDashboard />}/>
                        <Route path='/Device/:devicetype/:id' element={<Device_General />}/>
                        <Route path='/Profile' element={<CurrentUserProfile/>}/>
                    </>)}

                    <Route path='/login' element={<LoginPage />}> </Route>
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            }
        </AuthContext.Consumer>
    </BrowserRouter> 

export default Router
