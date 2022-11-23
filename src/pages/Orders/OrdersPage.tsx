import * as React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import DataLayout from '@/layouts/DataLayout.';
import { useEffect } from 'react';
import { clearMeta } from '@/store/users/UsersSlice';
import { ordersFetch, ordersSearch } from '@/store/orders/OrdersAsync';

const fields = [
  {
    id: 0,
    name: 'fullName'
  },
  {
    id: 1,
    name: 'connectionType'
  },
  {
    id: 2,
    name: 'phone'
  },
  {
    id: 3,
    name: 'createdAt'
  }
];

const OrdersPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  return (
    <DataLayout
      name="orders"
      title="Заказы"
      fields={fields}
      isInfo={true}
      isEdit={false}
      isAdd={false}
      onFetch={() => dispatch(ordersFetch())}
      onSearch={(search) => dispatch(ordersSearch(search))}
    />
  );
};

export default OrdersPage;
