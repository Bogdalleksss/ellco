import * as React from 'react';
import { Box, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface IData {
  renderValue: string
  list: any[]
}

interface IProps {
  data: IData
  value: any
  multiple?: boolean
  label: string
  placeholder: string
  onChange: (val: any) => void
  disabled: boolean
}

const SelectField: React.FC<IProps> = ({ data, value, label, placeholder, onChange, disabled, multiple }: IProps): JSX.Element => {
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
      <Select
        displayEmpty
        value={value || ''}
        multiple={multiple}
        disabled={disabled}
        input={<OutlinedInput />}
        fullWidth
        renderValue={(selected) => {
          if (!selected || !selected.length) {
            return <em style={{ opacity: 0.4 }}>{ placeholder }</em>;
          }

          return data?.renderValue;
        }}
        onChange={(event) => onChange(event.target.value)}
      >
        <MenuItem disabled value="">
          <em>{ placeholder }</em>
        </MenuItem>
        {
          data.list.map(item => (
            <MenuItem
              key={item._id}
              value={item._id}
            >
              {item.title}
            </MenuItem>
          ))
        }
      </Select>
    </Box>
  );
};

export default SelectField;
