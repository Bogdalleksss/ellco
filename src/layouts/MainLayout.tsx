import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '@/layouts/Header/Header';
import Sidebar from '@/layouts/Sidebar/Sidebar';
import { IPropsLayout } from '@/types/index';

const MainLayout: React.FC<IPropsLayout> = ({ children }: IPropsLayout): JSX.Element => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'grid',
        gridTemplateAreas: `
          "head head"
          "bar main"
        `,
        gridTemplateRows: '60px 1fr',
        gridTemplateColumns: '290px 1fr'
      }}
    >
      <Header />
      <Sidebar
        width={290}
      />
      <Grid
        component="main"
        container
        sx={{
          gridArea: 'main',
          p: 2
        }}
        flexDirection="column"
      >
        { children }
      </Grid>
    </Box>
  );
};

export default MainLayout;
