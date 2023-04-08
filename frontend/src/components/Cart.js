import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { CartContext } from './CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, MenuItem, Select } from '@mui/material';

function Cart() {
  const { cartItems, deleteItem, setCartItems } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );

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
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Remove</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }} align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item, index) => (
            <TableRow key={`${item.ItemID}-${index}`}>
                <TableCell>{item.ItemName}</TableCell>
                <TableCell>${item.Price}</TableCell>
                <TableCell>{item.Category}</TableCell>
                <TableCell>
                    <Select
                        value={item.quantity}
                        onChange={(event) => {
                            const newQuantity = event.target.value;
                            setCartItems((prevItems) =>
                                prevItems.map((cartItem) =>
                                    cartItem.ItemID === item.ItemID
                                    ? { ...cartItem, quantity: newQuantity }
                                    : cartItem
                                )
                            );
                        }}
                        MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                overflowY: 'auto',
                              },
                            },
                        }}
                    >
                        {Array.from({ length: item.AmountStored }, (_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </Select>    
            </TableCell>
              <TableCell>
                <Button
                  style={{ color: '#D6A556' }}
                  onClick={() => deleteItem(item)}
                  disabled={item.AmountStored === 0}
                >
                  <DeleteIcon></DeleteIcon>
                </Button>
              </TableCell>
              <TableCell align="right">${item.Price * item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
            <TableRow>
                <TableCell>
                    <Button
                        variant='contained'
                        style={{ color: 'black', backgroundColor: '#D6A556'}}
                    >
                        Buy
                    </Button>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Subtotal: ${subtotal}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Cart;
