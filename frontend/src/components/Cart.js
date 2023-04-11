import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { CartContext } from "./CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useAuth } from "./AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Cart() {
  const { cartItems, deleteItem, setCartItems } = useContext(CartContext);
  const [filter, setFilter] = useState("");
  const { currentUser } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handler for filter text field
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Calculate subtotal for all items in the cart
  const subtotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );

  // Filter cart items based on search filter
  const FilteredCartItems = cartItems.filter(
    (item) =>
      item.ItemName.toLowerCase().includes(filter.toLowerCase()) ||
      item.Category.toLowerCase().includes(filter.toLowerCase())
  );

  // Handler for buy button click
  const handleBuy = async () => {
    try {
      // Create a new cart
      const response = await fetch(
        `/customers/create/cart/${currentUser.ClientEmail}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      const cartId = data[0].entry_id;

      // Insert new items bought by this cartId
      for (const item of cartItems) {
        await fetch(
          `/itemslist/add/${cartId}/${item.ItemID}/${item.quantity}`,
          {
            method: "POST",
          }
        );
      }

      // Update the storage to reflect the purchase
      await fetch(`/storage/update/${cartId}`, {
        method: "PUT",
      });

      // Create a new report for this cartId
      await fetch(`/report/create/${cartId}`, {
        method: "POST",
      });

      // Clear the cart and show a success message
      setCartItems([]);
    } catch (error) {
      console.error("Error purchasing items:", error);
      alert("An error occurred while purchasing items. Please try again.");
    }
    // Show snackbar to indicate successful purchase
    setSnackbarOpen(true);
  };

  // Handler for closing the snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Title>Cart</Title>
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", width: "20%" }}>
              Name
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: "20%" }}>
              Price
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: "20%" }}>
              Category
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: "20%" }}>
              Quantity
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: "20%" }}>
              Remove
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", width: "20%" }}
              align="right"
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {FilteredCartItems.map((item, index) => (
            <TableRow key={`${item.ItemID}-${index}`}>
              <TableCell>{item.ItemName}</TableCell>
              <TableCell>${item.Price}</TableCell>
              <TableCell>{item.Category}</TableCell>
              <TableCell>
                <Select
                  value={item.quantity}
                  onChange={(event) => {
                    const newQuantity = event.target.value;
                    setCartItems((prevItems) =>
                      prevItems.map((cartItem) =>
                        cartItem.ItemID === item.ItemID
                          ? { ...cartItem, quantity: newQuantity }
                          : cartItem
                      )
                    );
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    },
                  }}
                >
                  {Array.from({ length: item.AmountStored }, (_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  style={{ color: "#D6A556" }}
                  onClick={() => deleteItem(item)}
                  disabled={item.AmountStored === 0}
                >
                  <DeleteIcon></DeleteIcon>
                </Button>
              </TableCell>
              <TableCell align="right">${item.Price * item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>
              <Button
                variant="contained"
                style={{ color: "black", backgroundColor: "#D6A556" }}
                onClick={handleBuy}
              >
                Buy
              </Button>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Subtotal: ${subtotal}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Items purchased successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}