import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "./Auth";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, CardContent, Grid, Dialog, DialogTitle, DialogContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import loadDataPoly from "./PolyAPIcall";
import GraphSettingsDialog from "./GraphSettingsDialog";
import SettingsWindow from "./GraphSettingsDialog_GPT";

const Device_thermometer = () => {

    const [dataThermo, setDataThermo] = useState([])

    const [settings, setSettings] = useState({})

    const {id, devicetype} = useParams();
    const [open, setOpenDialog] = useState(false);

    const handleButtonClick = () => {
        setOpenDialog(true);
    };
  
    const handleClose = () => {
        console.log('called')
        setOpenDialog(false);
    };

    const refresh = () => {
        console.log('refresh')
        loadData()
        setTimeout(refresh, 5000)
    }

    useEffect(() => {
        refresh()
    }, [])

    const loadData = () => {
        const date = new Date()
        console.log("ahoj")
        loadDataPoly(id, 'temperature', 'ASC', '3600000', 'AVG', date.setHours(date.getHours() - 24), Date.now()).then(response => {
            const keys = Object.keys(response)
            
            setDataThermo(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts).toLocaleString("cs-CZ"))})))
        })
    }
    useEffect(() => {
        loadData()
    },[])
     useEffect(() => console.log(dataThermo), [setDataThermo, dataThermo])


     const renderDialog = () => {

        console.log('hruška')
        return(
            <GraphSettingsDialog open={true} handleClose={handleClose} saveSettings={setSettings}/>
        )
     }

    return (
        <Grid>
            <Grid item xs align="center">
                <Card variant="outlined" sx={{maxWidth: 850}}>
                    <CardContent>
                        <Typography component="h4" variant="h4">Teplota</Typography>
                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart data={dataThermo} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Teplota"/> 
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs align="center">
                <Button variant='contained' onClick={handleButtonClick}>Nastavení</Button>
                {open && renderDialog()}
            </Grid>
        </Grid>
    )
} 

export default Device_thermometer