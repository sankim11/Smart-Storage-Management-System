import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [transportationCosts, setTransportationCosts] = useState([]);
  const [supplierUsed, setSupplierUsed] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/suppliers");
        setSuppliers(response.data);
        setQuantities(new Array(response.data.length).fill(0));
        setTransportationCosts(new Array(response.data.length).fill(0));
        const initialSupplierUsed = response.data.reduce((acc, supplier) => {
          acc[supplier.SupplierID] = false;
          return acc;
        }, {});
        setSupplierUsed(initialSupplierUsed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleQuantityChange = (event, supplierIndex, supplier) => {
    const newQuantities = [...quantities];
    newQuantities[supplierIndex] = event.target.value;
    setQuantities(newQuantities);
    const newTransportationCosts = [...transportationCosts];
    const newSupplierUsed = { ...supplierUsed };
    if (event.target.value > 0 && !supplierUsed[supplier["SupplierID"]]) {
      newTransportationCosts[supplierIndex] = parseFloat(
        supplier.TransportationCost
      );
      newSupplierUsed[supplier["SupplierID"]] = true;
    } else {
      newTransportationCosts[supplierIndex] = 0;
    }
    setTransportationCosts(newTransportationCosts);
    setSupplierUsed(newSupplierUsed);
  };

  const itemTotal = quantities.reduce((acc, quantity, index) => {
    return acc + quantity * parseFloat(suppliers[index].Price);
  }, 0);

  const transportationTotal = transportationCosts.reduce((acc, cost) => {
    return acc + cost;
  }, 0);

  const subtotal = itemTotal + transportationTotal;

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.SupplierName.toLowerCase().includes(filter.toLowerCase()) ||
      supplier.ItemName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <React.Fragment>
      <Title>Suppliers</Title>
      <TextField
        label="Filter by Supplier Name or Item Name"
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Supplier ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Supplier Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Location</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Transportation Cost</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Item ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Item Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.map((supplier, index) => (
              <TableRow key={`${supplier.SupplierID}-${index}`}>
                <TableCell>{supplier.SupplierID}</TableCell>
                <TableCell>{supplier.SupplierName}</TableCell>
                <TableCell>{supplier.Location}</TableCell>
                <TableCell>${supplier.TransportationCost}</TableCell>
                <TableCell>{supplier.ItemID}</TableCell>
                <TableCell>{supplier.ItemName}</TableCell>
                <TableCell>${supplier.Price}</TableCell>
                <TableCell>
                  <Select
                    value={quantities[index] || 0}
                    onChange={(e) => handleQuantityChange(e, index, supplier)}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflowY: "auto",
                        },
                      },
                    }}
                  >
                    {[...Array(51).keys()].map((_, index) => (
                      <MenuItem key={index} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  ${(quantities[index] || 0) * supplier.Price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "1rem",
          }}
        >
          <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          <Button
            variant="contained"
            style={{ color: "black", backgroundColor: "#D6A556" }}
          >
            Buy
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
