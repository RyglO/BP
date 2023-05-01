import { Box, Link, Typography, Paper, Grid } from "@mui/material";
import React from "react";


const NotFoundPage = () => {


    return (
        <>
            <Grid container spacing={8} direction="row" alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{height:"100%", display: "flex"}} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                       <Typography sx={{verticalAlign:"middle", marginTop: "30px"}} variant="h4">
                            Stránka nenalezena.
                        </Typography>
                        <Link href="/" underline="always" sx={{marginTop: "60px"}}>
                            <Typography variant="button">
                                Hlavní stránka
                            </Typography>
                        </Link> 
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component="img" src="https://http.cat/404" sx={{objectFit: "contain", borderRadius: "10px", maxWidth: "75%"}} margin={"20px 20px 20px 20px"}/>
                </Grid>
            </Grid>
        
            
        </>
    )
}

export default NotFoundPage