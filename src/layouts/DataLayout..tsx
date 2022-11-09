import * as React from 'react';
import DataTable from '@/components/Data/DataTable';
import WithoutData from '@/components/Data/WithoutData';
import { useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import { useAlert } from 'react-alert';
import PageLayout from '@/layouts/PageLayout';
import { IColumns, pages } from '@/types/index';

interface IProps {
  name: pages
  title: string
  fields: IColumns[]
  onFetch: () => void
  onSearch: (val: string) => void
  onDelete: (val: string) => void
}

const DataLayout: React.FC<IProps> = ({ name, title, fields, onFetch, onSearch, onDelete }: IProps): JSX.Element => {
  const alert = useAlert();
  const [search, updateSearch] = useState('');
  const searchDebounce = useDebounce(search, 300);
  const { items, status, error } = useAppSelector(state => state[name]);

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  useEffect(() => {
    if (search) onSearch(search);
    else onFetch();
  }, [searchDebounce]);

  const onRemove = (id: string) => onDelete(id);

  return (
    <PageLayout
      title={title}
      reload={() => onFetch()}
      add={name}
      search={search}
      onSearch={val => updateSearch(val)}
    >
      {
        items.length > 0 && status !== 'pending'
          ? <DataTable
              name={name}
              data={items}
              fields={fields}
              onRemove={onRemove}
            />
          : <WithoutData
              isPending={status === 'pending'}
              description={`${title} не найдены`}
            />
      }
    </PageLayout>
  );
};

export default DataLayout;
