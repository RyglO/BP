import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Auth from "../../Auth";

const ListUsers = () => {
  
    const [users, setUsers] = useState([]);
    const [openDialogNew, setOpenDialogNew] = useState(false);


    const loadUsers = () => {
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
      fetch("api/customers", requestOptions)
        .then((response) => 
            response.json())
            .then((data) =>{
            setUsers(data.data)
        })
    }
    //Upravit a vytvořit API call na uživatele.
  
    useEffect(() => {
      loadUsers()
    }, [])

  	return (
      <>
        <Button variant='contained' sx={{ float: 'right', marginRight: "50px", marginTop: "10px" }} color="primary">
        Přidat nového uživatele
        </Button>      
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
                  {console.log(users)}
                  {
                    users.map((data) => (
                      <TableRow RowKey={data.name}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{new Date(data.createdTime).toLocaleString("cs-CZ")}</TableCell>
                        <TableCell align="center">{data.firstName}</TableCell>
                        <TableCell align="center">{data.lastName}</TableCell>
                        <TableCell align="center">{data.email}</TableCell>
                        <TableCell align="center">{data.authority}</TableCell>
                        <TableCell align="center">banán</TableCell> 
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