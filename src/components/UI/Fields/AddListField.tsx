import * as React from 'react';
import { Box, Button, Grid } from '@mui/material';
import EditField from '@/components/UI/Fields/EditField';
import { Delete } from '@mui/icons-material';

interface IField {
  label: string
  placeholder: string
  type?: string
  value: string
  onChange: (val: string) => void
}

interface IProps {
  fields: IField[]
  disabled?: boolean
  onRemove: () => void
}

const AddListField: React.FC<IProps> = ({ fields, disabled, onRemove }: IProps): JSX.Element => {
  return (
    <Grid
      container
      gap={2}
    >
      { fields.map(field => (
        <Box
          key={field.label}
          sx={{
            flex: 1
          }}
        >
          <EditField
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={val => field.onChange(val)}
            disabled={disabled}
          />
        </Box>
      )) }
      <Button
        sx={{
          mt: '28px'
        }}
        variant="outlined"
        color="error"
        onClick={() => onRemove()}
      >
        <Delete />
      </Button>
    </Grid>
  );
};

export default AddListField;
