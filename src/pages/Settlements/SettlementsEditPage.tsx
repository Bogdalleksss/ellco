import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IDistricts, IPropsEdit, ISettlement } from '@/types/index';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/EditField';
import { STATUS } from '@/utils/constants';
import { useAlert } from 'react-alert';
import {
  settlementsCreateOne,
  settlementsFetchOne,
  settlementsUpdateOne
} from '@/store/settlements/SettlementsAsync';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import { districtsFetch } from '@/store/districts/DistrictsAsync';
import { validatorText } from '@/utils/validators';
import useForm from 'react-hooks-form-validator';
import { clearMeta } from '@/store/settlements/SettlementsSlice';

const SettlementsEditPage: React.FC<IPropsEdit> = ({ type = 'EDIT' }: IPropsEdit): JSX.Element => {
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [fields, formData] = useForm({
    title: validatorText
  });
  const [district, updateDistrict] = useState<IDistricts>();
  const [isPending, updateIsPending] = useState(false);

  const { title } = fields;

  const { item, status, error } = useAppSelector(state => state.settlements);
  const districts = useAppSelector(state => state.districts);

  const settlement = item as ISettlement;

  const { id } = params;

  useEffect(() => {
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
      tariffs: 'tariff',
      agent: null
    };

    if (type === 'EDIT') {
      dispatch(settlementsUpdateOne({
        id,
        body
      }));
    }

    await dispatch(settlementsCreateOne(body));

    if (!error) history.goBack();
  };

  const getDistrictById = (_id) => {
    return districts.items.find(item => item._id === _id);
  };

  return (
    <PageLayout
      title="Редактирование населенного пункта"
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={isPending}
        isValid={formData.isValid && !!district}
      >
        <EditField
          label="Название населенного пункта"
          placeholder="Населенный пункт"
          value={title.value || ''}
          onChange={(val: string) => title.setValue(val)}
          disabled={isPending}
        />
        <Select
          displayEmpty
          value={district?._id || ''}
          disabled={isPending}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <em style={{ opacity: 0.4 }}>Выберите район</em>;
            }

            return district?.title;
          }}
          onChange={(event) => updateDistrict(getDistrictById(event.target.value))}
        >
          <MenuItem disabled value="">
            <em>Выберите район</em>
          </MenuItem>
            {
              districts.items.map(itemDistrict => (
                <MenuItem
                  key={itemDistrict._id}
                  value={itemDistrict._id}
                >
                  {itemDistrict.title}
                </MenuItem>
              ))
            }
          </Select>
      </EditLayout>
    </PageLayout>
  );
};

export default SettlementsEditPage;
