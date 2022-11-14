import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import ChipInput from 'material-ui-chip-input';

interface IProps {
  label: string
  placeholder: string
  value: string[]
  onChange: (val: string[]) => void
  disabled: boolean
}

const EditField: React.FC<IProps> = ({ label, value, onChange, placeholder, disabled }: IProps): JSX.Element => {
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
      <ChipInput
        placeholder={placeholder}
        variant="outlined"
        classes={{
          chipContainer: 'chip-input-wrapper',
          inputRoot: 'chip-input-wrapper__input-root',
          input: 'chip-input-wrapper__input',
          chip: 'chip-input-wrapper__chip'
        }}
        value={value}
        fullWidth
        disabled={disabled}
        onChange={(chips) => onChange(chips)}
        onAdd={(chip) => onChange([...value, chip])}
        onDelete={(chip) => onChange(value.filter(item => chip !== item))}
      />
    </Box>
  );
};

export default EditField;
