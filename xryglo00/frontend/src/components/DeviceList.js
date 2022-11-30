import React, {Component, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Auth from "./Auth";
import Device_Gateway from "./Device_Gateway";


const DeviceList = () => {

    const [devices, setDevices] = useState([]);


    const loadDevices = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": Auth.getJwt(),
                "LoggedUser": Auth.getUserName(),
            }),
        };
        fetch("api/users", requestOptions)
        .then((response) => 
            response.json())
            .then((data) =>{
            //Co s tím teď? jak parsovat zařízení správně?
            console.log(data)
            setDevices(data)
        }
        )
    }

    useEffect(() => {
        loadDevices
    })

    return(
        <div>
            <h1>Dustupná zařízení</h1>
                <div>
                    {devices.map((device) => (
                        <Device_Gateway key={device.id} device={device} />
                    ))}
                </div>
            <button onClick={loadDevices}></button>
        </div>
        
    )

}

export default DeviceList