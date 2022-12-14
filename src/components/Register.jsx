import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/register.css";
import Axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setvalidMatch] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setvalidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, passwordFocus, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/user/register", {
        username: username,
        password: password,
      });

      setSuccess(true);
      setUsername("");
      setPassword("");
      setMatchPassword("");
    } catch (err) {
      if (err?.response.status === 0) {
        setErrMsg("No Server Response");
      } else if (err?.response.status === 409) {
        setErrMsg("User already exist.");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            To Login click: <Link to="/login">Login</Link>
          </p>
        </section>
      ) : (
        <div className="container">
          <div className="registration">
            <form className="registration__form" onSubmit={handleSubmit}>
              <h2 className="registration__form--header font-large">
                Registration
              </h2>
              <p className={errMsg ? "errmsg" : "offscreen"}> {errMsg}</p>
              <label
                htmlFor="username"
                className={
                  validUsername
                    ? "registration__form--label font-big valid"
                    : "registration__form--label font-big "
                }
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                className="registration__form--input"
                required
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <p
                className={
                  usernameFocus && username && !validUsername
                    ? "instructions"
                    : "offscreen"
                }
              >
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <label
                htmlFor="password"
                className={
                  validPassword
                    ? "registration__form--label font-big valid"
                    : "registration__form--label font-big "
                }
              >
                Password
              </label>
              <input
                type="password"
                className="registration__form--input"
                required
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character. Allowed special characters: ! @
                <br />
              </p>
              <label
                htmlFor="confirm-pwd"
                className={
                  validMatch & validPassword
                    ? " registration__form--label font-big valid"
                    : "registration__form--label font-big"
                }
              >
                Confirm password
              </label>
              <input
                type="password"
                className="registration__form--input"
                required
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
                onChange={(e) => setMatchPassword(e.target.value)}
              />
              <p
                className={
                  matchPasswordFocus && !validMatch
                    ? "instructions"
                    : "offscreen"
                }
              >
                Must match the password.
              </p>
              <button
                className="registration__form--button"
                disabled={
                  !validUsername || !validPassword || !validMatch ? true : false
                }
              >
                Sign up
              </button>
              <p>
                Already registered?
                <br />
                <span className="line">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
