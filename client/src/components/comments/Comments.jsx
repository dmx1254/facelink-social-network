import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { FcLike } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa";
import { VscSmiley } from "react-icons/vsc";
import { AiTwotoneLike, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UidContext } from "../myContext/UidContext";
import { addingComment, likePost, unlikePost } from "../../actions/postActions";
import SingleComment from "../singleComment/SingleComment";

const Comments = ({ post, handleendAffiche }) => {
  const [areaContent, setAreaContent] = useState("");
  const uid = useContext(UidContext);
  let data,
    setData = useState([]);
  const [focusOn, setFocusOn] = useState(false);
  const [followToggle, setFollowToggle] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  console.log(user);
  console.log(data);

  const handleAddLikers = () => {
    const data = {
      idToLike: uid,
    };
    dispatch(likePost(post._id, data));
  };

  const handleRemoveLikers = () => {
    const data = {
      idToUnlike: uid,
    };
    dispatch(unlikePost(post._id, data));
  };

  const handleFocus = () => {
    setFocusOn((prevFocusOn) => !prevFocusOn);
  };

  const handleAddComment = () => {
    const data = {
      commentId: user._id,
      commentPseudo: user.pseudo,
      text: areaContent,
      commentPic: user.picture,
    };
    dispatch(addingComment(post._id, data));
  };

  useEffect(() => {
    if (user) {
      if (user.following.includes(post.posterId)) {
        setFollowToggle(true);
      } else setFollowToggle(false);
    }
  }, [user, post.posterId, user.following]);

  const filterredPost = post.likers.filter(
    (ele, pos) => post.likers.indexOf(ele) === pos
  );

  const areaRef = useRef();
  focusOn && areaRef.current.focus();

  if (!post) return <CircularProgress />;
  return (
    <div className="comments__posts">
      <div className="post">
        {post.video ? (
          <iframe
            src={post.video}
            framerborder="0"
            allow="accelerometer; autoplay clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={post.video}
          ></iframe>
        ) : post.picture ? (
          <img src={post.picture} alt="post" />
        ) : null}
      </div>
      <div className="comments-post__com">
        <div className="comment__abb">
          <div>
            <img src={post.userPic} alt="pic" />
            <p>{post.posterPseudo}</p>
            {followToggle ? (
              <span id="abbone">Abonné(e)</span>
            ) : (
              <span id="suicom">Suivre</span>
            )}
            <span className="end" onClick={handleendAffiche}>
              <TiDelete />
            </span>
          </div>
          <span className="vertical">
            <BsThreeDotsVertical />
          </span>
        </div>
        {post.comments
          .sort((a, b) => a.commentDate - b.commentDate)
          .map((comment) => (
            <div className="comment">
              <SingleComment key={comment._id} comment={comment} post={post} />
            </div>
          ))}
        <div className="comment__add">
          <div className="comment__add-icons">
            {post && post.likers.includes(uid) ? (
              <span onClick={handleRemoveLikers} className="icon1">
                <FcLike />
              </span>
            ) : (
              <span onClick={handleAddLikers} className="icon1">
                <AiOutlineHeart />
              </span>
            )}
            <span className="icon2" onClick={handleFocus}>
              <FaRegComment />
            </span>
            <p
              className="counter"
              style={{
                display: filterredPost.length < 1 ? "none" : "block",
              }}
            >
              Aimé par <b>awa</b> et{" "}
              <b>
                {filterredPost.length > 1 ? filterredPost.length - 1 : null}
              </b>{" "}
              autres personnes
            </p>
          </div>
          <div className="area">
            <textarea
              value={areaContent}
              onChange={(e) => setAreaContent(e.target.value)}
              className="area__text"
              ref={areaRef}
              placeholder="Ajouter un commentaire..."
            ></textarea>
            <span className="smiley">
              <VscSmiley />
            </span>
            <span
              className="publi"
              onClick={handleAddComment}
              style={{
                opacity: areaContent.length ? 1 : "0.4",
              }}
            >
              Publier
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
