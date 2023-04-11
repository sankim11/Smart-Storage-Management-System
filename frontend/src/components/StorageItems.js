import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StorageItems() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch data from server and update state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/storage");
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

  // Handle price changes
  const handlePriceChange = async (event, itemId) => {
    const newPrice = event.target.value;

    try {
      await axios.put(`http://localhost:4000/storage/price/${itemId}`, {
        price: newPrice,
      });
      setItems(
        items.map((item) => {
          if (item.ItemID === itemId) {
            return { ...item, Price: newPrice };
          }
          return item;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handle expiry date changes
  const handleExpiryChange = async (event, itemId) => {
    const newExpiry = event.target.value;

    try {
      await axios.put(`http://localhost:4000/storage/expiry/${itemId}`, {
        expiry: newExpiry,
      });
      setItems(
        items.map((item) => {
          if (item.ItemID === itemId) {
            return { ...item, expiry: newExpiry };
          }
          return item;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handles deleting items from storage
  const handleDeleteItem = async (itemID) => {
    try {
      const response = await fetch(`http://localhost:4000/storage/${itemID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the item from the state
        setItems(items.filter((item) => item.ItemID !== itemID));
      } else {
        console.error("Error deleting the item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", width: "10%" }}>
                Item ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "15%" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "15%" }}>
                Price
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                Amount Stored
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "15%" }}>
                Capacity
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "15%" }}>
                Expiry Date
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", width: "10%" }}
                align="right"
              >
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.ItemID}>
                <TableCell>{item.ItemID}</TableCell>
                <TableCell>{item.ItemName}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.Price}
                    sx={{ width: "5rem" }}
                    onChange={(event) => handlePriceChange(event, item.ItemID)}
                    inputProps={{ min: 0, step: 1 }}
                  />
                </TableCell>
                <TableCell>{item.AmountStored}</TableCell>
                <TableCell>{item.Capacity}</TableCell>
                <TableCell>
                  {item.expiry === "N/A" ? (
                    "N/A"
                  ) : (
                    <TextField
                      type="date"
                      value={item.expiry}
                      onChange={(event) =>
                        handleExpiryChange(event, item.ItemID)
                      }
                      inputProps={{
                        min: new Date().toISOString().split("T")[0],
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    style={{ color: "#D6A556" }}
                    onClick={(event) => handleDeleteItem(item.ItemID)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
