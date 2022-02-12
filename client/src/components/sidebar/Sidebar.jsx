import React from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdRssFeed } from "react-icons/md";
import { RiVideoFill, RiCalendarEventFill } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { BsBookmarkFill } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UidContext } from "../myContext/UidContext";
import { CircularProgress } from "@material-ui/core";
import { followUser } from "../../actions/userActions";

const Sidebar = () => {
  const uid = useContext(UidContext);
  const { user } = useSelector((state) => state.userReducer);
  const { users } = useSelector((state) => state.userReducer);
  let sideBar = useRef();
  const dispatch = useDispatch();
  const handleScroll = () => {
    if (sideBar.current) {
      const { scrollTop, scrollHeight, clientHeight } = sideBar.current;
      if (scrollTop + clientHeight === scrollHeight) {
        sideBar.current.style.position = "fixed";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let stockUserNotFollowed = users.filter(
    (singleUser) => !user.following.includes(singleUser._id)
  );

  let filterSuggestSelft = stockUserNotFollowed.filter(
    (usernotSelf) => usernotSelf._id !== uid
  );
  // console.log(filterSuggestSelft);
  if (!users) return <CircularProgress />;
  return (
    <div className="sidebar" ref={sideBar}>
      <div className="sidebar__top">
        <div className="topsidebar__user">
          <span className="span__right">
            <MdRssFeed />
          </span>
          <span className="span__left">Messages</span>
        </div>
        <div className="topsidebar__user">
          <span className="span__right">
            <BsFillChatLeftTextFill />
          </span>
          <span className="span__left">Flux</span>
        </div>
        <div className="topsidebar__user">
          <span className="span__right">
            <RiVideoFill />
          </span>
          <span className="span__left">Videos</span>
        </div>
        <div className="topsidebar__user">
          <span className="span__right">
            <GrGroup />
          </span>
          <span className="span__left">Groupes</span>
        </div>

        <div className="topsidebar__user">
          <span className="span__right">
            <IoBagOutline />
          </span>
          <span className="span__left">Job</span>
        </div>
        <div className="topsidebar__user">
          <span className="span__right">
            <RiCalendarEventFill />
          </span>
          <span className="span__left">Evenements</span>
        </div>
        <div className="topsidebar__user">
          <span className="span__right">
            <GiGraduateCap />
          </span>
          <span className="span__left">Cours</span>
        </div>
        {users.length ? (
          <div className="topsidebar__user-buton">
            <button>Suggestions</button>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>

      <div className="sidebar__left">
        {filterSuggestSelft ? (
          filterSuggestSelft
            .filter((userSuggest) => userSuggest.pseudo !== user.pseudo)
            .map((userSuggest) => (
              <div key={userSuggest._id} className="lefttopbar__user">
                <div>
                  <img src={userSuggest.picture} alt={userSuggest.pseudo} />
                  <span>{userSuggest.pseudo}</span>
                </div>
                <span
                  className="follow"
                  onClick={() =>
                    dispatch(followUser(uid, { idToFollow: userSuggest._id }))
                  }
                >
                  Suivre
                </span>
              </div>
            ))
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
