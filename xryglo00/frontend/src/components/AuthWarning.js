import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';


const AuthWarning = ({message}) => {
  const [open, setOpen] = React.useState(true);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  //React.useEffect( () => {setOpen(true)})

  //Najít alert co se volá jako funkce
  //toto celé smazat a warning jen do login page

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}
      message={message}>
      </Alert>
    </Snackbar>
  );
}
export default AuthWarning;