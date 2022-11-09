import * as React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { newsDeleteOne, newsFetch, newsSearch } from '@/store/news/NewsAsync';
import DataLayout from '@/layouts/DataLayout.';
import { useEffect } from 'react';
import { clearMeta } from '@/store/news/NewsSlice';

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

const NewsPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  return (
    <DataLayout
      name="news"
      title="Новости"
      fields={fields}
      onFetch={() => dispatch(newsFetch())}
      onSearch={(search) => dispatch(newsSearch(search))}
      onDelete={(id) => dispatch(newsDeleteOne(id))}
    />
  );
};

export default NewsPage;
