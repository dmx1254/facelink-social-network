import React, { useContext, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { AiTwotoneLike, AiOutlineHeart } from "react-icons/ai";
import { VscSmiley } from "react-icons/vsc";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import shopping from "../../assets/shopping.jpg";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../myContext/UidContext";
import { CircularProgress } from "@material-ui/core";
import {
  addingComment,
  deletePost,
  likePost,
  unlikePost,
  updatedPost,
} from "../../actions/postActions";
import { useEffect } from "react";
import { followUser, unFollowUser } from "../../actions/userActions";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
  const { users } = useSelector((state) => state.userReducer);
  const { user } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState(post.message);
  const [areatext, setAreatext] = useState("");
  const uid = useContext(UidContext);
  const [editToggle, setEditToggle] = useState(false);
  const [followToggle, setFollowToggle] = useState(false);
  const [settingToggle, setSettingToggle] = useState(false);
  const [focusOn, setFocusOn] = useState(false);
  const [afficheToggle, setAfficheToggle] = useState(false);
  const dispatch = useDispatch();

  const convertDate = (dateToConvert) => {
    const date = new Date(dateToConvert).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return date;
  };
  const nextConvertDate = (dateToConvert) => {
    const date = new Date(dateToConvert).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date;
  };

  const handleEditToggle = () => {
    setEditToggle((prevEditToggle) => !prevEditToggle);
  };

  const handleUpdateMessage = () => {
    const data = {
      message,
    };
    dispatch(updatedPost(post._id, data));
    setSettingToggle(false);
    setEditToggle(false);
  };

  useEffect(() => {
    if (user.following.length) {
      if (user.following.includes(post.posterId)) {
        setFollowToggle(true);
      } else {
        setFollowToggle(false);
      }
    }
  }, [user.following.length, user.following, post.posterId]);

  

  const handleAddLike = () => {
    const data = {
      idToLike: uid,
    };
    dispatch(likePost(post._id, data));
  };

  const handleRemoveLike = () => {
    const data = {
      idToUnlike: uid,
    };
    dispatch(unlikePost(post._id, data));
  };

  const handleFollowUser = () => {
    const data = {
      idToFollow: post.posterId,
    };
    dispatch(followUser(uid, data));
  };
  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  };

  const handleAffiche = async () => {
    await setAfficheToggle((prevAfficheToggle) => !prevAfficheToggle);
    await dispatch({ type: "AFFICHE", payload: { afficheToggle: true } });
  };
  const handleendAffiche = async () => {
    await setAfficheToggle((prevAfficheToggle) => !prevAfficheToggle);
    await dispatch({ type: "AFFICHE", payload: { afficheToggle: false } });
  };

  const handleUnfollowUser = () => {
    const data = {
      idToUnFollow: post.posterId,
    };

    dispatch(unFollowUser(uid, data));
  };
  const filterredPost = post.likers.filter(
    (ele, pos) => post.likers.indexOf(ele) === pos
  );

  const handleAddingComment = () => {
    const data = {
      commentId: user._id,
      commentPseudo: user.pseudo,
      text: areatext,
      commentPic: user.picture,
    };
    dispatch(addingComment(post._id, data));
  };

  const handleFocus = () => {
    setFocusOn((prevFocusOn) => !prevFocusOn);
  };
  const areaRef = useRef();
  focusOn && areaRef.current.focus();

  if (!post) return <CircularProgress />;
  return (
    <div className="post">
      <div className="post__first">
        <div>
          <img src={post && post.userPic} alt="user-profil" />

          <h4 className="nom">{post && post.posterPseudo}</h4>
          {followToggle ? (
            <span onClick={handleUnfollowUser}>
              <i className="fas fa-check-circle"></i>
            </span>
          ) : (
            <span
              className="suivre"
              style={{
                display: uid === post.posterId ? "none" : "block",
              }}
              onClick={handleFollowUser}
            >
              suivre
            </span>
          )}
        </div>

        <p className="date">{post && nextConvertDate(post.createdAt)}</p>
        {uid === post.posterId && (
          <span onClick={handleEditToggle} className="vertical">
            <BsThreeDotsVertical />
          </span>
        )}

        {settingToggle || (
          <div
            className="show"
            style={{
              display: editToggle ? "flex" : "none",
            }}
          >
            <h4
              className="edit__edit"
              onClick={() =>
                setSettingToggle((prevSettingState) => !prevSettingState)
              }
            >
              <span>
                <BiEdit className="editicon" />
              </span>
              <span>Editer</span>
            </h4>
            <h4>
              <span>
                <FaRegTrashAlt className="trashicon" />
              </span>
              <span onClick={handleDeletePost}>Supprimer</span>
            </h4>
            <h4>
              <button onClick={handleEditToggle}>Annuler</button>
            </h4>
          </div>
        )}
      </div>
      <div className="post__message">
        {settingToggle ? (
          <>
            <textarea
              className="settingarea"
              value={message}
              autoFocus
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <span className="valider" onClick={handleUpdateMessage}>
              Valider
            </span>
            <span className="annuler" onClick={() => setSettingToggle(false)}>
              Annuler
            </span>
          </>
        ) : (
          <p
            style={{
              fontSize: "0.85rem",
              color: "#222",
            }}
          >
            {message}
          </p>
        )}
      </div>
      {post.video ? (
        <div className="video">
          <iframe
            src={post.video}
            framerborder="0"
            allow="accelerometer; autoplay clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={post.video}
          ></iframe>
        </div>
      ) : post.picture ? (
        <div className="post__image">
          <img src={post.picture ? post.picture : shopping} alt="userpostPic" />
        </div>
      ) : null}

      <div className="post__tips">
        <div className="logo">
          <span className="logo1">
            {post && post.likers.includes(uid) ? (
              <span onClick={handleRemoveLike}>
                <FcLike />
              </span>
            ) : (
              <span onClick={handleAddLike}>
                <AiOutlineHeart />
              </span>
            )}
          </span>

          <span
            className="count"
            style={{
              display: post && filterredPost.length < 1 ? "none" : "block",
            }}
          >
            {post && filterredPost.length}
          </span>
        </div>
        <div className="post__comments">
          {post.comments.length ? (
            <span className="comment" onClick={handleAffiche}>
              {" "}
              afficher commentaires
            </span>
          ) : (
            <span onClick={handleFocus}>Ajouter un commentaire</span>
          )}
          <span className="valu">
            {post && post.comments.length ? post.comments.length : null}
          </span>
        </div>
        {afficheToggle || (
          <span
            className="publish"
            onClick={handleAddingComment}
            style={{
              opacity: areatext.length < 1 ? 0.4 : 1,
            }}
          >
            Publier
          </span>
        )}
      </div>
      {afficheToggle && (
        <div className="comments">
          <Comments handleendAffiche={handleendAffiche} post={post} />
        </div>
      )}
      <div className="area">
        <textarea
          value={areatext}
          onChange={(e) => setAreatext(e.target.value)}
          className="area__text"
          ref={areaRef}
          placeholder="Ajouter un commentaire..."
        ></textarea>
        <span className="smiley">
          <VscSmiley />
        </span>
      </div>
    </div>
  );
};

export default Post;
