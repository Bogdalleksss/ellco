import * as React from 'react';
import { Paper, Table, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useConfirm } from '@/hooks/confirm';
import { useCallback } from 'react';
import DataTableHead from '@/components/Data/DataTableHead';
import DataTableBody from '@/components/Data/DataTableBody';
import { IData } from '@/types/index';

const DataTable: React.FC<IData> = (props: IData): JSX.Element => {
  const { fields, onRemove } = props;
  const confirm = useConfirm();
  const remove = useCallback((id: string) => {
    confirm({
      message: 'Вы точно хотите удалить?',
      buttons: {
        confirm: {
          name: 'Удалить',
          onClick: () => onRemove(id)
        }
      }
    });
  }, []);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: grey[200]
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <DataTableHead columns={fields} />
        <DataTableBody
          { ...props }
          onRemove={remove}
        />
      </Table>
    </TableContainer>
  );
};

export default DataTable;
