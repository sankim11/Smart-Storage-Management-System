import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, TextField, Snackbar, Paper } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Alert from "@mui/material/Alert";
import { useAuth } from "../components/AuthContext";
import TableContainer from "@mui/material/TableContainer";

export default function EmployeesList() {
  const [emps, setEmps] = useState([]);
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [error, setError] = useState("");
  const { userRole } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employees from server
        const response = await axios.get("http://localhost:4000/employees");
        setEmps(response.data);
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

  // Handle deletion of employee
  const handleDeleteEmployee = async (email) => {
    if (userRole === "manager") {
      try {
        await axios.delete(`http://localhost:4000/employees/delete/${email}`);
        setEmps(emps.filter((emp) => emp.Email !== email));
        setSnackbarSeverity("success");
        setError("Employee removed successfully");
        setSnackbarOpen(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Only managers can perform this action");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  // Filter employees based on first or last name
  const filteredEmployees = emps.filter(
    (emp) =>
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
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", width: "30%" }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "30%" }}>
                First Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: "30%" }}>
                Last Name
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
            {filteredEmployees.map((emp, index) => (
              <TableRow key={`${emp.Email}-${index}`}>
                <TableCell>{emp.Email}</TableCell>
                <TableCell>{emp.FirstName}</TableCell>
                <TableCell>{emp.LastName}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ color: "#D6A556" }}
                    onClick={() => handleDeleteEmployee(emp.Email)}
                  >
                    <PersonRemoveIcon></PersonRemoveIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
