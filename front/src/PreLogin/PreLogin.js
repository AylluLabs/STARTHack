import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserCard from "./UserCard";
import { ReactComponent as Girl } from "../resources/illustrations/woman_circle.svg";
import { ReactComponent as Man } from "../resources/illustrations/men_circle.svg";
import { ReactComponent as Logo } from "../resources/logos/logo_name.svg";
import "./PreLogin.css";

export default class PreLogin extends Component {
  render() {
    return (
      <div>
        <div className="logo">
          <Logo height={70} width={150}/>
        </div>
        <div className="userCardContainer">
          <UserCard cardName="Company" cosoPath="/company">
            <Girl width={200} />
          </UserCard>   
          <UserCard cardName="Employee" cosoPath="/employee">
            <Man width={200} />
          </UserCard>
        </div>
      </div>
    );
  }
}
