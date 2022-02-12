import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneLike, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { VscTrash } from "react-icons/vsc";
import { FcLike } from "react-icons/fc";
import logo from "../../assets/msypro.jpeg";
import { useState } from "react";
import { useContext } from "react";
import { UidContext } from "../myContext/UidContext";
import { editComments } from "../../actions/postActions";

const SingleComment = ({ comment, post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [editCom, setEditCom] = useState(false);
  const [area, setArea] = useState(comment.text);
  const [areaToggle, setAreaToggle] = useState(false);
  const uid = useContext(UidContext);
  const user = useSelector((state) => state.userReducer);
  console.log(user);
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

  console.log(post);

  const handleEditComents = () => {
    const data = {
      commentId: comment._id,
      text: area,
    };
    dispatch(editComments(post._id, data));
    setAreaToggle(false);
  };

  const handleEditCom = () => {
    setEditCom((prevState) => !prevState);
  };

  const handleArea = () => {
    setAreaToggle((prevState) => !prevState);
  };

  return (
    <div className="singlecomment">
      <div className="user__section">
        <img src={comment.commentPic ? comment.commentPic : logo} alt="user" />
        <span className="pseudouser">{comment && comment.commentPseudo}</span>
        {areaToggle ? (
          <>
            <textarea
              autoFocus
              className="areaToggle"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            ></textarea>
            <span className="success" onClick={handleEditComents}>
              Valider
            </span>
          </>
        ) : (
          <span className="commentuser">{area}</span>
        )}
        <span
          style={{
            display: editCom ? "none" : "block",
          }}
          className="comment__icon"
          onClick={() => setLikeCount(likeCount + 1)}
        >
          {likeCount ? <FcLike /> : <AiOutlineHeart />}
        </span>
      </div>
      <div className="user__date">
        <span className="date">{convertDate(comment.commentDate)}</span>
        {uid === comment.commentId && (
          <span onClick={handleEditCom} className="three__dots">
            <BsThreeDots />
          </span>
        )}

        {editCom && (
          <div className="edit__com">
            <p className="edit__com-edit" onClick={handleArea}>
              <FiEdit />
            </p>
            <p className="edit__com-trash">
              <VscTrash />
            </p>
          </div>
        )}
        <span
          className="likes"
          style={{
            display: likeCount ? "block" : "none",
            opacity: editCom ? 0 : 1,
          }}
        >
          <b>{likeCount}</b> mention{likeCount > 1 && "s"} j'aime
          {likeCount > 1 && "s"}
        </span>
      </div>
    </div>
  );
};

export default SingleComment;
