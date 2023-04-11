import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "../../../Auth";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import loadDataPoly from "../../../PolyAPIcall";
import Device_Gateway from "./Device_Gateway";
import Device_thermometer from "./Device_thermometer";
import Device_not_implemented from "./Device_not_implemented";
const Device_General = () => {

const {id, devicetype} = useParams();

let device_to_render;

console.log(devicetype);

switch (devicetype) {
    case 'ESP32_OTA_ELMETER':
        device_to_render = <Device_Gateway />
        break;
    case 'ESP32_OTA_SENSOR':    
        device_to_render = <Device_thermometer />
        break;
    default:
        device_to_render = <Device_not_implemented />
        break;
    }


    return (
            <div>
                {device_to_render}
            </div>
    )
}

export default Device_General