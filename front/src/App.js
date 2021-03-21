import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-ui/core";
import PreLogin from "./PreLogin/PreLogin.js";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Login from './Login/Login';
import Employee from "./Employee/Employee";
import Company from "./Company/Company";

function App() {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/">
          <PreLogin />
        </Route>
        <Route path="/company">
        <Company/>
        </Route>
        <Route path="/employee">
          {/* <Employee/> */}
           <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
