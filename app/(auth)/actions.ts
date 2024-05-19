"use server";

import { headers, cookies } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthApiError } from "@supabase/supabase-js";

export const goHome = () => {
  redirect("/");
};

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
  const { email, password } = signUpInfo;
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      severity: "error",
      message:
        "Something went wrong. If the problem continues please contact an administrator.",
    };
  }

  return {
    severity: "success",
    message: "Check email to continue sign in process.",
  };
};

export interface ResetRequestInfo {
  email: string;
}

export const resetRequest = async (
  resetRequestInfo: ResetRequestInfo
): Promise<AuthResult> => {
  const { email } = resetRequestInfo;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "localhost:3000/reset-password",
  });

  if (error) {
    return {
      severity: "error",
      message:
        "Something went wrong. If the problem continues please contact an administrator.",
    };
  }

  return {
    severity: "success",
    message:
      "Check the email address you provided to continue the sign in process.",
  };
};

export interface ResetPasswordInfo {
  password: string;
}

export const resetPassword = async (
  resetPasswordInfo: ResetPasswordInfo
): Promise<AuthResult> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { password } = resetPasswordInfo;
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log("inside resetPassword, error message", error);
    if (error.status === 422) {
      return {
        severity: "error",
        message: "New password should be different than old password.",
      };
    } else if (error.status === 400) {
      return {
        severity: "error",
        message: "Your session has expired. Please request a password reset.",
      };
    } else {
      return {
        severity: "error",
        message:
          "Something went wrong. Please try again and if the problem continues please contact an administrator.",
      };
    }
  }
  return {
    severity: "success",
    message: "Your password has been updated. Taking you to your dashboard...",
  };
};
