import React, { Component } from "react";
import "./UserCard.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default class UserCard extends Component {
  render() {
    return (
      <Link to={this.props.cosoPath} style={{textDecoration: 'none'}}>
        <div className="userCard">
          {this.props.children}
          <Typography variant="h3">{this.props.cardName}</Typography>
        </div>
      </Link>
    );
  }
}
