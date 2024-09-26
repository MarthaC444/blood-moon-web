import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";

import Copyright from "../components/Copyright";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import AdbIcon from "@mui/icons-material/Adb";
import NextLink from "next/link";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let conditionalButton;
  user
    ? (conditionalButton = (
        <Button
          href="/dashboard"
          color="inherit"
          type="button"
          aria-label="Go to your dashboard"
        >
          {user?.email}'s dashboard
        </Button>
      ))
    : (conditionalButton = (
        <Button
          href="/signin"
          color="inherit"
          endIcon={<LoginIcon sx={{ mr: 1 }} />}
          type="button"
          aria-label="Go to sign in page"
        >
          sign in
        </Button>
      ));

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton href="/" color="inherit" aria-label="Go to home page">
            <AdbIcon sx={{ mr: 1 }} />
          </IconButton>
          {conditionalButton}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" sx={{ my: 4 }}>
          The Blood Moon Web App begins.
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 1 }}>
          Introduction
        </Typography>
        <Typography variant="body1">
          This is my first Next.js project. Presently, it has working Auth. Click on the "Sign In" link in my navigation bar
          and have a fun time registering an account!
        </Typography>
        <Typography variant="h4" component="h2" sx={{ my: 3, mb: 1 }}>
          Technologies
        </Typography>
        <Typography variant="h5" component="h3" sx={{ my: 3, mb: 1 }}>
          Implemented
        </Typography>
        <ul>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Supabase/PostgreSQL</li>
          <li>Material UI</li>
        </ul>
        <Typography variant="h5" component="h3" sx={{ my: 3, mb: 1 }}>
          Planned
        </Typography>
        <ul>
          <li>Cypress, React Testing Library</li>
          <li>Storybook</li>
        </ul>
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 1 }}>
          What will Blood Moon do?
        </Typography>
        <Typography variant="body1">
          The idea of Blood Moon combines two of my interests, coding and
          shamanism. Through techniques old and new the app will present paths
          and opportunities for creating connection, meaning and purpose through
          interaction and alignment with the life force of the world around us.
        </Typography>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
}
Box;
