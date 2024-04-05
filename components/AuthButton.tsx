import React from "react";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import NextLink from "next/link";

import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";


export default async function AuthButton() {
  "use server"
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <Box display="flex">
      <Typography sx={{ alignSelf: "center", mr: 1 }}>
        Hello, {user.email}
      </Typography>
      <form action={signOut}>
        <Button type="submit" color="inherit" startIcon={<LogoutIcon />}>
           {/* sx={{ mx: 0.5 }} /> */}
          Sign Out
        </Button>
      </form>
    </Box>
  ) : (
    <Box display="flex">
      <Button href="/login" color="inherit" endIcon={<LoginIcon />} type="button">
        Sign In
        {/* <LoginIcon sx={{ alignSelf: "center", mx: 0.5 }} /> */}
      </Button>
      {/* <Link component={NextLink} href="/login"></Link> */}
    </Box>
  );
}
