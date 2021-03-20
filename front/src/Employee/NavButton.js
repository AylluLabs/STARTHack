import React, { Component } from "react";
import { Button} from "@material-ui/core";
import './NavButton.css';
export default class NavButton extends Component {
  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={`navigationIcon ${this.props.selected?"selected":"unselected"}`}
        startIcon={this.props.children}
        onClick={this.props.click}
      >
        {this.props.buttonName}
      </Button>
    );
  }
}
