import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, FormGroup, InputLabel, TextField, Button } from "@mui/material";

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
        console.log(userLabel)
        //sem musím přídat POST CALL na API, aby se mi upravilo zařízení.
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