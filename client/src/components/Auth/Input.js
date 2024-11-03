import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Input({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        slotProps={{
          input: {
            ...(name === 'password' && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>{type === 'password' ? <Visibility /> : <VisibilityOff />}</IconButton>
                </InputAdornment>
              ),
            }),
          },
        }}
      />
    </Grid>
  );
}
