"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { goHome } from "../actions";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Fade from "@mui/material/Fade";

export default function ResetLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // const [loading, setLoading] = useState(true);
  // const [open, setOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    // const handleLoad = () => {
    //   setLoading(false);
    //   setOpen(true);
    // };

    // if (document.readyState === "complete") {
    //   handleLoad();
    // } else {
    //   window.addEventListener("load", handleLoad);
    //   // Remove the event listener when component unmounts
    //   return () => window.removeEventListener("load", handleLoad);
    // }
    // }, []);

    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        goHome(); 
      }
      if (event === "SIGNED_OUT") {
        const storageList: Storage[] = [];

        if (typeof window !== "undefined") {
          // storageList.push(window.localStorage);
          storageList.push(window.sessionStorage);
        }

        // clear session data on signout
        storageList.forEach((storage) => {
          Object.entries(storage).forEach(([key]) => {
            if (key.endsWith("auth-token")) {
              storage.removeItem(key);
            }
          });
        });

        // setTimeout(() => { nextRouter.push('/signin') });
      } else if (event === "PASSWORD_RECOVERY") {
        // console.log(event, session);
      } else if (event === "TOKEN_REFRESHED") {
        // debug(event, session);
      } else if (event === "USER_UPDATED") {
        // debug(event, session);
      } else if (event === "INITIAL_SESSION") {
        // debug(event, session);
      } else {
        // debug(event, session);
      }
    });
  });

  return <div>{children}</div>;
}
