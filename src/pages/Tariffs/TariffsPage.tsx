import * as React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import DataLayout from '@/layouts/DataLayout.';
import { useEffect } from 'react';
import { clearMeta } from '@/store/users/UsersSlice';
import { tariffsDeleteOne, tariffsFetch, tariffsSearch } from '@/store/tariffs/TariffsAsync';

const fields = [
  {
    id: 0,
    name: 'title'
  },
  {
    id: 1,
    name: 'type'
  },
  {
    id: 2,
    name: 'price'
  },
  {
    id: 3,
    name: 'createdAt'
  }
];

const TariffsPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  return (
    <DataLayout
      name="tariffs"
      title="Тарифы"
      fields={fields}
      onFetch={() => dispatch(tariffsFetch())}
      onSearch={(search) => dispatch(tariffsSearch(search))}
      onDelete={(id) => dispatch(tariffsDeleteOne(id))}
    />
  );
};

export default TariffsPage;
