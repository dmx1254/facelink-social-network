import React from "react";
import { BsFillCameraFill, BsPlus } from "react-icons/bs";
import { Publication } from "../../components";
import FileBase from "react-file-base64";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userlogo from "../../assets/user.png";
import { CircularProgress } from "@material-ui/core";
import {
  followUser,
  unFollowUser,
  updateUser,
} from "../../actions/userActions";
import { useContext } from "react";
import { UidContext } from "../../components/myContext/UidContext";

const Setting = () => {
  const { user } = useSelector((state) => state.userReducer);

  const [picture, setPicture] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [bio, setBio] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleFollowers, setToggleFollowers] = useState(false);
  const [abbChange, setAbbChange] = useState(false);
  const uid = useContext(UidContext);

  const dispatch = useDispatch();

  const handleToggleFollers = () => {
    setToggleFollowers((prevToggleFollowers) => !prevToggleFollowers);
  };

  const handleAbbChange = () => {
    setAbbChange((prevAbbChange) => !prevAbbChange);
  };

  const convertDate = (dateToConvert) => {
    const date = new Date(dateToConvert).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return date;
  };
  console.log(user);

  const handleUpdate = async () => {
    const data = {
      picture,
      selectedFile,
      bio,
    };
    if (user._id) await dispatch(updateUser(user._id, data));
    window.location = "/";
    setTimeout(() => {
      window.location = "/settings";
    }, 3000);
  };

  const handleWritePost = () => {
    setToggle((prevToggle) => !prevToggle);
    dispatch({ type: "TOGGLE", payload: { toggle: toggle } });
  };

  const { users } = useSelector((state) => state.userReducer);
  const { posts } = useSelector((state) => state.postReducer);
  const publiData = posts.filter((post) => post.posterId === uid);
  if (!user) return <CircularProgress />;
  return (
    <div className="setting">
      <div className="first">
        <span className="couvedit">
          <BsFillCameraFill />
        </span>
        <span className="filebasecouv">
          <FileBase
            type="file"
            id="fileinput"
            multiple={false}
            onDone={({ base64 }) => setSelectedFile(base64)}
          />
        </span>
        {!user ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <img
            className="couvert"
            src={user && user.selectedFile ? user.selectedFile : userlogo}
            alt="msypro"
          />
        )}

        {!user ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <img
            className="prof"
            src={user && user.picture ? user.picture : userlogo}
            alt="msypro"
          />
        )}

        <span className="filebaseprof">
          <FileBase
            type="file"
            id="prof"
            multiple={false}
            onDone={({ base64 }) => setPicture(base64)}
          />
        </span>
        <span className="profedit">
          <BsFillCameraFill />
        </span>
      </div>
      <div className="second">
        <div className="second__first">
          <label className="nom">{user && user.userName}</label>
          <p className="bio">{user && user.bio}</p>
          <label className="labs" htmlFor="pseudo">
            Pseudo
          </label>
          <input type="text" placeholder={user && user.pseudo} id="pseudo" />
          <label className="labs" htmlFor="email">
            Email
          </label>
          <input type="text" id="email" placeholder={user && user.email} />
          <div className="info__user">
            <p className="followers">
              <span className="numb">
                {user && user.followers ? (
                  user.followers.length
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </span>{" "}
              <span className="abb" onClick={handleAbbChange}>
                abonné{user.followers.length > 1 && "s"}
              </span>
            </p>
            <p className="following">
              <span className="numb">
                {user && user.following ? (
                  user.following.length
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </span>
              <span className="abb" onClick={handleToggleFollers}>
                Abonnement
              </span>
            </p>
          </div>
        </div>
        <div className="second__last">
          <textarea
            className="area"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            autoFocus
            placeholder="Dites nous quelques choses sur vous..."
          ></textarea>
          <p className="membre">
            {" "}
            Membre depuis le: {convertDate(user.createdAt)}
          </p>
          <button className="btn" onClick={handleUpdate}>
            Confirmer modifiactions
          </button>
        </div>
      </div>
      <div className="third">
        {publiData.length ? (
          <>
            <div className="pub">
              {publiData.map((publi) => (
                <Publication publi={publi} key={publi._id} />
              ))}
            </div>
          </>
        ) : (
          <div className="publi__length">
            Créer une{" "}
            <span
              style={{
                color: "#1877f2",
              }}
              onClick={handleWritePost}
            >
              {" "}
              publication{" "}
            </span>
          </div>
        )}
      </div>
      <div
        className="container"
        style={{
          display: toggleFollowers ? "block" : "none",
        }}
      >
        {users.map((userFollowed) => {
          if (userFollowed.followers.includes(user._id)) {
            return (
              <ul className="list__user-container">
                <div>
                  <img
                    className="list__user-img"
                    src={userFollowed && userFollowed.picture}
                    alt="user"
                  />
                  <li className="pseudo">
                    {userFollowed && userFollowed.pseudo}
                  </li>
                </div>
                <li
                  className="list__user-pseudo"
                  onClick={() => unFollowUser(uid, { idToUnFollow: user._id })}
                >
                  Abonné(e)
                </li>
              </ul>
            );
          }
        })}
      </div>
      <div
        className="container"
        style={{
          display: abbChange ? "block" : "none",
        }}
      >
        {users.map((userFollowed) => {
          for (let i = 0; i < user.followers.length; i++) {
            if (user.followers[i] === userFollowed._id)
              return (
                <ul className="list__user-container">
                  <div>
                    <img
                      className="list__user-img"
                      src={userFollowed && userFollowed.picture}
                      alt="user"
                    />
                    <li className="pseudo">
                      {userFollowed && userFollowed.pseudo}
                    </li>
                  </div>
                  <li
                    className="list__user-pseudo"
                    onClick={followUser(uid, { idToFollow: user._id })}
                  >
                    suivre
                  </li>
                </ul>
              );
          }
        })}
      </div>
    </div>
  );
};

export default Setting;
