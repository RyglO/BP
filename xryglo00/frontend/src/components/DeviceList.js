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
import { Container } from "@mui/system";

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
        <main>
            <Container>
                <Typography component="h5" variant="h5">
                    Dostupná zařízení:
                </Typography>    
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {devices.map((data) => (
                        <Grid item key={data} xs={12} md={4}>
                        <Card variant="outlined">
                            <Link to={`/Device/${data.id.id}`}>
                                <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
                                    {data.name}
                                   </Typography>
                                <CardActions>
                                <Button variant="contained" align="center">
                                    {data.type}
                                </Button>
                                </CardActions>
                            </Link>
                        </Card>
                        </Grid>
                    
                    ))}
                </Grid>
            </Container>
            {/* <Button variant='contained' onClick={loadDevices}> Načti dostupná zařízení </Button> */}
        </main>   
    )
}

export default DeviceList