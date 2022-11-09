import * as React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import SignInPage from '@/pages/Auth/SignInPage';

const AuthRouter: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/">
        <SignInPage />
      </Route>
    </Switch>
  );
};

export default AuthRouter;
