import * as React from 'react';
import { Search } from '@mui/icons-material';
import { InputAdornment, SxProps, TextField } from '@mui/material';
import { IField } from '@/types/index';

interface IProps extends IField {
  sx: SxProps
}

const SearchField: React.FC<IProps> = ({ value, onChange, sx }: IProps): JSX.Element => {
  return (
    <TextField
      value={value}
      placeholder="Поиск..."
      size="small"
      sx={sx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        )
      }}
      onChange={val => onChange(val.target.value)}
    />
  );
};

export default SearchField;
