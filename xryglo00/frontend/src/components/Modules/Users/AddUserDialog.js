import { Dialog, DialogContent, DialogTitle, DialogActions, Button, FormGroup, InputLabel, TextField, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Auth from "../../Auth";


const AddEditUserDialog = ({open, handleClose, userData}) => {
    const[user, setUser] = useState(userData)
    const[firstName, setFirstName] = useState(userData.firstName)
    const[lastName, setLastName] = useState(userData.lastName)
    const[email, setEmail] = useState(userData.email)
    const[role, setRole] = useState(userData.authority)


    const handleSave = () => {
        saveUser()
        handleClose()
    }
    
    const saveUser = () => {
        userData.firstName = firstName
        userData.lastName = lastName
        userData.email = email
        userData.authority = role

        console.log(userData)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${Auth.getJwt()}`,
            },
            body: JSON.stringify({
                userData,
            }),
        };
        fetch("api/postUser", requestOptions)
        }



    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Nastavení uživatele</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <InputLabel id="usernameLabel">Jméno</InputLabel>
                    <TextField fullWidth defaultValue={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <InputLabel id="lastnameLabel">Přijmení</InputLabel>
                    <TextField fullWidth defaultValue={lastName} onChange={e => setLastName(e.target.value)}/>
                    <InputLabel id="emailLabel">Email</InputLabel>
                    <TextField fullWidth defaultValue={email} onChange={e => setEmail(e.target.value)}/>
                    <InputLabel id="roleLabel">Role</InputLabel>
                    <Select value={role} onChange={e => setRole(e.target.value)}>
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
        </Dialog>
    )
}
export default AddEditUserDialog