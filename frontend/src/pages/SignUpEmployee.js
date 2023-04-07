import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import Link from "@mui/material/Link";
import axios from 'axios';

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

export default function SignUp() {
  //Email Address
  const [signUpEmail, setSignUpEmail] = React.useState('');
  //First Name
  const [signUpFirstName, setSignUpFirstName] = React.useState('');
  //Last Name
  const [signUpLastName, setSignUpLastName] = React.useState('');
  //Password
  const [signUpPassword, setSignUpPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let signUpInformation = {
      email: signUpEmail,
      firstName: signUpFirstName,
      lastName: signUpLastName,
      password: signUpPassword,
    };
    event.preventDefault();
    if (
      signUpEmail === '' ||
      signUpFirstName === '' ||
      signUpLastName === '' ||
      signUpPassword === ''
    )
  
    axios.post("http://localhost:4000/addUser", signUpInformation)
      .then(response => {
        console.log(response.data);
        // redirect to another page or show a success message to the user
      })
      .catch(error => {
        console.error(error);
        // show an error message to the user
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
                onChange={(event) => {
                  setSignUpEmail(event.target.value)
                }}
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
                label="First Name"
                id="firstName"
                autoComplete="first-name"
                onChange={(event) => {
                  setSignUpFirstName(event.target.value)
                }}
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
                name="lastName"
                label="Last Name"
                id="lastName"
                autoComplete="last-name"
                onChange={(event) => {
                  setSignUpLastName(event.target.value)
                }}
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
                onChange={(event) => {
                  setSignUpPassword(event.target.value)
                }}
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
