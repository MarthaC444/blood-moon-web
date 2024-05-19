import { createClient } from "../../../utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/signin");
  };

  return (
    <>
      <form action={signOut}>
        <Button
          color="inherit"
          startIcon={<LogoutIcon sx={{ mr: 1 }} />}
          type="submit"
          aria-label="Sign out"
        >
          sign out
        </Button>
      </form>

      <h1>Dashboard page area</h1>
      <Link href="/">Home</Link>
    </>
  );
}
