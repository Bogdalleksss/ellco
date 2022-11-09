import * as React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface IProps {
  isPending: boolean
  description: string
}

const WithoutData: React.FC<IProps> = ({ isPending, description }: IProps): JSX.Element => {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        width: '100%',
        paddingTop: 16
      }}
    >
      {
        isPending
          ? <CircularProgress />
          : <Typography
              variant="body1"
              color={grey[500]}
            >
              { description }
            </Typography>
      }
    </Grid>
  );
};

export default WithoutData;
