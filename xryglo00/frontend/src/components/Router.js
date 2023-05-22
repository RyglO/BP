import React, {Component, useContext, useEffect, useState} from "react";
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
import NotFoundPage from "./NotFoundPage";



const Router = () => {
    const [loaded, setLoaded] = useState(false)
    const authContext = useContext(AuthContext)

    const setUserInfo = () => {
        if (!Auth.isAuthenticated()) {
            setLoaded(true)
            return
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": Auth.getJwt()
            }),
        };

        fetch("../../api/userInfo", requestOptions)
        .then((response) => response.json()).then(data =>{   
            Auth.setCustomerId(data.customerId.id)
            authContext.setIsAdmin(data.authority === "TENANT_ADMIN")
            //authContext.setIsAdmin(true)
            setLoaded(true)
        })
    }

    useEffect(() => {
        setUserInfo()
    }, [])


    if (!loaded)
        return <></>

    return (
        <BrowserRouter basename="/">
            <AuthContext.Consumer>
                {({isAdmin}) => <Routes>
                    {Auth.isAuthenticated() && (
                    <>
                        {isAdmin && ( 
                            <>
                                <Route path='/ListDevices' element={<ListDevices />} />
                                <Route path='/Users' element={<ListUsers />} />
                            </>
                        )}
                        <Route path='/' element={<ModuleList />} />
                        <Route path='/Devices' element={<DeviceDashboard />}/>
                        <Route path='/Device/:devicetype/:id' element={<Device_General />}/>
                        <Route path='/Profile' element={<CurrentUserProfile/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </>)}

                    <Route path='/login' element={<LoginPage />}> </Route>
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
                }
            </AuthContext.Consumer>
        </BrowserRouter>
    )
}

export default Router
