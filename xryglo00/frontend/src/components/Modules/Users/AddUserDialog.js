import { Dialog, DialogContent, DialogTitle, DialogActions, Button, FormGroup, InputLabel, TextField, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";


const AddEditUserDialog = ({open, handleClose, userData}) => {
    const[user, setUser] = useState(userData)

    const handleSave = () => {
        saveUser()
        handleClose()
    }
    
    const saveUser = () => {
        console.log(user)
    }


    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Nastavení uživatele</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <InputLabel id="usernameLabel">Jméno</InputLabel>
                    <TextField fullWidth defaultValue={user.firstName}/>
                    <InputLabel id="usernameLabel">Přijmení</InputLabel>
                    <TextField fullWidth defaultValue={user.lastName}/>
                    <InputLabel id="usernameLabel">Email</InputLabel>
                    <TextField fullWidth defaultValue={user.email}/>
                    <InputLabel id="usernameLabel">Role</InputLabel>
                    <Select value={user.authority}>
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