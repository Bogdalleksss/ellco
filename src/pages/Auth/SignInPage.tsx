import * as React from 'react';
import AuthLayout from '@/layouts/AuthLayout';
import Logo from '@/components/Logo';
import { Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAlert } from 'react-alert';
import { authSignIn } from '@/store/auth/AuthAsync';
import { clearMeta } from '@/store/auth/AuthSlice';

const SignInPage: React.FC = (): JSX.Element => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const { error, status } = useAppSelector(state => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  const signIn = () => {
    dispatch(authSignIn({ email: email.trim(), password }));
  };

  return (
    <AuthLayout>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
      >
        <Logo />
        <TextField
          value={email}
          sx={{
            marginTop: 3
          }}
          fullWidth
          label="Email"
          placeholder="example@gmal.com"
          disabled={status === 'pending'}
          onChange={val => updateEmail(val.target.value)}
        />
        <TextField
          value={password}
          sx={{
            marginTop: 2
          }}
          type="password"
          fullWidth
          label="Пароль"
          placeholder="Ваш пароль"
          disabled={status === 'pending'}
          onChange={val => updatePassword(val.target.value)}
        />
        <LoadingButton
          sx={{
            marginTop: 4,
            width: '80%',
            fontWeight: 'bold',
            py: 1.5
          }}
          variant="contained"
          color="secondary"
          disableElevation
          size="medium"
          loading={status === 'pending'}
          onClick={() => signIn()}
        >
          Войти
        </LoadingButton>
      </Grid>
    </AuthLayout>
  );
};

export default SignInPage;
