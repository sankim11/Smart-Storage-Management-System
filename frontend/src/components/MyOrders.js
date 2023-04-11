import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import moment from 'moment';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchOrders() {
      try {
        // Fetch orders from the server using the current user's email
        const response = await fetch(`http://localhost:4000/api/orders?email=${currentUser.ClientEmail}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (currentUser) {
      fetchOrders(); // Fetch orders only if currentUser exists
    }
  }, [currentUser]);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Cart ID</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Client Email</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Date Sold</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Time Sold</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={`${order.CartID}-${index}`}>
              <TableCell>{order.CartID}</TableCell>
              <TableCell>{order.ClientEmail}</TableCell>
              <TableCell>{new Date(order.DateSold).toLocaleDateString()}</TableCell>
              <TableCell>{moment(order.TimeSold, 'HH:mm:ss').format('h:mm A')}</TableCell>
              <TableCell align="right">{`$${order.TotalRevenue}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}