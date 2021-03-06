import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import {ReactComponent as Logo} from "../resources/logos/logo.svg";
import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <AppBar elevation={0} position="static" className="navbar">
          <Toolbar>
            <Logo width={50} height={50} className="logo"/>
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
