import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({ value, height, borderRadius, ...otherProps }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: height || 10,
            borderRadius: borderRadius || 5,
          }}
          value={value}
          {...otherProps}
        />
      </Box>
      <Box sx={{ minWidth: 35, mt: 1 }}>
        <Typography variant="h6" color="text.secondary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({ progress }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} color="success"/>
    </Box>
  );
}
