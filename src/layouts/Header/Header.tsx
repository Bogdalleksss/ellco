import * as React from 'react';
import { AppBar, Grid } from '@mui/material';
import Logo from '@/components/Logo';
import HeaderUserMenu from '@/layouts/Header/HeaderUserMenu';

const Header: React.FC = (): JSX.Element => {
  return (
    <AppBar
      color="primary"
      position="fixed"
      elevation={0}
      sx={{
        gridArea: 'head',
        zIndex: (theme) => theme.zIndex.drawer + 2
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2
        }}
      >
        <Logo fill="#FFFFFF" />
        <HeaderUserMenu />
      </Grid>
    </AppBar>
  );
};

export default Header;
