import { cookies } from "next/headers";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import NextLink from "next/link";
import { signIn } from "../actions";

import AdbIcon from "@mui/icons-material/Adb";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid"; // replace with Grid version 2?
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Copyright from "../../../components/Copyright";

export default function SignIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // MOVED TO ACTIONS.TS
  // const signIn = async (formData: FormData) => {
  //   "use server";

  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);

  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     return redirect("/signin?message=Could not authenticate user");
  //   }

  //   return redirect("/dashboard");
  // };

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
        <Stack
          sx={{ height: "90vh" }}
          direction={"column"}
          justifyContent={"space-between"}
        >
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
              Sign in
            </Typography>
            <form action={signIn}>
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
            <Grid container spacing={2}>
              <Grid item xs>
                <Link href="/reset-request" component={NextLink} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Need an account?
                </Link>
              </Grid>
            </Grid>
            {searchParams?.message && <p>{searchParams.message}</p>}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Stack>
      </Container>
    </Box>
  );
}
