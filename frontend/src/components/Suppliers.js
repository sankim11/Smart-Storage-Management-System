import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Suppliers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Supplier ID</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Supplier Name</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Location</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Transportation Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.SupplierID}</TableCell>
              <TableCell>{supplier.SupplierName}</TableCell>
              <TableCell>{supplier.Location}</TableCell>
              <TableCell align="right">{supplier.TransportationCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}