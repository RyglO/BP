import React, {useEffect, useState} from "react";
import {Dialog} from "@mui/material";
import {DialogTitle} from "@mui/material";
import {DialogContent} from "@mui/material";
import {DialogActions} from "@mui/material";
import {Button} from "@mui/material";
import {Switch} from "@mui/material";
import {Slider} from "@mui/material";
import {FormControl} from "@mui/material";
import {InputLabel} from "@mui/material";
import {Select} from "@mui/material";
import {MenuItem} from "@mui/material";
import {FormGroup} from "@mui/material";
import {FormControlLabel} from "@mui/material";
import { Form } from "react-router-dom";

const GraphSettingsDialog = ({open, handleClose, currentSettings, saveSettings}) => {
    const [isLive, setIsLive] = useState(currentSettings.isLive );
    const [intervalValue, setIntervalValue] = useState(currentSettings.intervalValue);
    const [historyValue, setHistoryValue] = useState(currentSettings.historyValue);

    const handleLiveChange = (event) => {
        setIsLive(event.target.checked)
    }

    const handleIntervalChange = (event) => {
        setIntervalValue(event.target.value)
    }

    const handleHistoryChange = (event) => {
        setHistoryValue(event.target.value)
    }

    const handleSave = () => {
        saveSettings({isLive, intervalValue, historyValue})
        handleClose();
    }

    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Nastavení</DialogTitle>
            <DialogContent>
                <FormGroup>
                        <InputLabel id="interval-label">Interval dat</InputLabel>
                        <Select value={intervalValue} onChange={handleIntervalChange}>
                            <MenuItem value={1}>1 minuta</MenuItem>
                            <MenuItem value={5}>5 minut</MenuItem>
                            <MenuItem value={15}>15 minut</MenuItem>
                            <MenuItem value={30}>30 minut</MenuItem>
                            <MenuItem value={60}>60 minut</MenuItem>
                            <MenuItem value={360}>6 hodin</MenuItem>
                        </Select>
                        <InputLabel id="history-label">Zobrazované období</InputLabel>
                        <Select value={historyValue} onChange={handleHistoryChange}>
                            <MenuItem value={60}>1 hodina</MenuItem> 
                            <MenuItem value={560}>6 hodin</MenuItem>
                            <MenuItem value={720}>12 hodin</MenuItem>
                            <MenuItem value={1440}>24 hodin</MenuItem>
                            <MenuItem value={2880}>48 hodin</MenuItem>
                            <MenuItem value={10080}>Poslední týden</MenuItem>
                        </Select>
                        <FormControlLabel control={<Switch checked={isLive} onChange={handleLiveChange}/>} label = "Živá data" />    
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

};

export default GraphSettingsDialog;