import * as React from 'react';
import { Box, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';

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
  showSearch?: boolean
}

const SelectField: React.FC<IProps> = ({ data, value, label, placeholder, onChange, disabled, multiple, showSearch }: IProps): JSX.Element => {
  const [filteredData, updateFilteredData] = useState([]);
  const [search, updateSearch] = useState('');

  useEffect(() => {
    if (data) updateFilteredData(data.list);
  }, [data]);

  useEffect(() => {
    updateFilteredData(data.list.filter(item => item.title.includes(search)));
  }, [search]);

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
          if (!selected || (Array.isArray(selected) && !selected.length)) {
            return <em style={{ opacity: 0.4 }}>{ placeholder }</em>;
          }

          return data?.renderValue;
        }}
        onChange={(event) => onChange(event.target.value)}
      >
        {
          showSearch &&
            <Box
              sx={{
                width: '100%',
                px: 1
              }}
            >
              <TextField
                sx={{
                  width: '100%'
                }}
                value={search}
                onChange={val => updateSearch(val.target.value)}
                placeholder="Поиск..."
              />
            </Box>
        }
        <MenuItem disabled value="">
          <em>{ placeholder }</em>
        </MenuItem>
        {
          filteredData.map(item => (
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
