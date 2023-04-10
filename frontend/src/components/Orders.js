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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders', {
          params: {
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [startDate, endDate, startTime, endTime]);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {/* Date inputs */}
        <label>
          Start Date:
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginRight: '1rem', marginLeft: '0.5rem' }}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        {/* Time inputs */}
        <label style={{ marginLeft: '1rem' }}>
          Start Time:
          <input
            type="time"
            value={startTime || ''}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ marginRight: '1rem', marginLeft: '0.5rem' }}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime || ''}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>
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
          {orders.map((order, index) => (
            <TableRow key={`${order.CartID}-${index}`}>
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