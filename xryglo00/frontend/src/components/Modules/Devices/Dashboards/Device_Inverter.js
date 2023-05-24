import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CardContent, Grid, Box, Button, Card, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import loadDataPoly from "../../../PolyAPIcall";
import GraphSettingsDialog from './GraphSettingsDialog'
import csvDownload from 'json-to-csv-export'


const Device_Inverter = () => {

    const [dataVykonFVE, setDataVykonFVE] = useState([])
    const [dataNapetiFVE, setDataNapetiFVE] = useState([])
    const [dataTeplota, setDataTeplota] = useState([])
    const [dataDistribuce, setDataDistribuce] = useState([])
    const [dataExpVykon, setDataExpVykon] = useState([])
    const [dataExpProud, setDataExpProud] = useState([])

    const [open, setOpenDialog] = useState(false);

    const {id} = useParams(); 

    let settings = {
        isLive: false,
        intervalValue: 5,
        historyValue: 1440
    }
    
    let refreshID = null

    const settingsChanged = (settingsInput) => {
        settings = settingsInput
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

        return(
            <GraphSettingsDialog open={true} handleClose={handleClose} currentSettings={settings} saveSettings={settingsChanged}/>
        )
    }

    const findDomains = (data) => {
        const values = data.reduce((acc, curr) => {
            Object.keys(curr).forEach((key) => {
              if (key !== 'time') {
                acc.push(parseFloat(curr[key]));
              }
            });
            return acc;
        }, []);
        const yMin = Math.min(...values);
        const yMax = Math.max(...values);
        return [yMin, yMax];
    }

    const loadAll = () => {
        const date = new Date()

        loadDataPoly(id, 'Ppv,Ppv1,Ppv2', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataVykonFVE(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts).toLocaleString("cs-CZ"))})))
        })
        loadDataPoly(id, 'Vpv1,Vpv2', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataNapetiFVE(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts).toLocaleString("cs-CZ"))})))
            
        })
        loadDataPoly(id, 'battery_temperature,Temp1,Temp2,Temp3', 'ASC', settings.intervalValue*60000, 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataTeplota(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'PactogridTotal,PactouserTotal,PLocalLoadTotal', 'ASC', settings.intervalValue*60000, 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataDistribuce(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'Pac,Pac1,Pac2,Pac3', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataExpVykon(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
        loadDataPoly(id, 'Iac1,Iac2,Iac3', 'ASC', (settings.intervalValue*60000).toString(), 'AVG', new Date().setMinutes(date.getMinutes() - (settings.historyValue)), Date.now()).then(response => {
            const keys = Object.keys(response)
            setDataExpProud(response[keys[0]].map((_,i) => keys.reduce((acc,k) => ({...acc, [k]:Number(response[k][i].value).toFixed(2)}),{time:(new Date(response[keys[0]][i].ts)).toLocaleString("cs-CZ")})))
        })
    }
    useEffect(() => {
        loadAll()
    },[])

    return(
        <Box margin={"20px 20px 20px 20px "}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg ={4} align="center">
                <Card variant="outlined" sx={{ maxWidth: 650 }}> 
                <CardContent>
                    <Grid container>
                        <Grid item xs>
                            <Typography component="h6" variant="button" align="left">Výkon fotovoltaických panelů</Typography> 
                        </Grid>
                        <Grid item>
                            <IconButton sx={{padding: "0px 0px 0px 0px", color: "black"}} onClick={() => csvDownload({data: dataVykonFVE, headers: ["Time", "Celkový výkon", "Západní string", "Jihovýchodní string"]})}>
                                <FileDownloadIcon/>    
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ResponsiveContainer width="100%" aspect={2 / 1}>
                        <LineChart data={dataVykonFVE} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{fontSize: "12px"}}/>
                            <YAxis tickFormatter={(tick) => `${tick} W`} domain={findDomains(dataVykonFVE)} tick={{fontSize: "12px"}}/>  
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Ppv" stroke="#6500a3" name="Celkový výkon" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Ppv1" stroke="#82ca9d" name="Západní string" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Ppv2" stroke="#2196f3" name="Jihovýchodní string" dot={false} strokeWidth={2}/>
                        </LineChart>    
                    </ResponsiveContainer>
                </CardContent>   
                </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg ={4} align="center">
                <Card variant="outlined" sx={{ maxWidth: 650 }}> 
                <CardContent>
                    <Grid container>
                        <Grid item xs>
                            <Typography component="h6" variant="button" align="left">Napětí fotovoltaických panelů</Typography> 
                        </Grid>
                        <Grid item>
                            <IconButton sx={{padding: "0px 0px 0px 0px", color: "black"}} onClick={() => csvDownload({data: dataNapetiFVE, headers: ["Time", "Jihovýchodní string", "Západní string"]})}>
                                <FileDownloadIcon/>    
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ResponsiveContainer width="100%" aspect={2 / 1}>
                        <LineChart data={dataNapetiFVE} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{fontSize: "12px"}}/>
                            <YAxis tickFormatter={(tick) => `${tick} V`} domain={findDomains(dataNapetiFVE)} tick={{fontSize: "12px"}}/>  
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Vpv1" stroke="#82ca9d" name="Západní string" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Vpv2" stroke="#2196f3" name="Jihovýchodní string" dot={false} strokeWidth={2}/>
                        </LineChart>    
                    </ResponsiveContainer>
                </CardContent>   
                </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg ={4} align="center">
                <Card variant="outlined" sx={{ maxWidth: 650 }}> 
                <CardContent>
                    <Grid container>
                        <Grid item xs>
                            <Typography component="h6" variant="button" align="left">Teplota baterie a měniče</Typography> 
                        </Grid>
                        <Grid item>
                            <IconButton sx={{padding: "0px 0px 0px 0px", color: "black"}} onClick={() => csvDownload({data: dataTeplota, headers: ["Time", "Teplota baterie", "Měnič (bod 1)", "Měnič (bod 2)","Měnič (bod 3)"]})}>
                                <FileDownloadIcon/>    
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ResponsiveContainer width="100%" aspect={2 / 1}>
                        <LineChart data={dataTeplota} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{fontSize: "12px"}}/>
                            <YAxis tickFormatter={(tick) => `${tick} °C`} domain={findDomains(dataTeplota)} tick={{fontSize: "12px"}}/>  
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="battery_temperature" stroke="#70e000" name="Teplota baterie" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Temp1" stroke="#00b4d8 " name="Měnič (bod 1)" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Temp2" stroke="#7209b7" name="Měnič (bod 2)" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Temp3" stroke="#d00000" name="Měnič (bod 3)" dot={false} strokeWidth={2}/>
                        </LineChart>    
                    </ResponsiveContainer>
                </CardContent>   
                </Card>
                </Grid>

                
                <Grid item xs={12} sm={6} md={6} lg ={4} align="center">
                <Card variant="outlined" sx={{ maxWidth: 650 }}> 
                <CardContent>
                    <Grid container>
                        <Grid item xs>
                            <Typography component="h6" variant="button" align="left">Distribuce energie</Typography> 
                        </Grid>
                        <Grid item>
                            <IconButton sx={{padding: "0px 0px 0px 0px", color: "black"}} onClick={() => csvDownload({data: dataDistribuce, headers: ["Time", "Přetok do sítě ","Výkon do domu (ze sítě)","Výkon do domu (lokální výroba)"]})}>
                                <FileDownloadIcon/>    
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ResponsiveContainer width="100%" aspect={2 / 1}>
                        <LineChart data={dataDistribuce} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{fontSize: "12px"}}/>
                            <YAxis tickFormatter={(tick) => `${tick} W`} domain={findDomains(dataDistribuce)} tick={{fontSize: "12px"}}/>  
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="PactogridTotal" stroke="#d00000" name="Přetok do sítě" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="PactouserTotal" stroke="#7209b7" name="Výkon do domu (ze sítě)" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="PLocalLoadTotal" stroke="#70e000" name="Výkon do domu (lokální výroba)" dot={false} strokeWidth={2}/>
                        </LineChart>    
                    </ResponsiveContainer>
                </CardContent>   
                </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg ={4} align="center">
                <Card variant="outlined" sx={{ maxWidth: 650 }}> 
                <CardContent>
                    <Grid container>
                        <Grid item xs>
                            <Typography component="h6" variant="button" align="left">Dodávaný výkon po fázích </Typography> 
                        </Grid>
                        <Grid item>
                            <IconButton sx={{padding: "0px 0px 0px 0px", color: "black"}} onClick={() => csvDownload({data: dataExpVykon, headers: ["Time", "Celkem", "Fáze 1", "Fáze 2", "Fáze 3"]})}>
                                <FileDownloadIcon/>    
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ResponsiveContainer width="100%" aspect={2 / 1}>
                        <LineChart data={dataExpVykon} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{fontSize: "12px"}}/>
                            <YAxis tickFormatter={(tick) => `${tick} W`} domain={findDomains(dataExpVykon)} tick={{fontSize: "12px"}}/>  
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Pac" stroke="#2196f3" name="Celkem" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Pac1" stroke="#583101" name="Fáze 1" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Pac2" stroke="#000000" name="Fáze 2" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Pac3" stroke="#6c757d" name="Fáze 3" dot={false} strokeWidth={2}/>
                        </LineChart>    
                    </ResponsiveContainer>
                </CardContent>   
                </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg ={4} align="center">
                <Card variant="outlined" sx={{ maxWidth: 650 }}> 
                <CardContent>
                    <Grid container>
                        <Grid item xs>
                            <Typography component="h6" variant="button" align="left">Dodávaný proud po fázích </Typography> 
                        </Grid>
                        <Grid item>
                            <IconButton sx={{padding: "0px 0px 0px 0px", color: "black"}} onClick={() => csvDownload({data: dataExpProud, headers: ["Time", "Fáze 1", "Fáze 2", "Fáze 3"]})}>
                                <FileDownloadIcon/>    
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ResponsiveContainer width="100%" aspect={2 / 1}>
                        <LineChart data={dataExpProud} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{fontSize: "12px"}}/>
                            <YAxis tickFormatter={(tick) => `${tick} A`} domain={findDomains(dataExpProud)} tick={{fontSize: "12px"}}/>  
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Iac1" stroke="#583101" name="Fáze 1" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Iac2" stroke="#000000" name="Fáze 2" dot={false} strokeWidth={2}/>
                            <Line type="monotone" dataKey="Iac3" stroke="#6c757d" name="Fáze 3" dot={false} strokeWidth={2}/>
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
        </Box>
    )
}

export default Device_Inverter