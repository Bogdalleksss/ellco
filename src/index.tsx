import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from '@/utils/theme';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from '@/components/Templates/AlertTemplate';
import { store } from '@/store/index';
import ConfirmProvider from '@/services/confirm/ConfirmProvider';

import '@/assets/css/style.scss';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const options = {
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: '20px',
  transition: transitions.FADE,
  containerStyle: {
    zIndex: 999999
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AlertProvider template={AlertTemplate} {...options}>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </AlertProvider>
    </ThemeProvider>
  </Provider>
);
