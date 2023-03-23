import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Employees Data
function createData(id, status, name, address, birthDate, position) {
  return { id, status, name, address, birthDate, position };
}

const rows = [
  createData(
    0,
    'Active',
    'Elvis Presley',
    'Tupelo, MS',
    'Oct 2, 1998',
    'Manager',
  ),
  createData(
    1,
    'Active',
    'Paul McCartney',
    'London, UK',
    'Jul 2, 1998',
    'Employee',
  ),
  createData(2, 'Active', 'Tom Scholz', 'Boston, MA', 'Jan 2, 1998', 'Employee'),
  createData(
    3,
    'Active',
    'Michael Jackson',
    'Gary, IN',
    'Oct 22, 1998',
    'Employee',
  ),
  createData(
    4,
    'Active',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'Nov 7, 1998',
    'Employee',
  ),
];

export default function EmployeesList() {
  return (
    <React.Fragment>
      <Title>Employees</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Status</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Address</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Birth Date</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.birthDate}</TableCell>
              <TableCell align="right">{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}