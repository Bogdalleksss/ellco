import * as React from 'react';
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { IData } from '@/types/index';
import { useAppSelector } from '@/hooks/redux';

const DataTableBody: React.FC<IData> = ({ data, fields, onRemove, name, isInfo, isEdit = true, access }: IData): JSX.Element => {
  const me = useAppSelector(state => state.auth.me);

  const notAdmin = access === 'administrator' && me.role !== 'administrator';

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
            {
              isInfo &&
                <Link to={`/${name}/${item._id}`}>
                  <Button
                    sx={{
                      p: 1,
                      minWidth: 'auto'
                    }}
                  >
                    <Visibility
                      fontSize="small"
                      sx={{
                        color: grey[800]
                      }}
                    />
                  </Button>
                </Link>
            }
            {
              isEdit &&
                <Link to={!notAdmin && `/${name}/${item._id}/edit`}>
                  <Button
                    sx={{
                      p: 1,
                      minWidth: 'auto'
                    }}
                    disabled={notAdmin}
                  >
                    <Edit
                      fontSize="small"
                      sx={{
                        color: grey[800],
                        opacity: notAdmin && '50%'
                      }}
                    />
                  </Button>
                </Link>
            }
            {
              onRemove &&
                <Button
                  sx={{
                    p: 1,
                    minWidth: 'auto'
                  }}
                  disabled={notAdmin}
                  onClick={() => onRemove(item._id)}
                >
                  <Delete
                    fontSize="small"
                    sx={{
                      color: red[400],
                      opacity: notAdmin && '50%'
                    }}
                  />
                </Button>
            }
          </TableCell>
        </TableRow>
      ))}
</TableBody>
  );
};

export default DataTableBody;
