import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "./Auth";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import loadDataPoly from "./PolyAPIcall";
import {Button} from "@mui/material";
import GraphSettingsDialog from "./GraphSettingsDialog";

const Device_Gateway = () => {

    const [dataAC, setDataAC] = useState([])
    const [dataACcurrent, setDataACcurrent] = useState([])
    const [dataACactive, setDataACactive] = useState([])
    const [dataImport, setDataImport] = useState([])
    const [dataExport, setDataExport] = useState([])
    const [dataHistExport, setDataHistExport] = useState([])
    const [dataHistImport, setDataHistImport] = useState([])

    const {id} = useParams(); 

    let settings = {
        isLive: false,
        intervalValue: 0.1,
        historyValue: 10
    }
    let refreshID = null
    const [open, setOpenDialog] = useState(false);

    const settingsChanged = (settingsInput) => {
        settings = settingsInput
        console.log('new settings set: ', settings)
        refresh()
    }
    const handleButtonClick = () => {
        setOpenDialog(true);
    };
  
    const handleClose = () => {
        setOpenDialog(false);
    };
    const refresh = () => {
        clearInterval(refreshID)
        refreshID=null
        loadAll()
        if(settings.isLive && !refreshID)
            refreshID = setInterval(() => refresh(), 5000) 
    }
    const renderDialog = () => {

        console.log(settings)
        return(
            <GraphSettingsDialog open={true} handleClose={handleClose} currentSettings={settings} saveSettings={settingsChanged}/>
        )
     }

    

    const loadAll = () => {
        const date = new Date()

        loadDataPoly(id, 'voltage_l1,voltage_l2,voltage_l3', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataAC(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts).toLocaleString("cs-CZ"))})))
        })
        loadDataPoly(id, 'current_l1,current_l2,current_l3', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataACcurrent(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts).toLocaleString("cs-CZ"))})))
            
        })
        loadDataPoly(id, 'power_l1,power_l2,power_l3', 'ASC', settings.intervalValue*60000, 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataACactive(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'import_active_power', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataImport(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'export_active_power', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataExport(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))

        })
        loadDataPoly(id, 'export_active_power', 'ASC', '86400000', 'AVG', new Date().setHours(date.getHours() - (7*24)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataHistExport(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number((response[k][i+1] == null ? 0 : response[k][i+1].value - response[k][i].value)).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'import_active_power', 'ASC', '86400000', 'AVG', new Date().setHours(date.getHours() - (7*24)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataHistImport(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number((response[k][i+1] == null ? 0 : response[k][i+1].value - response[k][i].value)).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
            console.log(response)
        })
    }
//() => (response[k-1][i].value == null ? 0 : response[k][i].value - response[k-1][i].value)

    useEffect(() => {
        loadAll('voltage_l1,voltage_l2,voltage_l3')
    },[])
    useEffect(() => console.log(dataAC), [setDataAC,dataAC])
    useEffect(() => console.log(dataACactive), [setDataACactive,dataACactive])
    useEffect(() => console.log(dataACcurrent), [setDataACcurrent,dataACcurrent])
    useEffect(() => console.log(dataExport), [setDataExport,dataExport])
    useEffect(() => console.log(dataImport), [setDataImport,dataImport])
    useEffect(() => console.log(dataHistImport), [setDataHistImport,dataHistImport])
    useEffect(() => console.log(dataHistExport), [setDataHistExport,dataHistExport])

    

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg ={3} align="center">
            <Card variant="outlined" sx={{ maxWidth: 550 }}> 
            <CardContent>
                <Typography component="h6" variant="h6" align="left">AC Napětí</Typography> 
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <LineChart data={dataAC} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="time" />
                        <YAxis tickFormatter={(tick) => `${tick} V`}/>  
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="voltage_l1" stroke="#8884d8" name="Fáze L1" dot={false}/>
                        <Line type="monotone" dataKey="voltage_l2" stroke="#82ca9d" name="Fáze L2" dot={false}/>
                        <Line type="monotone" dataKey="voltage_l3" stroke="#ff0000" name="Fáze L3" dot={false}/>
                    </LineChart>    
                </ResponsiveContainer>
            </CardContent>   
            </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} lg ={3} align="center">
            <Card variant="outlined" sx={{ maxWidth: 550 }}> 
            <CardContent>
                <Typography component="h6" variant="h6" align="left">AC činný výkon</Typography>
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <LineChart data={dataACactive} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="time" />
                        <YAxis allowDataOverflow={false} tickFormatter={(tick) => `${tick} W`}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="power_l1" stroke="#8884d8" name="Fáze L1"/>
                        <Line type="monotone" dataKey="power_l2" stroke="#82ca9d" name="Fáze L2"/>
                        <Line type="monotone" dataKey="power_l3" stroke="#ff0000" name="Fáze L3"/>
                    </LineChart>    
                </ResponsiveContainer>    
            </CardContent>
            </Card>
            </Grid>

            {/* <Grid item xs align="center">
                <Card variant="outlined" sx={{ maxWidth: 550 }}> 
                <CardContent>
                    <Typography component="h6" variant="h6" align="left">AC Čistý výkon</Typography> 
                <LineChart width={500} height={300} data={dataACcurrent} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis tickFormatter={(tick) => `${tick} W`}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="current_l1" stroke="#8884d8" name="Fáze L1"/>
                    <Line type="monotone" dataKey="current_l2" stroke="#82ca9d" name="Fáze L2"/>
                    <Line type="monotone" dataKey="current_l3" stroke="#ff0000" name="Fáze L3"/>
                </LineChart>
                </CardContent>
                
                </Card>
            </Grid> */}
            
            <Grid item xs={12} sm={12} md={12} lg ={6} align="center">
            <Card variant="outlined" sx={{ maxWidth: 850 }}> 
            <CardContent>
                <Typography component="h6" variant="h6" align="left">Průběžná spotřeba</Typography>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart  data={dataImport} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="time" />
                        <YAxis tickFormatter={(tick) => `${tick} kVh`}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="import_active_power" stroke="#0000FF" name="Import power"/>
                    </LineChart>    
                </ResponsiveContainer> 
            </CardContent>
            </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg ={3} align="center">
            <Card variant="outlined" sx={{ maxWidth: 550 }}> 
            <CardContent>
                <Typography component="h6" variant="h6" align="left">Spotřeba</Typography>
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <BarChart data={dataHistImport} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="time" />
                        <YAxis allowDataOverflow={false} tickFormatter={(tick) => `${tick} kWh`}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="import_active_power" fill="#FF0000" name="Import Power"/>
                    </BarChart>    
                </ResponsiveContainer>    
            </CardContent>
            </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg ={3} align="center">
            <Card variant="outlined" sx={{ maxWidth: 550 }}> 
            <CardContent>
                <Typography component="h6" variant="h6" align="left">Výroba</Typography>
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <BarChart data={dataHistExport} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="time" />
                        <YAxis allowDataOverflow={false} tickFormatter={(tick) => `${tick} kWh`}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="export_active_power" fill="#32CD32" name="Export Power"/>
                    </BarChart>    
                </ResponsiveContainer>    
            </CardContent>
            </Card>
            </Grid>


            <Grid item xs={12} sm={12} md={12} lg ={6} align="center">
            <Card variant="outlined" sx={{ maxWidth: 850 }}> 
            <CardContent> 
                <Typography component="h6" variant="h6" align="left">Průběžná výroba</Typography>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                     <LineChart  data={dataExport} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="time" />
                        <YAxis allowDataOverflow={false} tickFormatter={(tick) => `${tick} kVh`}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="export_active_power" stroke="#0000FF" name="Export power"/>
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

export default Device_Gateway