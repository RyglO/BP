import { Card, CardMedia, Grid, Typography, CardActionArea } from "@mui/material";
import React from "react";
import modules from "../../static/modules.json"
import { Link } from "react-router-dom"

const ModuleList = () => {
    

    return (
        <Grid container spacing={4}>
            {modules.modules.map((module) => (
                <Grid item key={module} xs={8} md={2}>
                    <CardActionArea>
                        <Card variant="outlined" align='center'>              
                            <Link to={`${module.link}`}>
                                <CardMedia component="img" image={`../../static/images/${module.picture}`} />
                                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                    {module.name}
                                </Typography>
                            </Link>
                        </Card>       
                    </CardActionArea>
                    
                </Grid>

            ))}
        </Grid>
    )
}

export default ModuleList

    