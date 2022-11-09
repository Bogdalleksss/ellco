import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IDistricts, IPropsEdit } from '@/types/index';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/EditField';
import { STATUS } from '@/utils/constants';
import { useAlert } from 'react-alert';
import { districtsCreateOne, districtsFetchOne, districtsUpdateOne } from '@/store/districts/DistrictsAsync';
import useForm from 'react-hooks-form-validator';
import { validatorText } from '@/utils/validators';
import { clearMeta } from '@/store/districts/DistrictsSlice';

const DistrictsEditPage: React.FC<IPropsEdit> = ({ type = 'EDIT' }: IPropsEdit): JSX.Element => {
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [fields, formData] = useForm({
    title: validatorText
  });

  const { title } = fields;

  const { item, status, error } = useAppSelector(state => state.districts);
  const district = item as IDistricts;

  const { id } = params;

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  if (type === 'EDIT') {
    useEffect(() => {
      dispatch(districtsFetchOne(id));
    }, []);

    useEffect(() => {
      if (district.title) title.setValue(district.title);
    }, [district]);
  }

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  const onSave = async () => {
    const body: IDistricts = { title: title.value };

    if (type === 'EDIT') {
      dispatch(districtsUpdateOne({
        id,
        body
      }));
    } else if (type === 'CREATE') {
      await dispatch(districtsCreateOne(body));

      if (!error) history.goBack();
    }
  };

  return (
    <PageLayout
      title="Редактирование района"
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={status === STATUS.PENDING}
        isValid={formData.isValid && title.value !== district?.title}
      >
        <EditField
          label="Название района"
          placeholder="Название"
          value={title.value || ''}
          onChange={(val: string) => title.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default DistrictsEditPage;
