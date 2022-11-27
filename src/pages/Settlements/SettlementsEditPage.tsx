import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IDistricts, IPropsEdit, ISettlement } from '@/types/index';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/Fields/EditField';
import { STATUS } from '@/utils/constants';
import { useAlert } from 'react-alert';
import {
  settlementsCreateOne,
  settlementsFetchOne,
  settlementsUpdateOne
} from '@/store/settlements/SettlementsAsync';
import { districtsFetch } from '@/store/districts/DistrictsAsync';
import { validatorText } from '@/utils/validators';
import useForm from 'react-hooks-form-validator';
import { clearMeta } from '@/store/settlements/SettlementsSlice';
import SelectField from '@/components/UI/Fields/SelectField';
import { tariffsFetch } from '@/store/tariffs/TariffsAsync';
import { promotionsCreateOne } from '@/store/propmotions/PromotionsAsync';

const SettlementsEditPage: React.FC<IPropsEdit> = ({ type = 'EDIT' }: IPropsEdit): JSX.Element => {
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [fields, formData] = useForm({
    title: validatorText
  });
  const [district, updateDistrict] = useState<IDistricts>();
  const [selectedTariffs, updateSelectedTariffs] = useState<string[]>([]);
  const [isPending, updateIsPending] = useState(false);

  const { title } = fields;

  const { item, status, error } = useAppSelector(state => state.settlements);
  const districts = useAppSelector(state => state.districts);
  const tariffs = useAppSelector(state => state.tariffs);

  const settlement = item as ISettlement;

  const { id } = params;

  useEffect(() => {
    dispatch(tariffsFetch());
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  if (type === 'EDIT') {
    useEffect(() => {
      const fetch = async () => {
        if (districts.items.length <= 0) await dispatch(districtsFetch());
        dispatch(settlementsFetchOne(id));
      };

      fetch();
    }, []);

    useEffect(() => {
      if (settlement.title) title.setValue(settlement.title);
      if (settlement.district) updateDistrict(getDistrictById(settlement.district));
      if (
        settlement.tariffs && Array.isArray(settlement.tariffs)) updateSelectedTariffs(settlement.tariffs);
    }, [settlement]);
  } else {
    useEffect(() => {
      if (districts.items.length <= 0) dispatch(districtsFetch());
    }, []);
  }

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  useEffect(() => {
    updateIsPending(status === STATUS.PENDING && districts.status === STATUS.PENDING);
  }, [status, districts.status]);

  const onSave = async () => {
    const body: ISettlement = {
      title: title.value,
      district: district._id,
      tariffs: selectedTariffs.join(','),
      agent: null
    };

    if (type === 'EDIT') {
      await dispatch(settlementsUpdateOne({
        id,
        body
      }));
      saveSuccess();
    } else if (type === 'CREATE') {
      await dispatch(settlementsCreateOne(body));

      if (!error) history.goBack();
    }
  };

  const saveSuccess = () => {
    if (status === STATUS.SUCCESS) {
      alert.success('Успешно сохранено!');
    }
  };

  const getDistrictById = (_id) => {
    return districts.items.find(item => item._id === _id);
  };

  const getTariffsTitle = () => {
    return selectedTariffs.map(item => tariffs.items.find(tariff => tariff._id === item)?.title);
  };

  return (
    <PageLayout
      title="Редактирование населенного пункта"
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={isPending}
        isValid={formData.isValid && !!district && !!selectedTariffs.length}
      >
        <EditField
          label="Название населенного пункта"
          placeholder="Населенный пункт"
          value={title.value || ''}
          onChange={val => title.setValue(val)}
          disabled={isPending}
        />
        <SelectField
          data={{
            renderValue: district?.title || '',
            list: districts.items
          }}
          showSearch={true}
          value={district?._id || ''}
          label="Выберите район"
          placeholder="Район не выбран"
          onChange={val => updateDistrict(getDistrictById(val))}
          disabled={isPending}
        />
        <SelectField
          data={{
            renderValue: getTariffsTitle()?.join(', ') || '',
            list: tariffs.items
          }}
          multiple
          showSearch={true}
          value={selectedTariffs || []}
          label="Выберите тарифы"
          placeholder="Тарифы не выбраны"
          onChange={val => updateSelectedTariffs(val)}
          disabled={isPending}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default SettlementsEditPage;
