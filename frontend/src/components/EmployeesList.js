import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { TextField } from "@mui/material";

export default function EmployeesList() {
  const [emps, setEmps] = useState([]);
  const [filter, setFilter] = useState("");

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredEmployees = emps.filter((emp) =>
      emp.FirstName.toLowerCase().includes(filter.toLowerCase()) ||
      emp.LastName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <React.Fragment>
      <Title>Employees</Title>
      <TextField
        label="Filter by Employee First or Last Name"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: "1rem" }}
        sx={{
          borderRadius: 1,
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#D6A556",
            },
          },
        }}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
            <TableCell style={{fontWeight:"bold"}}>First Name</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployees.map((emp, index) => (
            <TableRow key={`${emp.Email}-${index}`}>
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