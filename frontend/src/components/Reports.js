import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Employee Data
function createData(id, reportId, name, date, link) {
  return { id, reportId, name, date, link };
}

const rows = [
  createData(
    0,
    '1',
    'Elvis Presley',
    'Oct 2, 1998',
    'put link',
  ),
  createData(
    1,
    '2',
    'Paul McCartney',
    'Jul 2, 1998',
    'put link',
  ),
  createData(
    2,
    '3',
    'Tom Scholz',
    'Jan 2, 1998',
    'put link'
  ),
  createData(
    3,
    '4',
    'Michael Jackson',
    'Oct 22, 1998',
    'put link',
  ),
  createData(
    4,
    '5',
    'Bruce Springsteen',
    'Nov 7, 1998',
    'put link',
  ),
];

export default function ReportsList() {
  return (
    <React.Fragment>
      <Title>Reports</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Report ID</TableCell>
            <TableCell>Report Name</TableCell>
            <TableCell>Report Date</TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.reportId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{row.link}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}