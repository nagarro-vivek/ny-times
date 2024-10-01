import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: "40px" }}>
      <Toolbar sx={{ bgcolor: "black" }} data-testid="header">
        <Typography variant="h6" component="div">
          New York Times
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
