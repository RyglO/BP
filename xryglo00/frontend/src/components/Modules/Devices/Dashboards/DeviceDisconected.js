import React, { useEffect, useState } from "react";
import { CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";



const DeviceDisconected = () => {

return(
    <Grid>
        <Grid item xs align="center">
            <Card>
                <CardContent>
                    <Typography component="h5" variant="h5">Toto zařízení je momentálně odpojeno.</Typography>
                </CardContent>
            </Card> 
        </Grid>
    </Grid>
)
}

export default DeviceDisconected