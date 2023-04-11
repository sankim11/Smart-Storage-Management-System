import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import { useState, useEffect } from "react";
import { TextField, Paper } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

export default function CustomersList() {
  const [cust, setCust] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers from server
        const response = await axios.get("http://localhost:4000/customers");
        setCust(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Handle change of filter value
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter customers based on first or last name
  const filteredCustomers = cust.filter(
    (customer) =>
      customer.FirstName.toLowerCase().includes(filter.toLowerCase()) ||
      customer.LastName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <React.Fragment>
      <Title>Customers</Title>
      <TextField
        label="Filter by Customer First or Last Name"
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
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", width: "50%" }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "30%" }}>
                First Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "20%" }} align="right">
                Last Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <TableRow key={`${customer.ClientEmail}-${index}`}>
                <TableCell>{customer.ClientEmail}</TableCell>
                <TableCell>{customer.FirstName}</TableCell>
                <TableCell align="right">{customer.LastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
