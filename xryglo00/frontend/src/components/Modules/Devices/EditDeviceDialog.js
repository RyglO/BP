import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, FormGroup, InputLabel, TextField } from "@mui/material";

const EditDeviceDialog = ({open, handleClose, currentUserLabel, saveUserLabel}) => {

    const [userLabel, setUserLabel] = useState(currentUserLabel);

    const handleLabelChange = (event) => {
        setUserLabel(event.target.value)
    }

    const handleSave = () => 
    {
        saveUserLabel = userLabel
        handleClose();
    }


    return(
        <Dialog opne={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Nastavení zařízení</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <InputLabel id="userName-label">Vlastní jméno zařízení</InputLabel>
                    <TextField fullWidth label="Vlastní jméno zařízení" onChange={handleLabelChange}/>    
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

export default EditDeviceDialog