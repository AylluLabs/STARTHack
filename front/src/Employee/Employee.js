import React, { Component } from "react";
import Navbar from "./navbar/Navbar";
import { Button, Card, CardContent, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import MemoryIcon from "@material-ui/icons/Memory";
import "./Employee.css";
import NavButton from "./NavButton";
import Office from './Services/Office/Office';

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navButtons: [
        { name: "My office", selected: true, icon: <PersonIcon /> },
        { name: "Well-being", selected: false, icon: <FavoriteIcon /> },
        { name: "Food", selected: false, icon: <RestaurantIcon /> },
        { name: "Hardware", selected: false, icon: <MemoryIcon /> },
      ],
      selected: "My office",
    };

    this.handleNavSelection = this.handleNavSelection.bind(this);
  }

  handleNavSelection(buttonName) {
    let newState = this.state.navButtons;
    console.log(newState);
    newState.map((x) => (x.selected = false));
    console.log(newState);

    newState.forEach((x) => {
      if (x.name === buttonName) {
        x.selected = true;
      }
    });
    console.log(newState);

    this.setState({ navButtons: newState, selected: buttonName });
  }

  renderMainView(selected) {
    switch (selected) {
      case "My office":
        return <Office/>;
      case "Well-being":
        return <p>La salud</p>;
      case "Food":
        return <p>La food</p>;
      case "Hardware":
        return <p>La hardware</p>;
    default:
        return <p>Error</p>
    }
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="navigationIcons">
          {this.state.navButtons.map((navButton) => (
            <NavButton
              buttonName={navButton.name}
              selected={navButton.selected}
              click={() => this.handleNavSelection(navButton.name)}
            >
              {navButton.icon}
            </NavButton>
          ))}
        </div>

        {this.renderMainView(this.state.selected)}
      </div>
    );
  }
}
