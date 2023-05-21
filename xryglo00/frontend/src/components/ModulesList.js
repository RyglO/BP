import { Card, CardMedia, Grid, Typography, CardActionArea, Paper } from "@mui/material";
import React, {useContext} from "react";
import modules from "../../static/modules.json"
import { Link } from "react-router-dom"
import { AuthContext } from "./AuthContetxt";

const ModuleList = () => {

    const authContext = useContext(AuthContext)

    return (
        <Grid container spacing={4} 
        sx={{ marginTop: "10px", 
        flexGrow: 1,
        justifyContent: "center",
        display: "flex",
        }}>
            {modules.modules.map((mod) => {
                if (mod.access === 'TENANT' && !authContext.isAdmin)
                    return <></>
                
                return (
                    <Grid item key={mod} xs={8} md={3} lg={2} minHeight={200}> 
                    <Paper elevation={4}>
                        <CardActionArea>
                            <Card variant="outlined" align='center'>              
                                <Link to={`${mod.link}`} style={{ textDecoration: 'none' }}>
                                    <CardMedia component="img" image={`../../static/images/${mod.picture}`} sx={{padding: "10px 0px 10px 0",objectFit: "contain" }} height={80} />
                                    <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{padding: "0px 10px 0px 10px"}}>
                                        {mod.name}
                                    </Typography>
                                </Link>
                            </Card>       
                        </CardActionArea>
                    </Paper>
                        
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ModuleList

    