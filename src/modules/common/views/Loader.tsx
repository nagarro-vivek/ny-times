import React from "react";
import { Backdrop, CircularProgress, Box } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      data-testid="loader"
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CircularProgress color="inherit" data-testid="circular-progress" />
        <Box mt={2}>Loading...</Box>
      </Box>
    </Backdrop>
  );
};

export default Loader;
