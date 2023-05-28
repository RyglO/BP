import { FormControl, FormGroup, InputLabel, Paper, TextField, Typography, Box, Button, IconButton, InputAdornment, Snackbar, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Auth from "../../Auth";


const CurrentUserProfile = () => {
    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [newPasswordVerify, setNewPasswordVerify] = useState("")
    const [isPasswordSame, setIsPasswordSame] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [passwordChangeFailed, setPasswordChangeFailed] = useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSaveClick = () => {
        if(newPassword === "" || currentPassword === "")    
            setPasswordChangeFailed(true)
        else
            setChangePassword()
    }

    const getCurrentuserInfo = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": Auth.getJwt()
            }),
        };
        await fetch("api/userInfo", requestOptions)
        .then((response) => 
        response.json())
         .then((data) =>{   
            setUserEmail(data.email)
            setUserFirstName(data.firstName)
            setUserLastName(data.lastName)
         })}
    
    const setChangePassword = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-Authorization': `Bearer ${Auth.getJwt()}`,
            },
            body: JSON.stringify({
                "currentPassword": currentPassword,
                "newPassword": newPassword,
            }),
        };
        fetch("api/changePassword", requestOptions)
        .then((response) => 
        response.json())
         .then((data) =>{
            if(data.status > 200)
                setPasswordChangeFailed(true)
            else
                setPasswordChangeSuccess(true)
         })}

    const handleAlertClose = () => {
        setPasswordChangeFailed(false)
        setPasswordChangeSuccess(false)
    }


    useEffect(() => {
        newPassword !== newPasswordVerify ? setIsPasswordSame(true) : setIsPasswordSame(false)
    })

    useEffect(() => {
        getCurrentuserInfo()
    }, [])

    return(
        <>
            <Typography sx={{ marginTop: "30px", marginLeft: "100px"}} variant="h5">
                Nastavení uživate
            </Typography>
            <Box sx={{ margin: "20px 50px 50px 100px", display: 'flex', flexDirection: 'column', }} elevation={3}> 
                    <Box component="form" sx={{border: "2px solid grey", display: 'flex', flexDirection: 'column', borderRadius: "8px", maxWidth:"500px"}}>
                        <InputLabel sx={{ margin: "5px 15px 0px 15px"}}>Jméno</InputLabel>
                        <TextField value={userFirstName} sx={{ margin: "0px 15px 5px 15px"}} variant="standard" disabled/>
                        <InputLabel sx={{ margin: "5px 15px 0px 15px"}}>Přijmení</InputLabel>
                        <TextField value={userLastName} sx={{ margin: "0px 15px 5px 15px"}} variant="standard" disabled/>
                        <InputLabel sx={{ margin: "5px 15px 0px 15px"}}>Email</InputLabel>
                        <TextField value={userEmail} sx={{ margin: "0px 15px 5px 15px"}} variant="standard" disabled/>
                    </Box>
                    <Box component="form" sx={{ marginTop: "50px", display: 'flex', flexDirection: 'column', border: "2px solid grey", borderRadius: "8px", maxWidth:"500px"}}>
                        <InputLabel sx={{ margin: "5px 15px 5px 15px"}}>Změna hesla</InputLabel>
                        <TextField label="Stávající heslo" sx={{ margin: "5px 15px 5px 15px"}} onChange={e => setCurrentPassword(e.target.value)} type={showPassword ? 'text' : 'password'} 
                        InputProps={{endAdornment: <InputAdornment position="end"><IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>}}
                        />
                        <TextField label="Nové heslo" sx={{ margin: "5px 15px 5px 15px"}} onChange={e => setnewPassword(e.target.value)} error={isPasswordSame} type={showPassword ? 'text' : 'password'}
                        InputProps={{endAdornment: <InputAdornment position="end"><IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>}}
                        />
                        <TextField label="Nové heslo znovu" sx={{ margin: "5px 15px 5px 15px"}} onChange={e => setNewPasswordVerify(e.target.value)} error={isPasswordSame} type={showPassword ? 'text' : 'password'}
                        InputProps={{endAdornment: <InputAdornment position="end"><IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>}}
                        />
                        <Button onClick={handleSaveClick} disabled={isPasswordSame}>
                            Uložit
                        </Button>
                        <Snackbar open={passwordChangeSuccess} onClose={handleAlertClose} autoHideDuration={3000} message="Heslo bylo úspěšně změněno." TransitionComponent={Slide}/> 
                        <Snackbar open={passwordChangeFailed} onClose={handleAlertClose} autoHideDuration={3000} message="Nastala chyba při změně hesla." TransitionComponent={Slide}/>
                    </Box>  
            </Box>
        </>
    )
}
export default CurrentUserProfile