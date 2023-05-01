import { Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { LineChart, ResponsiveContainer } from "recharts";


const Device_Inverter = () => {

    return(
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card variant="outlined" sx={{maxWidth: 550}}>
                        <CardContent>
                            <Typography component="h6" variant="h6" align="left"></Typography>
                            <ResponsiveContainer width="100%" aspect={2 / 1}>
                                <LineChart>
                                    
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Device_Inverter