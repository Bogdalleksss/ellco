import * as React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import DataLayout from '@/layouts/DataLayout.';
import { settlementsDeleteOne, settlementsFetch, settlementsSearch } from '@/store/settlements/SettlementsAsync';
import { useEffect } from 'react';
import { clearMeta } from '@/store/settlements/SettlementsSlice';

const fields = [
  {
    id: 0,
    name: 'title'
  },
  {
    id: 1,
    name: 'district'
  },
  {
    id: 3,
    name: 'createdAt'
  }
];

const SettlementsPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  return (
    <DataLayout
      name="settlements"
      title="Населенные пункты"
      fields={fields}
      onFetch={() => dispatch(settlementsFetch())}
      onSearch={(search) => dispatch(settlementsSearch(search))}
      onDelete={(id) => dispatch(settlementsDeleteOne(id))}
    />
  );
};

export default SettlementsPage;
