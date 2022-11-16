import React, {Component} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        this.handleLoginButton = this.handleLoginButton.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    }

    handleEmailChanged(e){
        this.setState({
            email: e.target.value,
        });
    }
    handlePasswordChanged(e){
        this.setState({
            password: e.target.value,
        });
    }
    handleLoginButton() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
            }),
        };
        fetch("api/login", requestOptions)
        .then((response) => 
        response.json())
         .then((data) =>   
        console.log(data));
        
    }
    render(){

        return( //<h1> Text</h1> 
        <Grid container spacing={1}> 
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Wattee
                </Typography>   
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Přihlašte se prosím
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
             <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="text" label="Email" onChange={this.handleEmailChanged}/>     
                </FormControl>    
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="password" label="Heslo" onChange={this.handlePasswordChanged}/>     
                </FormControl>     
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' onClick={this.handleLoginButton}>
                    Přihlásit se
                </Button>        
            </Grid>   
        </Grid>
        );
    }

}