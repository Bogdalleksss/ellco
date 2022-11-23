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
  access?: string
  isInfo?: boolean
  isEdit?: boolean
  isAdd?: boolean
  onDelete?: (val: string) => void
}

const DataLayout: React.FC<IProps> = ({
  name, title, fields, onFetch, onSearch, onDelete, isInfo, isEdit = true, isAdd = true, access = 'moderator'
}: IProps): JSX.Element => {
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
      add={isAdd && name}
      search={search}
      onSearch={val => updateSearch(val)}
    >
      {
        items.length > 0 && status !== 'pending'
          ? <DataTable
              access={access}
              name={name}
              data={items}
              fields={fields}
              isInfo={isInfo}
              isEdit={isEdit}
              onRemove={onDelete && onRemove}
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
