import { Card, CardMedia, Grid, Typography, CardActionArea } from "@mui/material";
import React from "react";
import modules from "../../static/modules.json"
import { Link } from "react-router-dom"

const ModuleList = () => {
    

    return (
        <Grid container spacing={4} 
        sx={{ marginTop: "10px", 
        flexGrow: 1,
        justifyContent: "center",
        display: "flex",
        }}>
            {modules.modules.map((module) => (
                <Grid item key={module} xs={8} md={3} lg={2}> 
                    <CardActionArea>
                        <Card variant="outlined" align='center' >              
                            <Link to={`${module.link}`} style={{ textDecoration: 'none' }}>
                                <CardMedia component="img" image={`../../static/images/${module.picture}`} sx={{padding: "10px 0px 10px 0",objectFit: "contain" }} height={80} />
                                <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{padding: "0px 10px 0px 10px"}}>
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

    