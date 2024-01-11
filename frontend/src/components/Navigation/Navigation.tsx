import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useStyles } from "./Navigation.styles";
import logo from "../../assets/shenron.png";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useConnection } from "../../hooks";
import { shortenAddress } from "../../utils";

export const Navigation: FC = () => {
  const classes = useStyles();
  const { isConnected, account, connect } = useConnection();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.navBar} color="secondary">
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <img src={logo} className={classes.logo} alt="logo" />
          </Link>
          <Box className={classes.auth}>
            {isConnected ? (
              <>
                {account && (
                  <Typography variant="h3" color="primary" fontWeight="bold">
                    {shortenAddress(account)}
                  </Typography>
                )}
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => connect()}
              >
                Connect
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
