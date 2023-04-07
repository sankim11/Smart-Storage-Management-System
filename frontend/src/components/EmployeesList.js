import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function EmployeesList() {
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/employees');
        setEmps(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Employees</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
            <TableCell style={{fontWeight:"bold"}}>First Name</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emps.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.Email}</TableCell>
              <TableCell>{emp.FirstName}</TableCell>
              <TableCell align="right">{emp.LastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}