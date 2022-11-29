import * as React from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { IPropsLayout } from '@/types/index';
import { useHistory } from 'react-router-dom';

interface IProps extends IPropsLayout {
  onSave: () => void
  pending?: boolean
  isValid?: boolean
}

const EditLayout: React.FC<IProps> = ({ children, onSave, pending, isValid = true }: IProps): JSX.Element => {
  const history = useHistory();

  return (
    <Grid>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginBottom: 4,
          maxWidth: '600px'
        }}
      >
        { children }
      </Grid>
      <Button
        variant="contained"
        disableElevation
        sx={{
          marginRight: 1,
          width: '115px',
          height: '35px'
        }}
        onClick={() => onSave()}
        disabled={pending || !isValid}
      >
        { pending
          ? <CircularProgress
              sx={{
                color: 'white'
              }}
              size={16}
            />
          : 'Сохранить' }
      </Button>
      <Button
        variant="outlined"
        onClick={() => history.goBack()}
        disabled={pending}
        sx={{
          width: '115px',
          height: '35px'
        }}
      >
        Отменить
      </Button>
    </Grid>
  );
};

export default EditLayout;
