import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Auth from "../../Auth";
import { Link } from "react-router-dom"; 
import { Card, Paper, CardActionArea } from "@mui/material";
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
                                            <Paper elevation={0} sx={{backgroundColor: "#C9E5EA", height: "60%"}}>
                                                <Typography variant="h5" align="center" color="#2C8878" textAlign={"center"} sx={{paddingTop: "30px", fontWeight: "bold"}}>
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
    )
}

export default DeviceDashboard