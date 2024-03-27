"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { signUp, type SignUpInfo } from "../actions";

import Copyright from "../../../components/Copyright";

import AdbIcon from "@mui/icons-material/Adb";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid"; // replace with Grid version 2?
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be of minimum 8 characters length")
    .max(26, "Password must be less than 27 characters in length")
    .matches(/[a-z]+/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]+/, "Password must contain at least one number")
    .required("Password is required"),
  confirm: yup
    .string()
    .min(8, "Password must be of minimum 8 characters length")
    .max(26, "Password must be less than 27 characters in length")
    .required("Confirming the password is required")
    .oneOf([yup.ref("password")] as const, "Passwords do not match"),
});

interface SignUpFormData extends SignUpInfo {
  confirm: string;
}

interface AlertInfo {
  message?: string;
  severity?: "error" | "success" | "warning";
}

export default function Register({
  searchParams, //Remove?
}: {
  searchParams?: { message?: string; severity?: "error" | "success" | "warning" };
}) {
  const [alert, setAlert] = useState<AlertInfo>({});
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialValues: SignUpFormData = {
    email: "",
    password: "",
    confirm: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const alert = await signUp(values);
      // TODO reset form
    },
  });

  // useEffect(() => {
  //   if (searchParams?.message) {
  //     const {message, severity} = searchParams;
  //     setAlert({
  //       message,
  //       severity,
  //     })
  //   }
  // }, [searchParams]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton href="/" color="inherit" aria-label="Go to home page">
            <AdbIcon />
          </IconButton>
          <Button
            href="/signin"
            color="inherit"
            startIcon={<ArrowBackIosNew sx={{ mr: 1 }} />}
            type="button"
          >
            back
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          alignItems="right"
          sx={{
            marginTop: { xs: 2, sm: 8 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <form onSubmit={formik.handleSubmit}>
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
            <FormControl margin="normal" required fullWidth variant="outlined">
              <InputLabel
                htmlFor="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                id="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm"
              label="Confirm Password"
              name="confirm"
              type="password"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              helperText={formik.touched.confirm && formik.errors.confirm}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
          <Grid container justifyContent="center" gap={2} margin={2}>
            <Link href="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
            {alert.message ? <Alert severity={alert.severity} onClose={() => {setAlert({})}}>
              {alert.message}
            </Alert> : null}
            {/* {searchParams?.message && <p>{searchParams.message}</p>} */}
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}
