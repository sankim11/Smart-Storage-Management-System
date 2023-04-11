import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField, Paper } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import TableContainer from "@mui/material/TableContainer";

export default function Items() {
  const { items, setItems, addItem } = useContext(CartContext);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch items data from server
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/items");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setItems]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update filter state with user input
  };

  // Filter items based on item name or category
  const filteredItems = items.filter(
    (item) =>
      item.ItemName.toLowerCase().includes(filter.toLowerCase()) ||
      item.Category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <React.Fragment>
      <Title>Items</Title>
      <TextField
        label="Filter by Item Name or Category"
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
              <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                Price
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "25%" }}>
                Category
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                On Stock
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", width: "10%" }}
                align="right"
              >
                Add to Cart
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={`${item.ItemID}-${index}`}>
                <TableCell>{item.ItemName}</TableCell>
                <TableCell>${item.Price}</TableCell>
                <TableCell>{item.Category}</TableCell>
                <TableCell>{item.AmountStored}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ color: "#D6A556" }}
                    onClick={() => addItem(item)}
                    disabled={item.AmountStored === 0}
                  >
                    <AddIcon></AddIcon>
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
