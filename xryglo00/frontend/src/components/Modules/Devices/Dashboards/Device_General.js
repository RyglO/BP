import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "../../../Auth";
import Device_Gateway from "./Device_Gateway";
import Device_thermometer from "./Device_thermometer";
import Device_not_implemented from "./Device_not_implemented";
import DeviceDisconected from "./DeviceDisconected";
import Device_Inverter from "./Device_Inverter";


const Device_General = () => {
    const [deviceStatus, setDeviceStatus] = useState('loading')

    const {id, devicetype} = useParams();

    const loadDeviceType = async (id, devicetype) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${Auth.getJwt()}`,
            }, 
            body: JSON.stringify({
                'deviceType': 'DEVICE',
                'deviceID': id,
            })
        }

        const isActive = await fetch("../../api/deviceStatus", requestOptions)
        .then((response) => response.json()).then(data => data[0].value)

        setDeviceStatus(isActive ? devicetype : 'disconected')
    }


    useEffect(() => {
        loadDeviceType(id, devicetype)
    }, [])


    return (            
        <div>
            {deviceStatus === 'loading' ?  <></> :
            deviceStatus === 'ESP32_OTA_ELMETER' ?  <Device_Gateway /> : 
            deviceStatus === 'ESP32_OTA_SENSOR' ? <Device_thermometer /> :
            deviceStatus === 'ESP32_OTA_INVERTER' ? <Device_Inverter /> :
            deviceStatus === 'disconected' ? <DeviceDisconected /> : 
            <Device_not_implemented />}
        </div>
    )
    }

export default Device_General