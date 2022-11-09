import * as React from 'react';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';
import {
  AttachMoney,
  Dashboard,
  Discount,
  ExpandLess, ExpandMore, Info,
  LocationCity,
  LocationOn,
  Newspaper,
  People,
  PriceChange,
  Settings
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { useState } from 'react';

interface IProps {
  width?: number
}

const routes = [
  // {
  //   id: 0,
  //   title: 'Дашборд',
  //   link: '/',
  //   Icon: (props) => <Dashboard {...props} />
  // },
  {
    id: 1,
    title: 'Пользователи',
    link: '/users',
    Icon: (props) => <People {...props} />
  },
  {
    id: 6,
    title: 'Новости',
    link: '/news',
    Icon: (props) => <Newspaper {...props} />
  },
  {
    id: 5,
    title: 'Акции',
    link: '/promotions',
    Icon: (props) => <Discount {...props} />
  },
  // {
  //   id: 4,
  //   title: 'Тарифы',
  //   link: '/tariffs',
  //   Icon: (props) => <AttachMoney {...props} />
  // },
  {
    id: 7,
    title: 'Районы',
    link: '/districts',
    Icon: (props) => <LocationOn {...props} />
  },
  {
    id: 3,
    title: 'Населенные пункты',
    link: '/settlements',
    Icon: (props) => <LocationCity {...props} />
  }
];

const settings = [
  {
    id: 101,
    title: 'Информация',
    link: '/information',
    Icon: (props) => <Info {...props} />
  },
  {
    id: 102,
    title: 'Заказ',
    link: '/order',
    Icon: (props) => <PriceChange {...props} />
  }
];

const Sidebar: React.FC<IProps> = ({ width = 200 }: IProps): JSX.Element => {
  const [showSetting, updateShowSettings] = useState(false);
  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        gridArea: 'bar',
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box'
        }
      }}
    >
      <Toolbar />
      <Box
        sx={{
          height: '100%',
          p: 2
        }}
      >
        <List>
          {
            routes.map(route => {
              const { Icon, title, id, link } = route;

              return (
                <ListItem
                  key={id}
                  disablePadding
                >
                  <NavLink
                    to={link}
                    exact
                    style={{
                      width: '100%'
                    }}
                    activeStyle={{
                      background: grey[200]
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon
                          sx={{ color: '#000000' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={title}
                        sx={{ color: '#000000' }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              );
            })
          }
          <ListItemButton onClick={() => updateShowSettings(!showSetting)}>
            <ListItemIcon>
              <Settings sx={{ color: '#000000' }} />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
            {showSetting ? <ExpandLess sx={{ color: '#000000' }} /> : <ExpandMore sx={{ color: '#000000' }} />}
          </ListItemButton>
          <Collapse in={showSetting} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                settings.map(setting => {
                  const { Icon, title, id, link } = setting;
                  return (
                    (
                      <NavLink
                        key={id}
                        to={`/settings${link}`}
                        exact
                        style={{
                          width: '100%'
                        }}
                        activeStyle={{
                          background: grey[200]
                        }}
                      >
                        <ListItemButton sx={{ pl: 5 }}>
                          <ListItemIcon>
                            <Icon fontSize="small" sx={{ color: '#000000' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={ title }
                            sx={{ color: '#000000' }}
                          />
                        </ListItemButton>
                      </NavLink>
                    )
                  );
                })
              }
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
