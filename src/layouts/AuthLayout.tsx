import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { IPropsLayout } from '@/types/index';

const AuthLayout: React.FC<IPropsLayout> = ({ children }: IPropsLayout): JSX.Element => {
  return (
      <Grid
        container
        sx={{
          height: '100%'
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: 1,
            borderColor: grey[200],
            background: 'white',
            minWidth: '340px'
          }}
        >
          { children }
        </Box>
      </Grid>
  );
};

export default AuthLayout;
