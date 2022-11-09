import * as React from 'react';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authLogout } from '@/store/auth/AuthAsync';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { IUser } from '@/types/index';

const HeaderUserMenu: React.FC = (): JSX.Element => {
  const settings = [
    {
      id: 0,
      title: 'Logout',
      Icon: () => <Logout sx={{ marginRight: 1, color: red[400] }}/>,
      action: () => logout()
    }
  ];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const error = useAppSelector(state => state.auth.error);
  const me: IUser = useAppSelector(state => state.auth.me);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    dispatch(authLogout());
  };

  return (
    <Box
      sx={{
        flexGrow: 0,
        marginRight: 4
      }}
    >
      <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Grid
          container
          alignItems="center"
          gap={1}
        >
          <Avatar alt={me.email} />
          <Typography
            variant="subtitle2"
            color="white"
          >
            { me.email }
          </Typography>
        </Grid>
      </Button>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => {
          const { Icon, id, title, action } = setting;

          return (
            <MenuItem key={ id } onClick={action}>
              <Icon />
              <Typography textAlign="center">{ title }</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default HeaderUserMenu;
