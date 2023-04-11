import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import modules from "../../static/modules.json"
import { Link } from "react-router-dom"; 


const ModuleList = () => {
    

    return (
        <Grid container spacing={4}>
            {modules.modules.map((module) => (
                <Grid item key={module} xs={12} md={3} >
                    <Card variant="outlined" align='center' >                            
                        <Link to={`${module.link}`}>
                            <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
                                {module.name}
                            </Typography>
                        </Link>
                    </Card>   
                </Grid>

            ))}
        </Grid>
    )
}

export default ModuleList

    