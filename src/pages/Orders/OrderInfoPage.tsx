import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { userCreateOne, usersFetchOne, usersUpdateOne } from '@/store/users/UsersAsync';
import { IPropsEdit, ISignIn, IUser } from '@/types/index';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/EditField';
import useForm from 'react-hooks-form-validator';
import { STATUS } from '@/utils/constants';
import { useAlert } from 'react-alert';
import { userSigInConfig } from '@/utils/validators/configs';
import { clearMeta } from '@/store/users/UsersSlice';

const OrderInfoPage: React.FC<IPropsEdit> = ({ type = 'EDIT' }: IPropsEdit): JSX.Element => {
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [fields, formData] = useForm(userSigInConfig(type === 'CREATE'));

  const { email, password } = fields;

  const { item, status, error } = useAppSelector(state => state.users);
  const user = item as IUser;

  const { id } = params;

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  if (type === 'EDIT') {
    useEffect(() => {
      if (user?._id !== id) dispatch(usersFetchOne(id));
    }, []);

    useEffect(() => {
      if (user.email) email.setValue(user.email);
    }, [user]);
  }

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  const onSave = async () => {
    const body: ISignIn = {
      email: email.value.trim()
    };

    if (password.value || type === 'CREATE') body.password = password.value.trim();

    if (type === 'EDIT') {
      dispatch(usersUpdateOne({
        id,
        body
      }));
    } else if (type === 'CREATE') {
      await dispatch(userCreateOne(body));

      if (!error) history.goBack();
    }
  };

  return (
    <PageLayout
      title={`${type === 'CREATE' ? 'Добавить' : 'Редактировать'} пользователя`}
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={status === STATUS.PENDING}
        isValid={formData.isValid && email.value !== user?.email}
      >
        <EditField
          label="Email"
          placeholder="example@gmail.com"
          value={email.value || ''}
          onChange={(val: string) => email.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
        <EditField
          label="Новый пароль"
          placeholder="Password"
          value={password.value || ''}
          onChange={(val: string) => password.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default OrderInfoPage;
