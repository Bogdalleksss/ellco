import * as React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface IProps {
  type?: string
  label: string
  placeholder: string
  value: string
  onChange: (val: string) => void
  disabled: boolean
}

const EditField: React.FC<IProps> = ({ type = 'text', label, value, onChange, placeholder, disabled }: IProps): JSX.Element => {
  return (
    <Box>
      <Typography
        sx={{
          marginBottom: 0.5,
          color: disabled ? grey[500] : 'black'
        }}
      >
        { label }
      </Typography>
      <TextField
        type={type}
        placeholder={placeholder}
        fullWidth
        value={value}
        disabled={disabled}
        onChange={val => onChange(val.target.value)}
      />
    </Box>
  );
};

export default EditField;
