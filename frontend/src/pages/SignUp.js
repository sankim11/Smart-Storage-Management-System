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
  const [selectedValue, setSelectedValue] = React.useState("Employee");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, ml: 8, mr: 8 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                name="firstName"
                label="Full Name"
                id="fullName"
                autoComplete="given-name"
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
                sx={{}}
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
                href="/"
              >
                Sign Up
              </Button>
              <Grid item>
                <Link href="/" variant="body2" style={{ color: "inherit" }}>
                  {"Already have an account?"}
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