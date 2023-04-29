import { FormControl, FormGroup, InputLabel, Paper, TextField, Typography, Box, Button, IconButton, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const CurrentUserProfile = (userData) => {
    const [user, setUser] = useState(userData)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [newPasswordVerify, setNewPasswordVerify] = useState("")
    const [isPasswordSame, setIsPasswordSame] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSaveClick = () => {
        
    }

    useEffect(() => {
        newPassword !== newPasswordVerify ? setIsPasswordSame(true) : setIsPasswordSame(false)
    })

    return(
        <>
            <Typography sx={{ marginTop: "30px", marginLeft: "100px"}} variant="h5">
                Nastavení uživate
            </Typography>
            <Box sx={{ margin: "20px 50px 50px 100px", display: 'flex', flexDirection: 'column', }} elevation={3}> 
                    <Box component="form" sx={{border: "2px solid grey", display: 'flex', flexDirection: 'column', borderRadius: "8px", maxWidth:"500px"}}>
                        <InputLabel sx={{ margin: "5px 15px 0px 15px"}}>Jméno</InputLabel>
                        <TextField defaultValue={user.firstName} sx={{ margin: "0px 15px 5px 15px"}} variant="standard" disabled/>
                        <InputLabel sx={{ margin: "5px 15px 0px 15px"}}>Přijmení</InputLabel>
                        <TextField defaultValue={user.lastName} sx={{ margin: "0px 15px 5px 15px"}} variant="standard" disabled/>
                        <InputLabel sx={{ margin: "5px 15px 0px 15px"}}>Email</InputLabel>
                        <TextField defaultValue={user.email} sx={{ margin: "0px 15px 5px 15px"}} variant="standard" disabled/>
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
                        <Button onClick={handleSaveClick}>
                            Uložit
                        </Button>
                    </Box>  
            </Box>
        </>
    )
}
export default CurrentUserProfile