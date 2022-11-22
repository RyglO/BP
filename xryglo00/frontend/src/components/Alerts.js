import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';



const AuthWarning = () => {
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
  setState({ ...state, open: false });
  };
  
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Přihlášení selhalo!
      </Alert>
    </Snackbar>
    // <Stack sx={{ width: '100%' }} spacing={2}>
    //   <Alert severity="error">
    //     <AlertTitle>401 - Unauthorized</AlertTitle>
    //     <strong>Authentication failed</strong>
    //   </Alert>
    // </Stack>
  );
}
export default AuthWarning;