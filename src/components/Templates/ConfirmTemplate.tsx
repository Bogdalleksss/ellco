import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { IOptionsConfirm } from '@/services/confirm/ConfirmProvider';

interface IProps extends IOptionsConfirm {
  onClose: () => void
}

// eslint-disable-next-line react/display-name
const ConfirmTemplate = React.forwardRef<React.FC<IProps>, IProps>(
  (
    { message, buttons, onClose }: IProps,
    ref
  ) => {
    const onClick = (cb) => {
      cb();
      onClose();
    };

    return (
      <Box
        ref={ref}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '290px',
          textAlign: 'center',
          border: 1,
          borderColor: 'rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
          p: 2
        }}
        bgcolor="white"
        tabIndex={1}
      >
        <Typography variant="body1">{ message }</Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            marginTop: 2
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{
              marginRight: 1
            }}
            onClick={() => onClick(buttons.confirm.onClick)}
          >
            { buttons.confirm.name }
          </Button>
          <Button
            variant="outlined"
            onClick={() => onClick(buttons.cancel.onClick)}
          >
            { buttons.cancel.name }
          </Button>
        </Grid>
      </Box>
    );
  });

export default ConfirmTemplate;
