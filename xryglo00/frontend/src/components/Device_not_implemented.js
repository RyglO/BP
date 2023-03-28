import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import PersistentDrawerRight from "./GraphSettingsDrawer";



const Device_not_implemented = () => {
console.log('banán')


return(
    <Grid>
        <Grid item xs align="center">
            <Card>
                <CardContent>
                    <Typography component="h5" variant="h5">SorryJako, ale toto zařízení zatím není podporované</Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    //<PersistentDrawerRight/>
)
}

export default Device_not_implemented