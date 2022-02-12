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

const Register = () => {
  let passErrors = useRef();
  let confirmPassErrors = useRef();
  let pseudoErrors = useRef();
  let emailErrors = useRef();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [view, setView] = useState("text");
  const [viewOf, setViewOf] = useState("password");
  const [changeconf, setChangeConf] = useState(false);
  const [change, setChange] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8 || password !== confirmpassword) {
      if (password.length < 8) {
        passErrors.current.innerHTML =
          "Le mot de passe doit faire 8 caractéres minimum";
      } else {
        confirmPassErrors.current.innerHTML =
          "Les mots de passes ne correspondent pas";
        passErrors.current.innerHTML = "";
      }
    } else {
      passErrors.current.innerHTML = "";
      confirmPassErrors.current.innerHTML = "";
      const data = {
        userName,
        pseudo,
        email,
        password,
      };

      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_USER}/register`,
        withCredentials: true,
        data,
      })
        .then((res) => {
          if (res.data.errors) {
            pseudoErrors.current.innerHTML = res.data.errors.pseudo;
            emailErrors.current.innerHTML = res.data.errors.email;
          } else {
            window.location = "/login";
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePassChange = () => {
    setChange((prevChangeState) => !prevChangeState);
  };

  const handlePassChangeConf = () => {
    setChangeConf((prevChangeConfState) => !prevChangeConfState);
  };

  return (
    <div className="signup">
      <div className="log__connect">
        <form onSubmit={handleSubmit} className="forminput">
          <label className="userlock">
            <LockOutLinedIcon />
          </label>

          <label htmlFor="userName">prenom</label>

          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="errors"></div>
          <label htmlFor="pseudo">Pseudo</label>

          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <div ref={pseudoErrors} className="errors"></div>

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
            type={change ? view : viewOf}
            autoComplete="off"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="pass" onClick={handlePassChange}>
            <VisibilityOff
              style={{
                display: change ? "none" : "block",
              }}
            />
          </span>
          <span className="pass1" onClick={handlePassChange}>
            <Visibility
              style={{
                display: change ? "block" : "none",
              }}
            />
          </span>
          <div className="errors" ref={passErrors}></div>

          <label htmlFor="confirmpass">Confirmer mot de passe</label>

          <input
            type={changeconf ? view : viewOf}
            name="confirmpassword"
            id="confirmpass"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="pass3" onClick={handlePassChangeConf}>
            <VisibilityOff
              style={{
                display: changeconf ? "none" : "block",
              }}
            />
          </span>
          <span className="pass4" onClick={handlePassChangeConf}>
            <Visibility
              style={{
                display: changeconf ? "block" : "none",
              }}
            />
          </span>

          <div className="errors" ref={confirmPassErrors}></div>

          <input type="submit" value="inscription" className="conins" />
        </form>
        <div className="sign">
          Vous avez déja un compte{" "}
          <Link className="lin" to="/login">
            Connectez vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
