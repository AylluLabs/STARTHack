import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserCard from './UserCard';
import {ReactComponent as Girl} from './illustrations/girl_circle.svg';
import {ReactComponent as Man} from './illustrations/men_circle.svg';
import './PreLogin.css';

export default class PreLogin extends Component {
  render() {
    return (
      <div className='userCardContainer'>
        <UserCard cardName="Company" cosoPath="/company">
            <Girl width={200}/>
        </UserCard>

        <UserCard cardName="Employee" cosoPath="/employee">
            <Man width={200}/>
        </UserCard>

      </div>
    );
  }
}
