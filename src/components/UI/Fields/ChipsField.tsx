import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import ChipInput from 'material-ui-chip-input';
import { Chips } from 'primereact/chips';

interface IProps {
  label: string
  placeholder: string
  value: string[]
  onChange: (val: string[]) => void
  disabled: boolean
}

const ChipsField: React.FC<IProps> = ({ label, value, onChange, placeholder, disabled }: IProps): JSX.Element => {
  return (
    <Box className="chips-field">
      <Typography
        sx={{
          marginBottom: 0.5,
          color: disabled ? grey[500] : 'black'
        }}
      >
        { label }
      </Typography>
      <Chips
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(chips) => onChange(chips.value)}
        onAdd={(chip) => onChange([...value, chip.value])}
        onRemove={(chip) => onChange(value.filter(item => chip.value !== item))}
      />
    </Box>
  );
};

export default ChipsField;
