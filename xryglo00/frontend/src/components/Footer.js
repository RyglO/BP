import { Box, Paper, Typography } from "@mui/material";
import React from "react";


const Footer = () => {

    return(
        <Paper sx={{marginTop: 'calc(10% + 60px)',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: "whitesmoke"
            }} component="footer" square variant="string">
            <Box sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                mb: 2,
                }}>
                <Typography variant="caption" color="initial" align="center">
                    Ondřej Rygl     
                    xryglo00    
                    2023
                </Typography>
            </Box>
        </Paper>
    )

}
export default Footer