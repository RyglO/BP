import { Box, Link, Typography, Paper, Grid } from "@mui/material";
import React from "react";


const NotFoundPage = () => {


    return (
        <>
        
            <Grid container spacing={8}>
                <Grid item xs={10} md={6}>
                    <Box sx={{height:"100%", display: "flex"}} alignItems={"center"} justifyContent={"center"}>
                       <Typography sx={{verticalAlign:"middle"}}>
                            Tato stránka neexistuje, Vraťte se prosím na hlavní stránku.
                        </Typography>
                        <Link href="/login" underline="always">
                            <Typography>
                                Hlavní stránka
                            </Typography>
                        </Link> 
                    </Box>
                </Grid>
                <Grid item xs={10} md={6}>
                    <Box component="img" src="https://http.cat/404" sx={{objectFit: "contain", borderRadius: "10px", maxWidth: "100%"}}/>
                </Grid>
            </Grid>
        
            
        </>
    )
}

export default NotFoundPage