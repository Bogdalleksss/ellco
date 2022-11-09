import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import MainRouter from '@/routes/MainRouter';
import AuthRouter from '@/routes/AuthRouter';
import { interceptor } from '@/utils/api';

const App: React.FC = (): JSX.Element => {
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const dispatch = useAppDispatch();
  interceptor(dispatch);

  return (
    <Router>
      {
        isAuth
          ? <MainRouter />
          : <AuthRouter />
      }
    </Router>
  );
};

export default App;
