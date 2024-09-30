import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ marginBottom: "40px" }}>
      <Toolbar sx={{ bgcolor: "black" }} data-testid="header">
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/`)}
        >
          New York Times
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
