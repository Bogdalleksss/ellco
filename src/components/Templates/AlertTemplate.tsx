import * as React from 'react';
import { Alert, AlertColor } from '@mui/material';

interface IProps {
  options: {
    type: AlertColor
  }
  message: string
}

const AlertTemplate: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { options, message }: IProps = props;

  return (
    <Alert
      severity={options.type}
      variant="filled"
      sx={{
        marginTop: 2
      }}
    >
      { message }
    </Alert>
  );
};

export default AlertTemplate;
