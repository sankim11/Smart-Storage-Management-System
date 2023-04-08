import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

export default function Items() {
  const { items, setItems, addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/items');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setItems]);

  return (
    <React.Fragment>
      <Title>Items</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>Price</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '25%' }}>Category</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '20%' }}>On Stock</TableCell>
            <TableCell style={{ fontWeight: 'bold', width: '10%' }} align="right">Add to Cart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={`${item.ItemID}-${index}`}>
              <TableCell>{item.ItemName}</TableCell>
              <TableCell>${item.Price}</TableCell>
              <TableCell>{item.Category}</TableCell>
              <TableCell>{item.AmountStored}</TableCell>
              <TableCell align="right">
                <Button
                  style={{ color: '#D6A556' }}
                  onClick={() => addItem(item)}
                  disabled={item.AmountStored === 0}
                >
                  <AddIcon></AddIcon>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
