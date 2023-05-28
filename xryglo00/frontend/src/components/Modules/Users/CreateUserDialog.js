import { Dialog, DialogContent, DialogTitle, DialogActions, Button, FormGroup, InputLabel, TextField, Select, MenuItem, Snackbar, Slide } from "@mui/material";
import React, { useState } from "react";
import Auth from "../../Auth";


const CreateUserDialog = ({open, handleClose}) => {
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[email, setEmail] = useState("")
    const[role, setRole] = useState("")
    const[creationFailed, setCreationFailed] = useState(false)


    const handleSave = () => {
        createUser()
    }
    
    const createUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-Authorization': `Bearer ${Auth.getJwt()}`,
            },
            body: JSON.stringify({
                'email': email,
                'authority': role,
                'firstName': firstName,
                'lastName': lastName,
                'customerID': Auth.getCustomerID()
            }),
        };
        fetch("api/createUser", requestOptions)
        .then((response) => 
        response.json())
         .then(async(data) =>{
            console.log(data)   
        if (data.status > 200) 
            setCreationFailed(true)
        else{
            handleClose()
        }
        })
    }

        const handleAlertClose = () => {
            setCreationFailed(false);
        }


    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Vytvoření nového uživatele</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <InputLabel id="usernameLabel">Jméno</InputLabel>
                    <TextField fullWidth defaultValue={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <InputLabel id="lastnameLabel">Přijmení</InputLabel>
                    <TextField fullWidth defaultValue={lastName} onChange={e => setLastName(e.target.value)}/>
                    <InputLabel id="emailLabel">Email</InputLabel>
                    <TextField required fullWidth defaultValue={email} onChange={e => setEmail(e.target.value)} error={creationFailed}/>
                    <InputLabel id="roleLabel">Role</InputLabel>
                    <Select required value={role} onChange={e => setRole(e.target.value)}>
                            <MenuItem value={"CUSTOMER_USER"}>Uživatel</MenuItem> 
                            <MenuItem value={"TENANT_ADMIN"}>Administrátor</MenuItem>
                    </Select>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Zrušit
                </Button>
                <Button onClick={handleSave} color="primary">
                    Uložit
                </Button>
            </DialogActions>
            <Snackbar open={creationFailed} onClose={handleAlertClose} autoHideDuration={3000} message="Nastala chyba při vytváření uživatele" TransitionComponent={Slide}></Snackbar>
        </Dialog>
    )
}
export default CreateUserDialog