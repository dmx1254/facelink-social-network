import React, { useEffect, useRef } from "react";
import userlogo from "../../assets/user.png";
import { FcSwitchCamera, FcSportsMode, FcStart, FcGlobe } from "react-icons/fc";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const HeaderBottom = ({ handleToggleVideo }) => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="headerbottom">
      <div className="img">
        {user ? (
          <>
            <img
              src={user && user.picture ? user.picture : userlogo}
              alt="msypro"
            />
            <span>{user && user.bio}</span>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className="other">
        <div>
          <span className="icon">
            <FcSwitchCamera />
          </span>
          <span className="logo">photo</span>
        </div>
        <div onClick={handleToggleVideo}>
          <span className="icon">
            <FcStart />
          </span>
          <span className="logo">video</span>
        </div>
        <div>
          <span className="icon">
            <FcSportsMode />
          </span>
          <span className="logo">sport</span>
        </div>
        <div>
          <span className="icon">
            <FcGlobe />
          </span>
          <span className="logo">Explorer</span>
        </div>
        <div className="button">
          <button>partager</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
