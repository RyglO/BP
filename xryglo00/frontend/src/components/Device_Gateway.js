import { Button } from "@mui/material";
import React, {Component, useEffect} from "react";




const Device_Gateway = ({device}) => {

    return(
        <div className="elektromerObject">
                <Button variant="contained">
                    {device.Name}
                </Button>
        </div>
    );
} 

export default Device_Gateway