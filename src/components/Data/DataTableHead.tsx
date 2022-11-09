import * as React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { IColumns } from '@/types/index';

interface IProps {
  columns: IColumns[]
}

const DataTableHead: React.FC<IProps> = ({ columns }: IProps): JSX.Element => {
  return (
    <TableHead>
      <TableRow>
        {
          columns.map(field => (
            <TableCell
              key={field.id}
              sx={{
                fontWeight: 'bold'
              }}
            >
              { field.name }
            </TableCell>
          ))
        }
        <TableCell
          align="left"
          sx={{
            fontWeight: 'bold'
          }}
        >
          action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
