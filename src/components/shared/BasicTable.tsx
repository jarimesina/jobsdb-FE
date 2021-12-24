import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {
  rowHeaders: any;
  rowData: any;
}

export const BasicTable = ({rowHeaders, rowData}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {rowHeaders.map((rowHeader: string) => { 
              return (<TableCell key={rowHeader} align="right">
                    {rowHeader}
                  </TableCell>);
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rowData
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
