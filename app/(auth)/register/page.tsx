import { headers, cookies } from "next/headers";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import { ArrowBackIosNew } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid"; // replace with Grid version 2?
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import {
// AppBar, 
//  Avatar,
//  Box,
//  Button,
//  Checkbox,
//  Container,
//  FormControlLabel,
//  IconButton,
//  Grid,// replace with Grid version 2?
//  TextField,
//  Toolbar,
//  Typography, } from "@mui/material";

// import ArrowBackIos from "@mui/icons-material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import AdbIcon from "@mui/icons-material/Adb";

import Copyright from "../../../components/Copyright";

export default function Register({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    console.log("form data", email, password);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("error message", error);
      return redirect(
        "/register?message=Something went wrong. Please try again later."
      );
    }

    return redirect(
      "/register?message=Check email to continue sign in process"
    );
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton href="/" color="inherit" aria-label="Go to home page">
            <AdbIcon />
          </IconButton>
          <Button
            href="/"
            color="inherit"
            startIcon={<ArrowBackIosNew sx={{ mr: 1 }} />}
            type="button"
          >
            back
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form action={signUp}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
          <Grid container></Grid>
          {searchParams?.message && <p>{searchParams.message}</p>}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}
