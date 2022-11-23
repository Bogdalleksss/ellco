import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/Fields/EditField';
import useForm from 'react-hooks-form-validator';
import { validatorPrice } from '@/utils/validators';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchOrderSettings,
  IOrderSettingsBody,
  updateOrderSettings
} from '@/store/settings/SettingsAsync';
import { useAlert } from 'react-alert';
import { STATUS } from '@/utils/constants';

const SettingOrderPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const [fields, formData] = useForm({
    pricePrivate: validatorPrice,
    priceApartment: validatorPrice
  });

  const settings = useAppSelector(state => state.settings);
  const { status } = settings;

  const { priceApartment, pricePrivate } = fields;

  useEffect(() => {
    dispatch(fetchOrderSettings());
    pricePrivate.setValue('');
  }, []);

  useEffect(() => {
    if (settings.priceApartment) priceApartment.setValue(settings.priceApartment);
    if (settings.pricePrivate) {
      pricePrivate.setValue(settings.pricePrivate);
    }
  }, [settings.priceApartment, settings.pricePrivate]);

  useEffect(() => {
    if (settings.error) alert.error(settings.error);
  }, [settings.error]);

  const onSave = async () => {
    const body: IOrderSettingsBody = {
      priceApartment: priceApartment.value,
      pricePrivate: pricePrivate.value
    };

    await dispatch(updateOrderSettings(body));
    saveSuccess();
  };

  const saveSuccess = () => {
    if (status === STATUS.SUCCESS) {
      alert.success('Успешно сохранено!');
    }
  };

  return (
    <PageLayout
      title="Настройки заказа"
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={settings.status === STATUS.PENDING}
        isValid={formData.isValid}
      >
        <EditField
          label="Цена для частного сектора"
          type="number"
          placeholder="00.00"
          value={pricePrivate.value || ''}
          onChange={(val: string) => pricePrivate.setValue(val)}
          disabled={settings.status === STATUS.PENDING}
        />
        <EditField
          label="Цена для многоквартирного дома"
          type="number"
          placeholder="00.00"
          value={priceApartment.value || ''}
          onChange={(val: string) => priceApartment.setValue(val)}
          disabled={settings.status === STATUS.PENDING}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default SettingOrderPage;
