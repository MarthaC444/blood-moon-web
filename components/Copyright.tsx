import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "} Martha Chamberlain 2023 - {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }