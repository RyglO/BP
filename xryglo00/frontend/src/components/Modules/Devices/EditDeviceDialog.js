import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, FormGroup, InputLabel, TextField, Button } from "@mui/material";
import Auth from "../../Auth";

const EditDeviceDialog = ({open, handleClose, data}) => {

    const [userLabel, setUserLabel] = useState(data.label);

    const handleLabelChange = (event) => {
        setUserLabel(event.target.value)
    }

    const handleSave = () => 
    {
        postNewLabel();
        handleClose();
    }
    
    const postNewLabel = () => {
        data.label = userLabel
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${Auth.getJwt()}`,
            },
            body: JSON.stringify({
                data,
            }),
        };
        fetch("api/deviceLabel", requestOptions)
    }


    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Nastavení zařízení</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <InputLabel id="userName-label">Vlastní jméno zařízení</InputLabel>
                    <TextField fullWidth defaultValue={userLabel} onChange={handleLabelChange}/>    
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