import React from "react";
import { useState } from "react";
import student from "../../assets/students.jpg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passErrors = useRef();
  const emailErrors = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const data = {
        email,
        password,
      };
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_USER}/login`,
        withCredentials: true,
        data,
      })
        .then((res) => {
          if (res.data.errors) {
            emailErrors.current.innerHTML = res.data.errors.email;
            passErrors.current.innerHTML = res.data.errors.password;
          } else {
            window.location = "/";
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="signin">
      <div className="log__connect">
        <form onSubmit={handleSubmit} className="forminput">
          <label className="userlock">
            <LockOutLinedIcon />
          </label>

          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div ref={emailErrors} className="errors"></div>

          <label htmlFor="password">Mot de Passe</label>

          <input
            type="password"
            autoComplete="off"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="errors" ref={passErrors}></div>

          <input type="submit" value="connexion" className="conins" />

          <div className="errors"></div>
        </form>
        <div className="regist">
          Vous n'avez pas de compte{" "}
          <Link className="reg" to="/register">
            inscrivez vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
