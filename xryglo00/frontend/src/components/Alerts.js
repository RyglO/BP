import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function AuthWarning() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>401 - Unauthorized</AlertTitle>
        <strong>Authentication failed</strong>
      </Alert>
    </Stack>
  );
}