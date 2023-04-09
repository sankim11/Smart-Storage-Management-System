import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ReportsList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/reports');
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Reports</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold", width: '25%'}}>Report ID</TableCell>
            <TableCell style={{fontWeight:"bold", width: '25%'}}>Cart ID</TableCell>
            <TableCell style={{fontWeight:"bold", width: '25%'}}>Quantity Sold</TableCell>
            <TableCell style={{fontWeight:"bold", width: '25%'}}>Revenue</TableCell>
            <TableCell style={{fontWeight:"bold", width: '25%'}} align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={`${report.ReportID}-${index}`}>
              <TableCell>{report.ReportID}</TableCell>
              <TableCell>{report.CartID}</TableCell>
              <TableCell>{report.QuantitySold}</TableCell>
              <TableCell>${report.TotalRevenue}</TableCell>
              <TableCell align="right">{report.Email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}