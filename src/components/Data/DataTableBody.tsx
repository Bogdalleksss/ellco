import * as React from 'react';
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { IData } from '@/types/index';

const DataTableBody: React.FC<IData> = ({ data, fields, onRemove, name }: IData): JSX.Element => {
  return (
    <TableBody>
      {data.map((item) => (
        <TableRow
          key={item._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {
            fields.map(field => (
              <TableCell
                key={field.id}
                align="left"
              >
                { item[field.name] }
              </TableCell>
            ))
          }

          <TableCell align="left">
            <Link to={`/${name}/${item._id}/edit`}>
              <Button
                sx={{
                  p: 1,
                  minWidth: 'auto'
                }}
              >
                <Edit
                  fontSize="small"
                  sx={{
                    color: grey[800]
                  }}
                />
              </Button>
            </Link>
            <Button
              sx={{
                p: 1,
                minWidth: 'auto'
              }}
              onClick={() => onRemove(item._id)}
            >
              <Delete
                fontSize="small"
                sx={{
                  color: red[400]
                }}
              />
            </Button>
          </TableCell>
        </TableRow>
      ))}
</TableBody>
  );
};

export default DataTableBody;
