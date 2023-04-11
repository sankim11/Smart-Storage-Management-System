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

export default function StorageItems() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch data from server and update state
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

  // Handle changes in filter text field
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter items based on filter value
  const filteredItems = items.filter((item) =>
      item.ItemName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <React.Fragment>
      <Title>Storage</Title>
      <TextField
        label="Filter by Item Name"
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
            <TableCell  style={{fontWeight:"bold", width: '15%'}}>Item ID</TableCell>
            <TableCell style={{fontWeight:"bold", width: '20%'}}>Name</TableCell>
            <TableCell style={{fontWeight:"bold", width: '15%'}}>Price</TableCell>
            <TableCell style={{fontWeight:"bold", width: '20%'}}>Amount Stored</TableCell>
            <TableCell style={{fontWeight:"bold", width: '15%'}}>Capacity</TableCell>
            <TableCell style={{fontWeight:"bold", width: '10%'}} align="right">Expiry Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.ItemID}>
              <TableCell>{item.ItemID}</TableCell>
              <TableCell>{item.ItemName}</TableCell>
              <TableCell>${item.Price}</TableCell>
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