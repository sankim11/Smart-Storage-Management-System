import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Suppliers Data
function createData(id, orderId, name, company, status, orderDate) {
  return { id, orderId, name, company, status, orderDate };
}

const rows = [
  createData(
    0,
    '10',
    'Elvis Presley',
    'Nike',
    'Delivered',
    'March 22, 2023',
  ),
  createData(
    1,
    '1',
    'Paul McCartney',
    'Adidas',
    'Delivered',
    'March 22, 2023',
  ),
  createData(
    2,
    '2',
    'Tom Scholz',
    'Versaci',
    'Shipping',
    'March 22, 2023'
  ),
  createData(
    3,
    '3',
    'Michael Jackson',
    'Gucci',
    'Delivered',
    'March 22, 2023',
  ),
  createData(
    4,
    '4',
    'Bruce Springsteen',
    'Osklen',
    'Shipping',
    'March 22, 2023',
  ),
];

export default function SupplierList() {
  return (
    <React.Fragment>
      <Title>Suppliers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Order ID</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Company</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Order Status</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Order Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.orderId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.orderDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}