import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ordersFetchOne } from '@/store/orders/OrdersAsync';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';
import { clearMeta } from '@/store/orders/OrdersSlice';

const OrderInfoPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const history = useHistory();
  const { id } = params;

  const [data, updateData] = useState([]);
  const [camsForBuy, updateCamsForBuy] = useState([]);
  const order = useAppSelector(state => state.orders.item);

  const alert = useAlert();
  const { error } = useAppSelector(state => state.orders);

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(ordersFetchOne(id));
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  useEffect(() => {
    const newData = [];
    if (order) {
      for (const key in order) {
        if (key !== 'cctv') {
          let value = order[key];
          if (key === 'tariffs') value = JSON.stringify(order[key]);
          newData.push({ id: uuidv4(), name: key, value });
        } else {
          for (const keyCCTV in order.cctv) {
            if (keyCCTV !== 'camsForBuy') {
              let value = order.cctv[keyCCTV];
              if (keyCCTV === 'buyCams') value = value ? 'Да' : 'Нет';
              newData.push({ id: uuidv4(), name: keyCCTV, value });
            } else {
              updateCamsForBuy(order.cctv.camsForBuy.map(cam => ({
                id: uuidv4(),
                name: cam.name,
                value: cam.count
              })));
            }
          }
        }
      }

      updateData(newData);
    }
  }, [order]);

  return (
    <PageLayout
      title={`Заказ #${id}`}
    >
      <Button
        variant="outlined"
        onClick={() => history.goBack()}
      >
        <ArrowBack
          fontSize="small"
          sx={{
            mr: 1
          }}
        />
        Назад
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          marginBottom: 4,
          mt: 4,
          p: 2,
          maxWidth: '700px',
          border: 1,
          borderRadius: 1,
          borderColor: grey[300]
        }}
      >
        {
          data && data.map(dataItem => (
            <Box key={dataItem.id}>
              <Grid
                container
                justifyContent="space-between"
                sx={{
                  pb: 1.5
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  gap={10}
                  flex={1}
                >
                  <Typography
                    variant="body2"
                    fontSize={15}
                    fontWeight="bold"
                    minWidth="20%"
                  >{ dataItem.name }</Typography>
                  <Typography variant="body2" fontSize={15}>{ dataItem.value }</Typography>
                </Grid>
              </Grid>
              <Divider />
            </Box>
          ))
        }
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          marginBottom: 4,
          mt: 4,
          p: 2,
          maxWidth: '700px',
          border: 1,
          borderRadius: 1,
          borderColor: grey[300]
        }}
      >
        {
          camsForBuy && camsForBuy.map(dataItem => (
            <Box key={dataItem.id}>
              <Grid
                container
                justifyContent="space-between"
                sx={{
                  pb: 1.5
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  gap={10}
                  flex={1}
                >
                  <Typography
                    variant="body2"
                    fontSize={15}
                    fontWeight="bold"
                    minWidth="20%"
                  >{ dataItem.name }</Typography>
                  <Typography variant="body2" fontSize={15}>{ dataItem.value }</Typography>
                </Grid>
              </Grid>
              <Divider />
            </Box>
          ))
        }
      </Box>
    </PageLayout>
  );
};

export default OrderInfoPage;
