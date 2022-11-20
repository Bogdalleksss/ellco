import * as React from 'react';
import { Button, Grid } from '@mui/material';
import AddListField from '@/components/UI/Fields/AddListField';
import { Add } from '@mui/icons-material';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  value: any[]
  onChange: (val: any[]) => void
  addModel: any
}

const AddList: React.FC<IProps> = ({ value, onChange, addModel }: IProps): JSX.Element => {
  const changeValue = (idx, name, val) => {
    const newValue = _.cloneDeep(value);
    newValue[idx][name] = val;

    onChange(newValue);
  };
  const remove = (removeIdx) => onChange(value.filter((_, idx) => idx !== removeIdx));
  const add = () => onChange([...value, addModel]);

  const fieldsList = (item, idx) => [
    {
      id: uuidv4(),
      value: item.name,
      onChange: val => changeValue(idx, 'name', val),
      label: 'Название камеры',
      placeholder: 'Название'
    },
    {
      id: uuidv4(),
      value: item.pricePerMonth,
      onChange: val => changeValue(idx, 'pricePerMonth', val),
      type: 'number',
      label: 'Цена камеры',
      placeholder: '00.00'
    }
  ];

  return (
    <Grid
      container
      flexDirection="column"
      gap={2}
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.2)',
        p: 2,
        borderRadius: 1
      }}
    >
      {
        value && value.map((item, idx) => (
          <AddListField
            key={item.id}
            onRemove={() => remove(idx)}
            fields={fieldsList(item, idx)}
          />
        ))
      }
      <Button
        variant="outlined"
        size="large"
        sx={{
          py: 1.2,
          mt: 1
        }}
        onClick={() => add()}
      >
        <Add sx={{ mr: 0.5 }} />
        Добавить
      </Button>
    </Grid>
  );
};

export default AddList;
