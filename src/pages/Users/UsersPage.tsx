import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { userDeleteOne, usersFetch, usersSearch } from '@/store/users/UsersAsync';
import DataLayout from '@/layouts/DataLayout.';
import { useEffect } from 'react';
import { clearMeta } from '@/store/users/UsersSlice';

const fields = [
  {
    id: 0,
    name: 'email'
  },
  {
    id: 1,
    name: 'displayName'
  },
  {
    id: 2,
    name: 'role'
  },
  {
    id: 3,
    name: 'createdAt'
  }
];

const UsersPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const me = useAppSelector(state => state.auth.me);

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  return (
    <DataLayout
      name="users"
      access="administrator"
      title="Пользователи"
      isAdd={me.role === 'administrator'}
      fields={fields}
      onFetch={() => dispatch(usersFetch())}
      onSearch={(search) => dispatch(usersSearch(search))}
      onDelete={(id) => dispatch(userDeleteOne(id))}
    />
  );
};

export default UsersPage;
