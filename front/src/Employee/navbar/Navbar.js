import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static" className="navbar">
          <Toolbar>
            <Typography variant="h6">Ayllu</Typography>
            <Typography variant="h6" className="companyLogo">
              Accenture
            </Typography>
            <IconButton >
              <NotificationsIcon className="navbarIcon"/>
            </IconButton>
            <IconButton >
              <PersonIcon className="navbarIcon"/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
