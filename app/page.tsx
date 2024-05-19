import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import Box from "@mui/material/Box";
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
      <Typography variant="h3" component="h1">
        this is your landing page
      </Typography>
    </Box>
  );
}
