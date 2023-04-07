import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function StorageItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/storage');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Storage</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell  style={{fontWeight:"bold", width: '15%'}}>Item ID</TableCell>
            <TableCell style={{fontWeight:"bold", width: '20%'}}>Name</TableCell>
            <TableCell style={{fontWeight:"bold", width: '15%'}}>Price</TableCell>
            <TableCell style={{fontWeight:"bold", width: '15%'}}>Amount</TableCell>
            <TableCell style={{fontWeight:"bold", width: '15%'}}>Capacity</TableCell>
            <TableCell style={{fontWeight:"bold", width: '20%'}} align="right">Expiry Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.ItemID}>
              <TableCell>{item.ItemID}</TableCell>
              <TableCell>{item.ItemName}</TableCell>
              <TableCell>{item.Price}</TableCell>
              <TableCell>{item.AmountStored}</TableCell>
              <TableCell>{item.Capacity}</TableCell>
              <TableCell align="right">{item.expiry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}