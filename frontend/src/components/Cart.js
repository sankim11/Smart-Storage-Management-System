import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { CartContext } from './CartContext';

function Cart() {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems)

  return (
    <React.Fragment>
      <Title>Cart</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Price</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Category</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Quantity</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item, index) => (
            <TableRow key={`${item.ItemID}-${index}`}>
              <TableCell>{item.ItemName}</TableCell>
              <TableCell>${item.Price}</TableCell>
              <TableCell>{item.Category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.Price * item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Cart;
