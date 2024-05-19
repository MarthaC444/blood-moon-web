import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';

// import { Container, Row } from "";

export default function LoadingSpinner() {
  return (
    <Box>
      {/* <Row className="d-flex justify-content-center align-items-center min-vh-100"> */}
        <CircularProgress role="status" />
          {/* <span className="visually-hidden">Loading...</span> */}
      {/* </Row> */}
    </Box>
  );
}