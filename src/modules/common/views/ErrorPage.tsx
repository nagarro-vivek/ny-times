import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

const ErrorPage: React.FC = () => {
  const error: RouteError | any  = useRouteError();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      data-testid="error-page"
    >
      <Typography variant="h4" gutterBottom>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1">
        {error?.statusText || error?.message}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
