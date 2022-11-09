import * as React from 'react';
import { grey } from '@mui/material/colors';
import { Button, Grid } from '@mui/material';
import { getImageUrl } from '@/utils/media';

interface IProps {
  onChange: (file: File) => void
  image: string
  disabled: boolean
}

const ImageUpload: React.FC<IProps> = ({ onChange, image, disabled }: IProps): JSX.Element => {
  return (
    <Grid
      container
      key="banner-image"
      alignItems="center"
      justifyContent="center"
      sx={{
        position: 'relative',
        width: '100%',
        height: '300px',
        backgroundColor: grey[200],
        backgroundImage: image ? `url(${getImageUrl(image)})` : '',
        backgroundSize: 'cover',
        '&::before': {
          position: 'absolute',
          display: image ? 'none' : 'block',
          content: '""',
          border: 2,
          borderStyle: 'dashed',
          borderColor: grey[400],
          width: '90%',
          height: '82%'
        }
      }}
    >
      <Button
        color="secondary"
        variant="contained"
        component="label"
        disabled={disabled}
      >
        Загрузить баннер
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/svg"
          hidden
          onChange={(event) => onChange(event.target.files[0])}
        />
      </Button>
    </Grid>
  );
};

export default React.memo(ImageUpload);
