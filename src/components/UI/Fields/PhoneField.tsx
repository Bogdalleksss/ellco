import * as React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import InputMask from 'react-input-mask';

interface IProps {
  label: string
  placeholder: string
  value: string
  onChange: (val: string) => void
  disabled: boolean
}

const EditField: React.FC<IProps> = ({ label, value, onChange, placeholder, disabled }: IProps): JSX.Element => {
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
      <InputMask
        mask="+7 (9999) 999-999"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(val) => onChange(val.target.value)}
      >
        {(inputProps) => (
          <TextField
            { ...inputProps }
            fullWidth
          />
        )}
      </InputMask>

    </Box>
  );
};

export default EditField;
