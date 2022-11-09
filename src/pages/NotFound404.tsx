import * as React from 'react';
import { Grid, Typography } from '@mui/material';

const NotFound404: React.FC = (): JSX.Element => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100%'
      }}
    >
      <Typography variant="h4">
        404 Страница не найдена :(
      </Typography>
    </Grid>
  );
};

export default NotFound404;
