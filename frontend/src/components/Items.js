import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Storage Data
function createData(id, itemId, name, price, expiryDate) {
  return { id, itemId, name, price, expiryDate };
}

const rows = [
  createData(
    0,
    '10',
    'Shoes',
    13.99,
    'March 22, 2023',
  ),
  createData(
    1,
    '1',
    'Chain',
    99.99,
    'March 22, 2023',
  ),
  createData(
    2,
    '2',
    'Ring',
    101.25,
    'March 22, 2023'
  ),
  createData(
    3,
    '3',
    'Jersey',
    85.99,
    'March 22, 2023',
  ),
  createData(
    4,
    '4',
    'Bottle',
    23.70,
    'March 22, 2023',
  ),
];

export default function Items() {
  return (
    <React.Fragment>
      <Title>Items</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Item ID</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Price</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Expiry Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.itemId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="right">{row.expiryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}