"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import { useFormik } from "formik";
import * as yup from "yup";

import { resetPassword, ResetPasswordInfo } from "../actions";

import AdbIcon from "@mui/icons-material/Adb";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import Copyright from "../../../components/Copyright";
// import { redirect } from "next/dist/server/api-utils";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be of minimum 8 characters length")
    .max(26, "Password must be less than 27 characters in length")
    .matches(/[a-z]+/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]+/, "Password must contain at least one number")
    .required("Password is required"),
});

interface AlertInfo {
  message?: string;
  severity?: "error" | "success" | "warning";
}

interface State extends SnackbarOrigin {
  open: boolean;
}



export default function ResetPassword({
  searchParams,
}: {
  searchParams?: {
    message?: string;
  };
}) {
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({});
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const router = useRouter();

  const goDashboard = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    if (alertInfo.message) {
      setState({ ...state, open: true });
    }
  }, [alertInfo]);

  const handleClose = () => {
    if (alertInfo.severity === "success") {
      setState({ ...state, open: false });
      setTimeout(() => {
        setAlertInfo({});
      }, 1000);
      goDashboard();
    } else {
      setState({ ...state, open: false });
      setTimeout(() => {
        setAlertInfo({});
      }, 1000);
    }
  };

  const { vertical, horizontal, open } = state;

  const initialValues: ResetPasswordInfo = {
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await resetPassword(values);
      setAlertInfo(res);
    },
  });

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
              Request Password Reset
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
            <Box justifyContent="center" margin={2}>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                key={vertical + horizontal}
              >
                <Alert
                  onClose={handleClose}
                  severity={alertInfo.severity}
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {alertInfo.message}
                </Alert>
              </Snackbar>
            </Box>
            {searchParams?.message && <p>{searchParams.message}</p>}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Stack>
      </Container>
    </Box>
  );
}
