import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ReactComponent as Logo } from "../resources/logos/logo_name.svg";
import Employee from "../Employee/Employee";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Ayllu Labs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [wrong, setwrong] = useState(false);

  function authenticate() {
    const url = "https://3f05c5ca1147.ngrok.io/wellbeing/authenticateUser/";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("authenticatedData:", data, data.auth, data.auth === true);

        if (data.auth) {
          setAuthenticated(true);
          console.log("authenticated!");
        } else {
          setwrong(true);
        }
      })
      .catch((e) => {
        console.log("erro", e);
      });
  }
  function signUp() {
    console.log("signUp");
    const url = "https://3f05c5ca1147.ngrok.io/wellbeing/createUser/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("signupData:", data);
        setAuthenticated(true);
      })
      .catch((e) => {
        console.log("erro", e);
      });

    setAuthenticated(true);
  }

  function usernameOnChange(e) {
    setusername(e.target.value);
  }

  function passwordOnChange(e) {
    setpassword(e.target.value);
  }

  function renderContent() {
    if (authenticated) {
      return <Employee username={username} />;
    }
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {/* <form className={classes.form} noValidate> */}
          <Logo />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            onChange={usernameOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={passwordOnChange}
          />
          {wrong ? (
            <Typography style={{ color: "red" }}>
              Wrong username/password
            </Typography>
          ) : (
            ""
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={authenticate}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
          >
            Sign up
          </Button>
          {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          {/* </form> */}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }

  return renderContent();
}
