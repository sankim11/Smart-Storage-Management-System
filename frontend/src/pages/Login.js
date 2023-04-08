import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgSrc from "../media/beehive.jpg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import HiveIcon from "@mui/icons-material/Hive";
import { Radio, RadioGroup } from "@mui/material";
import Link from "@mui/material/Link";
import axios from 'axios';
import { useState, useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © L'Alveare "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [emp, setEmp] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState("Employee");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = useState("");
  const [emps, setEmps] = React.useState([]);
  const [cust, setCust] = React.useState([]);
  const [error, setError] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customers');
        setCust(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEmployee = () => {
    setEmp(true);
  };

  const handleCustomer = () => {
    setEmp(false);
  };

  const handleChange = (event) => {
    if (event.target.value === "Customer") handleCustomer();
    if (event.target.value === "Employee") handleEmployee();
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(emp) {
      const user = emps.find((employee) => employee.Email === email && employee.PasswordE === password);
      if (user) {
        window.location.href = "/dashboard";
      } else {
        setError('Invalid email or password.');
      }
    }
    if(!emp) {
      const user = cust.find((customer) => customer.ClientEmail === email && customer.ClientPassword === password);
      if (user) {
        window.location.href = "/homepage";
      } else {
        setError('Invalid email or password.');
      }  
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${imgSrc})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#EAD1A8",
          }}
        >
          <Card sx={{ borderRadius: "0px", backgroundColor: "#E0BB7F" }}>
            <CardHeader
              title={
                <Typography variant="h4" sx={{ fontFamily: "unset" }}>
                  L'Alveare Storage System <HiveIcon></HiveIcon>
                </Typography>
              }
            />
          </Card>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#E0BB7F", color: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, ml: 8, mr: 8 }}
            >
              {error && <p>{error}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: "#ecddc5",
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  backgroundColor: "#ecddc5",
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
              <RadioGroup
                row
                aria-labelledby="customer-type"
                defaultValue="Employee"
                name="customer-type"
              >
                <FormControlLabel
                  value="Employee"
                  control={
                    <Radio
                      {...controlProps("Employee")}
                      sx={{
                        "&.Mui-checked": {
                          color: "#D6A556",
                        },
                      }}
                    />
                  }
                  label="Employee"
                />
                <FormControlLabel
                  value="Customer"
                  control={
                    <Radio
                      {...controlProps("Customer")}
                      sx={{
                        "&.Mui-checked": {
                          color: "#D6A556",
                        },
                      }}
                    />
                  }
                  label="Customer"
                />
              </RadioGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#E0BB7F",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#D6A556",
                  },
                }}
              >
                Sign In
              </Button>
              <Grid item>
                <Link
                  href="/signupemp"
                  variant="body2"
                  style={{ color: "inherit" }}
                >
                  {"Don't have an account? Sign Up as Employee"}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/signupcus"
                  variant="body2"
                  style={{ color: "inherit" }}
                >
                  {"Don't have an account? Sign Up as Customer"}
                </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
