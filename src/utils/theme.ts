import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      light: '#215ED8',
      main: '#054FD6',
      dark: '#00004F'
    },
    secondary: {
      main: '#FFC229'
    },
    error: {
      main: '#ff5858'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Some CSS
          fontSize: '0.8rem'
        }
      }
    }
  }
});
