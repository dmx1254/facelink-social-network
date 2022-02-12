import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    location.pathname === "/login" ||
    location.pathname === "/register" || (
      <div className="footer">
        <div className="cops">
          <p>&copy; copyright {new Date().getFullYear()}</p>
          <p> Mamadou SY</p>
        </div>
        <div className="conta">
          <span>contactez moi</span>
          <p>
            <a
              href="tel: +221784632811"
              target="_blank"
              rel="noopener noreferrer"
            >
              784632811
            </a>
          </p>
          <p>
            <a href="mailto" target="_blank" rel="noopener noreferrer">
              mamadousy1254@gmail.com
            </a>
          </p>
        </div>
        <div className="apping">
          <p>Facelink web app</p>
        </div>
      </div>
    )
  );
};

export default Footer;
