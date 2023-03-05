import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IDistricts, IPropsEdit, ISettlement, ITariff } from '@/types/index';
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
import { grey } from '@mui/material/colors';
import { IconButton, Typography } from '@mui/material';
import { OpenWith } from '@mui/icons-material';
import { ReactSortable } from 'react-sortablejs';

interface ISort {
  id: string
}

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
  const [sortTariffs, updateSortTariffs] = useState<ISort[]>([]);
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

  useEffect(() => {
    const sort: ISort[] = selectedTariffs.map((item) => ({ id: item }));

    updateSortTariffs(sort);
  }, [selectedTariffs]);

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

  const sortList = (newState) => {
    updateSelectedTariffs(newState.map(item => item.id));
  };

  const getDistrictById = (_id) => {
    return districts.items.find(item => item._id === _id);
  };

  const getTariffsTitle = () => {
    return selectedTariffs.map(item => tariffs.items.find(tariff => tariff._id === item)?.title);
  };

  const getSelectedTariff = (id) => {
    return tariffs.items.find(item => item._id === id);
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

        <div className="tariff-select-list">
          {
            !selectedTariffs.length &&
              <Typography
                sx={{
                  color: grey[600],
                  fontSize: 14,
                  textAlign: 'center'
                }}
              >
                Нет выбранных тарифов
              </Typography>
          }

          <ReactSortable
            className="tariff-select-sortable"
            ghostClass="sortable-ghost"
            chosenClass="sortable-chosen"
            dragClass="sortable-drag"
            list={sortTariffs}
            setList={sortList}
            handle=".drag-list"
          >
            {
              selectedTariffs.map((tariffId) => {
                const tariff: ITariff = getSelectedTariff(tariffId);

                return (
                  <div key={tariff._id} className="tariff-select-item">
                    <Typography
                      sx={{
                        color: grey[800],
                        fontSize: 14
                      }}
                    >
                      { tariff.title }
                    </Typography>

                    <IconButton className="drag-list" aria-label="move">
                      <OpenWith sx={{ fontSize: 18 }} />
                    </IconButton>
                  </div>
                );
              })
            }
          </ReactSortable>
        </div>
      </EditLayout>
    </PageLayout>
  );
};

export default SettlementsEditPage;
