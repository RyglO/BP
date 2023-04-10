import React, {Component, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Auth from "./Auth";
import { Card, Container } from "@mui/material";


const MainMenu = () => {

    const[modules, setModules] = useState([]);


    const loadModules = () => {
        
        
    }

    useEffect(() => {
        loadModules()
    })

    return(
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid>
                {modules.map((data) => (
                    <Grid item key={data} xs={12} md={4}>
                        <Card variant="outlined" align="center">
                            <Typography variant="subtitle1" align="center" color="CaptionText">
                                {data.name}
                            </Typography>
                        </Card>
                    </Grid> 
                ))}
            </Grid>
        </Container>
    )
}

export default MainMenu

