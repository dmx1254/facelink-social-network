import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useContext } from "react";
import { UidContext } from "../myContext/UidContext";
import axios from "axios";
import { useEffect } from "react";
import { deleteUser, getUser } from "../../actions/userActions";
import userlogo from "../../assets/user.png";
import AllUsers from "../allusers/AllUsers";
import { useLocation } from "react-router-dom";
import Notif from "../notif/Notif";
import { CircularProgress } from "@material-ui/core";

const Topbar = () => {
  const uid = useContext(UidContext);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [scrollSize, setScrollSize] = useState(null);
  const [scrollWidth, setScrollWidth] = useState(null);
  const [notifToggle, setNotifToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
    dispatch({ type: "TOGGLE", payload: { toggle: toggle } });
  };

  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);

  const { user, loading } = useSelector((state) => state.userReducer);
  const { users } = useSelector((state) => state.userReducer);
  const scrollFunc = () => {
    window.addEventListener("scroll", () => {
      setScrollSize(window.scrollY);
      setScrollWidth(window.innerWidth);
    });
  };
  useEffect(() => {
    scrollFunc();
  }, []);

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT", payload: true });
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL_USER}/logout`,
      withCredentials: true,
    }).then(() => {
      window.location = "/login";
    });
  };

  const location = useLocation();
  const handleShow = () => {
    setShow((prevState) => !prevState);
  };
  const handleDeleteUser = () => {
    try {
      dispatch(deleteUser(user._id));
      window.location = "/register";
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotifToggle = () => {
    setNotifToggle((prevState) => !prevState);
  };
  // if(loading) return <CircularProgress />
  return (
    location.pathname === "/register" ||
    location.pathname === "/login" || (
      <>
        <div
          className="topbar"
          
        >
          {location.pathname === "/register" || (
            <div className="topbar__title">
              <Link to="/">
                <h1 className="title">Facelink</h1>
              </Link>
            </div>
          )}
          {location.pathname === "/register" || (
            <div
              className="topbar__search"
              style={{
                transform:
                  scrollSize >= 53 &&
                  scrollWidth <= 506 &&
                  "translateY(-400px)",
              }}
            >
              <BiSearch className="icon" />
              <input
                autoComplete="off"
                type="text"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="rechercher vos  amis..."
                id="search"
              />
            </div>
          )}
          {location.pathname === "/register" || (
            <div className="topbar__userinfo">
              <span onClick={handleToggle}>
                {uid && <AiFillPlusSquare className="writer" />}
              </span>
              <span>
                <FaUserAlt />
                <p
                  style={{
                    display: "none",
                  }}
                >
                  0
                </p>
              </span>
              <span>
                <BsFillChatLeftTextFill />
                <p
                  style={{
                    display: "none",
                  }}
                >
                  0
                </p>
              </span>
              <span>
                <IoNotificationsSharp onClick={handleNotifToggle} />
                <p
                  style={{
                    display: user?.followers?.length < 1 ? "none" : "block",
                  }}
                >
                  {user && user?.followers?.length}
                </p>
              </span>
              {notifToggle && (
                <div className="usernotif">
                  {users.map((userNotif) => {
                    for (let i = 0; i < user?.followers?.length; i++) {
                      if (userNotif._id === user.followers[i])
                        return (
                          <Notif
                            userNotif={userNotif}
                            key={userNotif._id}
                            leng={user?.followers?.length}
                          />
                        );
                    }
                  })}
                </div>
              )}
            </div>
          )}
          {location.pathname === "/register" || (
            <div className="topbar__user">
              <div className="ma_wid">
                <Link to="/">
                  <span>
                    <i className="fas fa-home"></i>
                  </span>
                </Link>
                {
                  <span onClick={handleToggle}>
                    <i className="fas fa-plus-square"></i>
                  </span>
                }
                <span className="mess">
                  <i className="fas fa-comment-dots"></i>
                </span>
                <span className="notifred">
                  <i className="fas fa-bell" onClick={handleNotifToggle}></i>
                  <p
                    style={{
                      display: user?.followers?.length < 1 ? "none" : "block",
                    }}
                  >
                    {user?.followers?.length}
                  </p>
                  {notifToggle && <i className="fas fa-chevron-up"></i>}
                  {notifToggle && (
                    <div className="usernotif">
                      {users.map((userNotif) => {
                        for (let i = 0; i < user?.followers?.length; i++) {
                          if (userNotif._id === user.followers[i])
                            return (
                              <Notif
                                userNotif={userNotif}
                                key={userNotif._id}
                                leng={user?.followers?.length}
                              />
                            );
                        }
                      })}
                    </div>
                  )}
                </span>
              </div>
              <img
                onClick={handleShow}
                src={user && user.picture ? user.picture : userlogo}
                alt="msypro"
              />
            </div>
          )}
          <div
            className="profil"
            style={{
              display: show ? "block" : "none",
            }}
          >
            <Link to="/setting">
              <p>
                <i className="fas fa-user"></i> <span>Profil</span>
              </p>
            </Link>
            <p className="suggest">Suggestions</p>

            <p className="re_search">Search</p>

            <p
              onClick={handleDeleteUser}
              style={{
                color: "#bb2124",
              }}
            >
              Supprimer compte
            </p>
            <p onClick={handleLogout}>Deconnexion</p>
          </div>
        </div>
        <div className="users_search">
          {searchTerm && <AllUsers searchTerm={searchTerm} />}
        </div>
      </>
    )
  );
};

export default Topbar;
