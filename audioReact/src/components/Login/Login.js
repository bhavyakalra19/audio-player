import React, { useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [username, setuserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [creds, setCreds] = useState(true);
  const [loginCon, setLoginCon] = useState(true);
  const [passLabel,setPassLabel] = useState("Password")
  const [userLabel,setUserLabel] = useState("Username")

  const emailChangeHandler = (event) => {
    setuserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const urlPath = loginCon ? "http://127.0.0.1:8000/api-auth/check-user" : "http://127.0.0.1:8000/api-auth/register-user";
    fetchSearchData(urlPath);
  };

  const signUpHandler = () => {
    setuserName("")
    setEnteredPassword("")
    setLoginCon(false);
    setPassLabel("Set Password");
    setUserLabel("Set Username");
  };
  const fetchSearchData = async(urlPath) => {
    const headers = new Headers();
    headers.set("Content-Type","application/json");
    const jsonCreds = {
      "username": username,
      "password": enteredPassword,
    }
    try {
      const response = await fetch(urlPath, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(jsonCreds),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token",data.token)
        props.onLogin()
      } else {
        setCreds(false)
      }
    } catch (error) {
      console.log("Error fetching data from Backend:", error);
    }
  };

  return (
    <Card className={classes.login}>
      {loginCon ? <p className={classes.actions}>Login Form</p> : <p className={classes.actions}>Sign Up Form</p>}
      {!creds && (
        <div className={classes.invalidCreds}>
          <p>Invalid Credentials</p>
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div className={`${classes.control}`}>
          <label htmlFor="email">{userLabel}</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="password">{passLabel}</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
          {loginCon && (
            <Button className={classes.btn} onClick={signUpHandler}>
              Sign Up
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default Login;
