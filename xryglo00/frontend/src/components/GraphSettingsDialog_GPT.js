  import React, { useState } from 'react';
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Switch,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
  } from '@mui/material';

  const SettingsWindow = ({ open, handleClose }) => {
    const [isLive, setIsLive] = useState(false);
    const [intervalValue, setIntervalValue] = useState(1);
    const [selectedChart, setSelectedChart] = useState('line');
    const [lineColor, setLineColor] = useState('#2196f3');
    const [barColor, setBarColor] = useState('#f44336');

    const handleLiveChange = (event) => {
      setIsLive(event.target.checked);
    };

    const handleIntervalChange = (event, newValue) => {
      setIntervalValue(newValue);
    };

    const handleChartChange = (event) => {
      setSelectedChart(event.target.value);
    };

    const handleLineColorChange = (event) => {
      setLineColor(event.target.value);
    };

    const handleBarColorChange = (event) => {
      setBarColor(event.target.value);
    };

    const handleSave = () => {
      // Do something with the settings
      handleClose();
    };

    return (
      <Dialog open={open} onClose={handleClose} fullWidth={true} >
        <DialogTitle>Nastavení</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={isLive} onChange={handleLiveChange} />
              }
              label="Živá data"
            />
            <FormControl>
              <InputLabel id="interval-label">Interval (seconds)</InputLabel>
              <Slider
                value={intervalValue}
                min={1}
                max={60}
                step={1}
                marks={[
                  { value: 1, label: '1 minuta' },
                  { value: 5, label: '5 minut' },
                  { value: 15, label: '15 minut' },
                  { value: 30, label: '30 minut' },
                  { value: 60, label: '1 hodina' },
                  { value: 720, label: '12 hodin' },
                  { value: 1440, label: '24 hodin' },
                ]}
                onChange={handleIntervalChange}
                aria-labelledby="interval-label"
              />
            </FormControl>
            <FormControl>
              <InputLabel id="chart-label">Chart Type</InputLabel>
              <Select
                value={intervalValue}
                onChange={handleIntervalChange}
                labelId="interval-label"
              >
                <MenuItem value="1">1 minuta</MenuItem>
                <MenuItem value="5">5 minut</MenuItem>
                <MenuItem value="15">15 minut</MenuItem>
                <MenuItem value="30">30 minut</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="chart-label">Chart Type</InputLabel>
              <Select
                value={selectedChart}
                onChange={handleChartChange}
                labelId="chart-label"
              >
                <MenuItem value="line">Line</MenuItem>
                <MenuItem value="bar">Bar</MenuItem>
                <MenuItem value="pie">Pie</MenuItem>
              </Select>
            </FormControl>
            {selectedChart === 'line' && (
              <FormControl>
                <InputLabel id="line-color-label">Line Color</InputLabel>
                <input
                  type="color"
                  value={lineColor}
                  onChange={handleLineColorChange}
                  id="line-color-picker"
                />
              </FormControl>
            )}
            {selectedChart === 'bar' && (
              <FormControl>
                <InputLabel id="bar-color-label">Bar Color</InputLabel>
                <input
                  type="color"
                  value={barColor}
                  onChange={handleBarColorChange}
                  id="bar-color-picker"
                />
              </FormControl>
            )}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
              Save
          </Button>
      </DialogActions>
      </Dialog>
      );
  };

  export default SettingsWindow;