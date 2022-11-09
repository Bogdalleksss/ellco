import * as React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import DataLayout from '@/layouts/DataLayout.';
import { districtsDeleteOne, districtsFetch, districtsSearch } from '@/store/districts/DistrictsAsync';
import { useEffect } from 'react';
import { clearMeta } from '@/store/districts/DistrictsSlice';

const fields = [
  {
    id: 0,
    name: 'title'
  },
  {
    id: 3,
    name: 'createdAt'
  }
];

const DistrictsPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  return (
    <DataLayout
      name="districts"
      title="Районы"
      fields={fields}
      onFetch={() => dispatch(districtsFetch())}
      onSearch={(search) => dispatch(districtsSearch(search))}
      onDelete={(id) => dispatch(districtsDeleteOne(id))}
    />
  );
};

export default DistrictsPage;
