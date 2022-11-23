import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import EditLayout from '@/layouts/EditLayout';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchCCTVSettings,
  ICCTVSettingBody,
  updateCCTVSettings
} from '@/store/settings/SettingsAsync';
import { useAlert } from 'react-alert';
import { STATUS } from '@/utils/constants';
import ChipsField from '@/components/UI/Fields/ChipsField';
import AddList from '@/components/UI/AddList';
import { ICams } from '@/store/settings/SettingsSlice';
import EditField from '@/components/UI/Fields/EditField';

const SettingCCTVPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const [recordKeepDays, updateRecordKeepDays] = useState<string[]>([]);
  const [camsForBuy, updateCamsForBuy] = useState<ICams[]>([]);
  const [pricePerDay, updatePricePerDay] = useState(0);

  const settings = useAppSelector(state => state.settings);
  const { status } = settings;

  useEffect(() => {
    dispatch(fetchCCTVSettings());
  }, []);

  useEffect(() => {
    if (settings.recordKeepDays) updateRecordKeepDays(settings.recordKeepDays.split(','));
    if (settings.camsForBuy) updateCamsForBuy(settings.camsForBuy);
    if (settings.pricePerDay) updatePricePerDay(settings.pricePerDay);
  }, [settings.recordKeepDays, settings.camsForBuy]);

  useEffect(() => {
    if (settings.error) alert.error(settings.error);
  }, [settings.error]);

  const onSave = async () => {
    const body: ICCTVSettingBody = {
      recordKeepDays: recordKeepDays.join(','),
      pricePerDay,
      camsForBuy: camsForBuy.map(item => ({ ...item, pricePerMonth: +item.pricePerMonth }))
    };

    await dispatch(updateCCTVSettings(body));

    saveSuccess();
  };

  const saveSuccess = () => {
    if (status === STATUS.SUCCESS) {
      alert.success('Успешно сохранено!');
    }
  };

  return (
    <PageLayout
      title="Настройки видеокамер"
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={settings.status === STATUS.PENDING}
        isValid={!!camsForBuy.length && !!recordKeepDays.length}
      >
        <ChipsField
          value={recordKeepDays}
          label="Список дней хранения записей"
          placeholder="Добавьте дни"
          onChange={(val) => updateRecordKeepDays(val)}
          disabled={settings.status === STATUS.PENDING}
        />
        <EditField
          label="Цена за день хранения"
          type="number"
          placeholder="00.00"
          value={String(pricePerDay)}
          onChange={val => updatePricePerDay(+val)}
          disabled={settings.status === STATUS.PENDING}
        />
        <AddList
          value={camsForBuy}
          onChange={val => updateCamsForBuy(val)}
          placeholder="Камеры не добавлены"
          addModel={{
            name: '',
            pricePerMonth: 0
          }}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default SettingCCTVPage;
