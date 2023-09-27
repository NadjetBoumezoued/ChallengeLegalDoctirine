import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import HeartIcon from '@mui/icons-material/FavoriteBorder';

const PowerThresholdFilter = ({onThresholdChange }) => {
  return (
    <div> 
      <TextField
        type="number"
        id="powerThreshold"
        placeholder="Power Threshold"
        onChange={onThresholdChange}
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <HeartIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ width: '100%' }}
      />
    </div>
  );
};

export default PowerThresholdFilter;
