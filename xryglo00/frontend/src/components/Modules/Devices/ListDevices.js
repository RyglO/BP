import React, { useDebugValue, useEffect, useState } from 'react'
import { Button, Container, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Auth from '../../Auth';
import EditDeviceDialog from './EditDeviceDialog';

const ListDevices = () => {
    
    const [devices, setDevices] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); 
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceStatus, setDeviceStatus] = useState({});

    const handleButtonClick = (data) => {
        setOpenDialog(true);
        setSelectedDevice(data);
    };
  
    const handleClose = () => {
        setSelectedDevice(null);
        setOpenDialog(false);
    };

    const loadDevices = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": Auth.getJwt(),
                "LoggedUser": Auth.getUserName(),
            }),
        };
        fetch("api/users", requestOptions)
        .then((response) => 
            response.json())
            .then(async (data) =>{
                setDevices(data.data)

                setDeviceStatus((await Promise.all(
                        data.data.map(async ({id}) => await getDeviceStatus(id.id)))).reduce(
                        (accumulator, currentValue) => ({...accumulator, ...currentValue}),
                        {}
                    ))

            
        }
        )
    }

    const getDeviceStatus = async (deviceID) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${Auth.getJwt()}`,
            }, 
            body: JSON.stringify({
                'deviceType': 'DEVICE',
                'deviceID': deviceID,
            })
        }
        return await fetch("api/deviceStatus", requestOptions)
        .then((response) =>
            response.json())
            .then((data) => ({[deviceID]: data[0].value}))
            
    }

    useEffect(() => {
        loadDevices()
    },[])

    const renderDialog = (entityData) => {
        if(selectedDevice === entityData)
        {
            return(
                <EditDeviceDialog open={true} handleClose={handleClose} data={entityData} />
            )    
        }
    }


    return(
        <>
        <Button variant='contained' sx={{ float: 'right', marginRight: "50px", marginTop: "10px" }} color="primary">
            Přidat nové zařízení
        </Button>        
        <Paper sx={{ margin: "50px 50px 50px 50px" }} elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Čas vytvoření</TableCell>
                                <TableCell align="center">Název zařízení</TableCell>
                                <TableCell align="center">Uživatelský název</TableCell>
                                <TableCell align="center">Typ zařízení</TableCell>
                                <TableCell align="center">Aktivní</TableCell>
                                <TableCell align="center">Upravit zaznam</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {devices.map((data) => (
                                <TableRow Rowkey={data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{new Date(data.createdTime).toLocaleString("cs-CZ")}</TableCell>
                                    <TableCell align="center">{data.name}</TableCell>
                                    <TableCell align="center">{data.label}</TableCell>
                                    <TableCell align="center">{data.id.entityType}</TableCell>
                                    <TableCell align="center">{deviceStatus[data.id.id] ? 'Připojeno': 'Odpojeno'}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="secondary" onClick={() => handleButtonClick(data)}>
                                            Upravit
                                        </Button>
                                        {renderDialog(data)}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            </>
        
    )

}

export default ListDevices