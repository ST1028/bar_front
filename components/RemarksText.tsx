import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface RemarksTextProps {
    remarksText: string;
    setRemarksText: (remarksText: string) => void;
}

export default function RemarksText({remarksText, setRemarksText}: RemarksTextProps) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="standard-basic" 
        label="Remarks" 
        variant="standard" 
        value={remarksText}
        inputProps={{
          maxLength: 37,
        }}
        onChange={(e) => {setRemarksText(e.target.value)}}
      />
    </Box>
  );
}