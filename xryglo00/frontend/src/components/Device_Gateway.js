import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "./Auth";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import loadDataPoly from "./PolyAPIcall";

const Device_Gateway = () => {

    const [dataAC, setDataAC] = useState([])
    const [dataACcurrent, setDataACcurrent] = useState([])
    const [dataACactive, setDataACactive] = useState([])
    const [dataImport, setDataImport] = useState([])
    const [dataExport, setDataExport] = useState([])

    const {id} = useParams(); 

    

    const loadAll = () => {
        const date = new Date()

        loadDataPoly(id, 'voltage_l1,voltage_l2,voltage_l3', 'ASC', '60000', 'AVG', date.setHours(date.getHours() - 1), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataAC(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts).toLocaleString("cs-CZ"))})))
        })
        loadDataPoly(id, 'current_l1,current_l2,current_l3', 'ASC', '60000', 'AVG', date.setHours(date.getHours() - 1), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataACcurrent(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts).toLocaleString("cs-CZ"))})))
        })
        loadDataPoly(id, 'power_l1,power_l2,power_l3', 'ASC', '60000', 'AVG', date.setHours(date.getHours() - 1), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataACactive(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'import_active_power', 'ASC', '60000', 'AVG', date.setHours(date.getHours() - 1), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataImport(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'export_active_power', 'ASC', '60000', 'AVG', date.setHours(date.getHours() - 1), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataExport(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
    }


    useEffect(() => {
        loadAll('voltage_l1,voltage_l2,voltage_l3')
    },[])
    useEffect(() => console.log(dataAC), [setDataAC,dataAC])
    useEffect(() => console.log(dataACactive), [setDataACactive,dataACactive])
    useEffect(() => console.log(dataACcurrent), [setDataACcurrent,dataACcurrent])
    useEffect(() => console.log(dataExport), [setDataExport,dataExport])
    useEffect(() => console.log(dataImport), [setDataImport,dataImport])

    const MINUTE_MS = 10000;

    useEffect(() => {
        const interval = setInterval(() => {
        console.log('Logs every 10 sec');
    }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    return (
        <Grid container spacing={2}>
            <Grid item xs align="center">
            <Card variant="outlined" sx={{ maxWidth: 550 }}> 
            <CardContent>
                <Typography component="h4" variant="h4">AC Phase Voltage</Typography> 
                <LineChart width={500} height={300} data={dataAC} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="voltage_l1" stroke="#8884d8" name="Phase 1" dot={false}/>
                    <Line type="monotone" dataKey="voltage_l2" stroke="#82ca9d" name="Phase 2" dot={false}/>
                    <Line type="monotone" dataKey="voltage_l3" stroke="#ff0000" name="Phase 3" dot={false}/>
                </LineChart>
            </CardContent>
                
                </Card>
            </Grid>
            <Grid item xs align="center">
                <Card variant="outlined" sx={{ maxWidth: 550 }}> 
                <CardContent>
                    <Typography component="h4" variant="h4">AC Phase Current</Typography> 
                <LineChart width={500} height={300} data={dataACcurrent} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="current_l1" stroke="#8884d8" name="Phase 1"/>
                    <Line type="monotone" dataKey="current_l2" stroke="#82ca9d" name="Phase 2"/>
                    <Line type="monotone" dataKey="current_l3" stroke="#ff0000" name="Phase 3"/>
                </LineChart>
                </CardContent>
                
                </Card>
            </Grid>
            <Grid item xs align="center">
                <Card variant="outlined" sx={{ maxWidth: 550 }}> 
                <CardContent>
                    <Typography component="h4" variant="h4">AC Phase Active Power</Typography> 
                    <LineChart width={500} height={300} data={dataACactive} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="power_l1" stroke="#8884d8" name="Phase 1"/>
                    <Line type="monotone" dataKey="power_l2" stroke="#82ca9d" name="Phase 2"/>
                    <Line type="monotone" dataKey="power_l3" stroke="#ff0000" name="Phase 3"/>
                </LineChart>
                </CardContent>
                
                
                </Card>
            </Grid>
            <Grid item xs align="center">
            <Card variant="outlined" sx={{ maxWidth: 550 }}> 
            <CardContent>
                <Typography component="h4" variant="h4">Import power</Typography> 
                <LineChart width={500} height={300} data={dataImport} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="import_active_power" stroke="#8884d8" name="Import power"/>
                </LineChart>
            </CardContent>
                
                </Card>
            </Grid>
            <Grid item xs align="center">
                <Card variant="outlined" sx={{ maxWidth: 550 }}> 
                <CardContent> 
                    <Typography component="h4" variant="h4">Export power</Typography> 
                    <LineChart width={500} height={300} data={dataExport} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="export_active_power" stroke="#8884d8" name="Export power"/>
                    </LineChart>
                </CardContent>
                </Card>
            </Grid>
        </Grid>  
    )
}

export default Device_Gateway