"use client";
import React, { useEffect, useState } from "react";
// import { cookies } from "next/headers";
import { useFormik } from "formik";
import * as yup from "yup";

import { resetRequest, ResetRequestInfo } from "../actions";

import AdbIcon from "@mui/icons-material/Adb";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WarningIcon from "@mui/icons-material/Warning";

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

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

interface AlertInfo {
  message?: string;
  severity?: "error" | "success" | "warning";
}

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function Reset({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({});
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  useEffect(() => {
    if (alertInfo.message) {
      setState({ ...state, open: true });
    }
  }, [alertInfo]);

  const handleClose = () => {
    setState({ ...state, open: false });
    setAlertInfo({});
  };

  const { vertical, horizontal, open } = state;

  const initialValues: ResetRequestInfo = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await resetRequest(values);
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
              <Stack direction="row" gap={1} alignItems="center" py={2}>
                <WarningIcon color="warning" fontSize="large" />
                <Typography color="warning" fontSize="small">
                  Must verify email address from this device.
                </Typography>
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
            {/* <Grid container spacing={2}>
            <Grid item xs>
            <Link href="/signin" component={NextLink} variant="body2">
            Sign in
            </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Need an account?
              </Link>
            </Grid>
          </Grid> */}
            {searchParams?.message && <p>{searchParams.message}</p>}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Stack>
      </Container>
    </Box>
  );
}
