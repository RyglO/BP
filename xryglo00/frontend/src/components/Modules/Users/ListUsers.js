import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Auth from "../../Auth";
import EditUserDialog from "./EditUserDialog";
import CreateUserDialog from "./CreateUserDialog";

const ListUsers = () => {
  
    const [users, setUsers] = useState([]);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleButtonClick = (data) => {
        setOpenDialogEdit(true);
        setSelectedUser(data);
    };
  
    const handleClose = () => {
        setSelectedUser(null)
        setOpenDialogEdit(false)
        setOpenDialogAdd(false)
    };

    const loadUsers = async () => {
      const requestOptions = {
        method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": Auth.getJwt(),
                "customerID": Auth.getCustomerID(),
                "sortProperty": "createdTime", 
                "order": "ASC"
            }),
      }
      await fetch("api/customers", requestOptions)
        .then((response) => 
            response.json())
            .then((data) =>{
            setUsers(data.data)
        })
    }
    useEffect(() => {
      loadUsers()
    }, [])

    const renderDialog = (userData) => {
        if(selectedUser === userData)
        {
            return(
                <EditUserDialog open={true} handleClose={handleClose} userData={userData} />
            )    
        }
    }

    const handleNewUserclick = () => {
        setOpenDialogAdd(true)
    }

    const renderAddDialog = () => {
        if(openDialogAdd)
            return(
                <CreateUserDialog open={true} handleClose={handleClose}/>
            )
    }


  	return (
      <>
        <Button variant='contained' sx={{ float: 'right', marginRight: "50px", marginTop: "10px" }} color="primary" onClick={() => handleNewUserclick()}>
        Přidat nového uživatele
        </Button>
        {renderAddDialog()}
        <Paper sx={{ margin: "50px 50px 50px 50px"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Datum vytvoření</TableCell>
                            <TableCell align="center">Jméno</TableCell>
                            <TableCell align="center">Přijmení</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Oprávnění</TableCell>
                            <TableCell align="center">Upravit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        users.map((data) => (
                            <TableRow RowKey={data.name}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{new Date(data.createdTime).toLocaleString("cs-CZ")}</TableCell>
                                <TableCell align="center">{data.firstName}</TableCell>
                                <TableCell align="center">{data.lastName}</TableCell>
                                <TableCell align="center">{data.email}</TableCell>
                                <TableCell align="center">{data.authority}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="secondary" onClick={() => handleButtonClick(data)}>Upravit</Button>  
                                    {renderDialog(data)}
                                </TableCell> 
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
      </>
)
}
export default ListUsers