import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Typography } from '@mui/material';
import { FaRegQuestionCircle } from 'react-icons/fa';

const TooltipComponent = ({ msg }) => {
  // Split the msg based on <br/> to handle line breaks
  const messageParts = msg.split('<br/>');

  return (
    <Tooltip
      title={
        <React.Fragment>
          {messageParts.map((part, index) => (
            <Typography key={index} variant="body2">
              {part}
            </Typography>
          ))}
        </React.Fragment>
      }
      placement="top"
    >
      <IconButton>
        <FaRegQuestionCircle className='text-neutralGrey text-sm'/>
      </IconButton>
    </Tooltip>
  );
}

export default TooltipComponent;
