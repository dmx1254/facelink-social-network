import React, { useEffect, useRef } from "react";
import gift from "../../assets/gift.png";
import people from "../../assets/people.jpg";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { UidContext } from "../myContext/UidContext";
import { CircularProgress } from "@material-ui/core";

const SidebarRight = () => {
  const { users } = useSelector((state) => state.userReducer);
  const { user: userpseudo } = useSelector((state) => state.userReducer);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const uid = useContext(UidContext);
  let Sider = useRef();

  const handleScroll = () => {
    if (Sider.current) {
      const { scrollTop, scrollHeight, clientHeight } = Sider.current;
      if (scrollTop + clientHeight === scrollHeight) {
        Sider.current.style.position = "fixed";
        Sider.current.style.right = "20px";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="sidebarright" ref={Sider}>
      <div className="sidebarright__first">
        <img src={gift} alt="gift" />
        <span>
          <h1>Mark </h1> et <h1>3 autres amis </h1>
          fêtent leur anniversaire aujourd'hui.
        </span>
      </div>
      <div className="sidebarright__second">
        <img src={people} alt="people" />
        <h1>
          froid,
          <br />
          doux <br />& savoureux.
        </h1>
        <p>Explorer syCode</p>
      </div>
      <div className="sidebarright__last">
        <h1 className="friendsinline">Amis en ligne</h1>
        {users.length ? (
          users
            .filter((user) => user.pseudo !== userpseudo.pseudo)
            .map((user) => (
              <div key={user._id} className="lefttopbar__user">
                <img src={user.picture} alt="user" />
                <span>{user.pseudo}</span>
                <p></p>
              </div>
            ))
        ) : (
          <p>Pas d'amis en ligne pour le moment </p>
        )}
      </div>
    </div>
  );
};

export default SidebarRight;
