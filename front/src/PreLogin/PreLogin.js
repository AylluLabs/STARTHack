import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Login from "../Login/Login";

export default class PreLogin extends Component {
  render() {
    return (
      <div>
        <Button
          component={Link}
          to={"/company"}
          variant="contained"
          color="primary"
        >
          Company
        </Button>

        <Button component={Link}
          to={"/employee"}
        variant="contained" 
        color="primary">
            Employee
        </Button>
      </div>
    );
  }
}
