import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/Fields/EditField';
import useForm from 'react-hooks-form-validator';
import { validatorEmail, validatorText } from '@/utils/validators';
import PhoneField from '@/components/UI/Fields/PhoneField';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchInformation, IInformationBody, updateInformation } from '@/store/settings/SettingsAsync';
import { useAlert } from 'react-alert';
import { STATUS } from '@/utils/constants';

const SettingInformationPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const [fields, formData] = useForm({
    email: validatorEmail,
    phone: validatorText
  });

  const settings = useAppSelector(state => state.settings);
  const { status } = settings;

  const { email, phone } = fields;

  useEffect(() => {
    dispatch(fetchInformation());
    phone.setValue('');
  }, []);

  useEffect(() => {
    if (settings.email) email.setValue(settings.email);
    if (settings.phone) {
      phone.setValue(settings.phone);
    }
  }, [settings.email, settings.phone]);

  useEffect(() => {
    if (settings.error) alert.error(settings.error);
  }, [settings.error]);

  const onSave = async () => {
    const body: IInformationBody = {
      email: email.value,
      phone: phone.value.replaceAll(' ', '')
    };

    await dispatch(updateInformation(body));
    saveSuccess();
  };

  const saveSuccess = () => {
    if (status === STATUS.SUCCESS) {
      alert.success('Успешно сохранено!');
    }
  };

  return (
    <PageLayout
      title="Настройки информации"
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={settings.status === STATUS.PENDING}
        isValid={formData.isValid}
      >
        <EditField
          label="Email"
          placeholder="example@gmail.com"
          value={email.value || ''}
          onChange={(val: string) => email.setValue(val)}
          disabled={settings.status === STATUS.PENDING}
        />
        <PhoneField
          label="Номер телефоны"
          placeholder="+7 (999) 999 99 99"
          value={phone.value || ''}
          onChange={(val) => phone.setValue(val)}
          disabled={settings.status === STATUS.PENDING}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default SettingInformationPage;
