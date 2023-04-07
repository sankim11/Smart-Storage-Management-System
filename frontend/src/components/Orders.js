import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Cart ID</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Client Name</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Client Email</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Date Sold</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Time Sold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.CartID}</TableCell>
              <TableCell>{order.FirstName} {order.LastName}</TableCell>
              <TableCell>{order.ClientEmail}</TableCell>
              <TableCell>{new Date(order.DateSold).toLocaleDateString()}</TableCell>
              <TableCell align="right">{moment(order.TimeSold, 'HH:mm:ss').format('h:mm A')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}