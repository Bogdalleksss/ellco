import * as React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import DataLayout from '@/layouts/DataLayout.';
import { promotionsDeleteOne, promotionsFetch, promotionsSearch } from '@/store/propmotions/PromotionsAsync';
import { useEffect } from 'react';
import { clearMeta } from '@/store/propmotions/PromotionsSlice';

const fields = [
  {
    id: 0,
    name: 'title'
  },
  {
    id: 1,
    name: 'annonce'
  },
  {
    id: 2,
    name: 'creatorId'
  },
  {
    id: 3,
    name: 'createdAt'
  }
];

const PromotionsPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  return (
    <DataLayout
      name="promotions"
      title="Акции"
      fields={fields}
      onFetch={() => dispatch(promotionsFetch())}
      onSearch={(search) => dispatch(promotionsSearch(search))}
      onDelete={(id) => dispatch(promotionsDeleteOne(id))}
    />
  );
};

export default PromotionsPage;
