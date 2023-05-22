import React from "react";
import {Grid, Box, Link, Typography } from "@mui/material";



const Device_not_implemented = () => {

return(
    <Grid container spacing={8} direction="row" alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
            <Box sx={{height:"100%", display: "flex"}} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
            <Typography sx={{verticalAlign:"middle", marginTop: "30px"}} variant="h4">
                Toto zařízení zatím není podporováno.
                </Typography>
                <Link href="/" underline="always" sx={{marginTop: "60px"}}>
                    <Typography variant="button">
                        Hlavní stránka
                    </Typography>
                </Link> 
            </Box>
        </Grid>
    </Grid>
)
}

export default Device_not_implemented