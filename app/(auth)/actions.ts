"use server";

import { headers, cookies } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

interface AuthResult {
  message?: string;
  severity?: "error" | "success" | "warning";
}

export const signIn = async (formData: FormData) => {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/signin?message=Could not authenticate user");
  }

  return redirect("/dashboard");
};

export interface SignUpInfo {
  email: string;
  password: string;
}

export const signUp = async (signUpInfo: SignUpInfo): Promise<AuthResult> => {
  console.log("inside signUp")
  const {email, password} = signUpInfo;
  const origin = headers().get("origin");
  // const email = formData.get("email") as string;
  // const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log("form data inside signUp", {signUpInfo}, email, password);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.log("error message", error);
    return {
      severity: 'error',
      message: 'Something went wrong. If the problem continues please contact customer service.',
    }
    // return redirect(
    //   "/register?message=Something went wrong. Please try again later.&severity=error" // Research. Something better to be done here? Return message is used to set Alert on /register.
    // );
  }

  // return redirect("/register?message=Check email to continue sign in process.&severity=success");

  return {
    severity: 'success',
    message: 'Check email to continue sign in process.',
  }
};
