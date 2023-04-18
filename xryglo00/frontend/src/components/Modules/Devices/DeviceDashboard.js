import React, {Component, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Auth from "../../Auth";
import { Link } from "react-router-dom"; 
import { CardActions, Card, Paper, CardActionArea } from "@mui/material";
import { Container } from "@mui/system";

const DeviceDashboard = () => {

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
        <Container fixed>
                <Grid container spacing={4} 
                    sx={{ marginTop: "10px", 
                        flexGrow: 1,
                        justifyContent: "left",
                        display: "flex",
                        }}>
                    {devices.map((data) => (
                        <Grid item key={data} xs={10} sm={6} md={4} lg={3} minHeight={200} alignItems="center" justifyContent="center">
                            <Paper elevation={4} sx={{height: "100%"}}>
                                <CardActionArea sx={{height: "100%"}}>
                                    <Link to={`/Device/${data.type}/${data.id.id}`} style={{textDecoration: 'none', height: '100%'}}>
                                        <Card variant="outlined" align="center" sx={{height: "100%"}}>
                                            <Paper elevation={0} sx={{backgroundColor: "#064e33", height: "60%"}}>
                                                <Typography variant="h5" align="center" color="#ecfdf3" textAlign={"center"} sx={{paddingTop: "30px"}}>
                                                    {data.label}
                                                </Typography>
                                            </Paper>
                                            <Typography variant="body2" align="center" color="text.secondary" paragraph sx={{paddingTop: "10px"}}>
                                                {data.name}
                                            </Typography>
                                        </Card>
                                    </Link>
                                </CardActionArea>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
        </Container>
            /* <Button variant='contained' onClick={loadDevices}> Načti dostupná zařízení </Button> */
    )
}

export default DeviceDashboard