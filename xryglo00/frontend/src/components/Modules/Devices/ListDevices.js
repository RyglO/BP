import React, { useDebugValue, useEffect, useState } from 'react'
import { Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Auth from '../../Auth';
import EditDeviceDialog from './EditDeviceDialog';

const ListDevices = () => {
    
    const [devices, setDevices] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); 

    const handleButtonClick = (davideID) => {
        setOpenDialog(true);
    };
  
    const handleClose = () => {
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
            .then((data) =>{
            setDevices(data.data)
        }
        )
    }

    useEffect(() => {
        loadDevices()
    },[])

    const renderDialog = (label) => {
        return(
            <EditDeviceDialog open={true} handleClose={handleClose} currentUserLabel={label} />
        )
    }


    return(
        <Paper sx={{ margin: "50px 50px 50px 50px"}}>
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
                    {devices.map((data)=> (
                        <TableRow Rowkey={data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{new Date(data.createdTime).toLocaleString("cs-CZ")}</TableCell>
                            <TableCell align="center">{data.name}</TableCell>
                            <TableCell align="center">{data.label}</TableCell>
                            <TableCell align="center">{data.id.entityType}</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" color="secondary" onClick={handleButtonClick(data.id)}>
                                    Upravit 
                                </Button>
                                {openDialog && renderDialog(data.label)}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        
    )

}

export default ListDevices