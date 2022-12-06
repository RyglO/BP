import React, {Component, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Auth from "./Auth";
import { Link } from "react-router-dom"; 
import { CardActions, Card } from "@mui/material";

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
            setDevices(data.data)
        }
        )
    }

    useEffect(() => {
        loadDevices()
    },[])

    return(
        <div>
            <Typography component="h5" variant="h5">
                    Dostupná zařízení
                </Typography>
                <div>
                    {devices.map((data) => (
                        <Link to={`/Device/${data.id.id}`}>
                            <Card variant="outlined" sx={{ maxWidth: 200 }}>
                                <CardActions>
                                    <Button variant="contained">
                                        {data.name}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Link>
                    ))}
                </div>
            {/* <Button variant='contained' onClick={loadDevices}> Načti dostupná zařízení </Button> */}
        </div>   
    )
}

export default DeviceList