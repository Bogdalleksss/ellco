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

const SettingCCTVPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const [recordKeepDays, updateRecordKeepDays] = useState<string[]>([]);
  const [camsForBuy, updateCamsForBuy] = useState<ICams[]>([]);

  const settings = useAppSelector(state => state.settings);

  useEffect(() => {
    dispatch(fetchCCTVSettings());
  }, []);

  useEffect(() => {
    if (settings.recordKeepDays) updateRecordKeepDays(settings.recordKeepDays.split(','));
    if (settings.camsForBuy) updateCamsForBuy(settings.camsForBuy);
  }, [settings.recordKeepDays, settings.camsForBuy]);

  useEffect(() => {
    if (settings.error) alert.error(settings.error);
  }, [settings.error]);

  const onSave = () => {
    const body: ICCTVSettingBody = {
      recordKeepDays: recordKeepDays.join(','),
      pricePerDay: 0,
      camsForBuy: camsForBuy.map(item => ({ ...item, pricePerMonth: +item.pricePerMonth }))
    };

    dispatch(updateCCTVSettings(body));
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
        <AddList
          value={camsForBuy}
          onChange={val => updateCamsForBuy(val)}
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
