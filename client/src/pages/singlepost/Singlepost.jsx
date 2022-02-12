import React from "react";
import msypro from "../../assets/msypro.jpeg";
import food from "../../assets/food.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiTwotoneLike, AiOutlineHeart } from "react-icons/ai";
import { VscSmiley } from "react-icons/vsc";
import { useState } from "react";
import { Sidebar } from "../../components";
import FileBase from "react-file-base64";
import { useParams } from "react-router-dom";

const Singlepost = () => {
  const [editToggle, setEditToggle] = useState(false);
  const [settingToggle, setSettingToggle] = useState(false);
  const [areaContent, setAreaContent] = useState("");
  const [valeur, setValeur] = useState(0);
  const [picture, setPicture] = useState("");
  const [message, setMessage] = useState("Salut les amis je vous love.");

  const handleEditToggle = () => {
    setEditToggle((prevEditToggle) => !prevEditToggle);
  };
  const params = useParams();
  console.log(params.postId);

  return (
    <div className="singlepost__container">
      <div className="singlepost">
        <div className="post__first">
          <div>
            <img src={msypro} alt="msypro" />
            <h4 className="nom">Mouhamed</h4>
            <p className="date">21 janvier 2021 à 19h</p>
          </div>

          <span onClick={handleEditToggle}>
            <BsThreeDotsVertical />
          </span>
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
                <span>Supprimer</span>
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
              >
                {message}
              </textarea>
              <span className="valider" onClick={() => setSettingToggle(false)}>
                Valider
              </span>
              <span className="annuler" onClick={() => setSettingToggle(false)}>
                Annuler
              </span>
            </>
          ) : (
            <p>{message}</p>
          )}
        </div>
        <div className="post__image">
          {settingToggle ? (
            <div className="file__base">
              <FileBase
                type="file"
                multtiple={false}
                onDone={({ base64 }) => setPicture(base64)}
              />
            </div>
          ) : (
            <img src={food} alt="food" />
          )}
        </div>
        <div className="post__tips">
          <div className="logo">
            <span className="logo1" onClick={() => setValeur(valeur + 1)}>
              {valeur > 0 ? <FcLike /> : <AiOutlineHeart />}
            </span>
            {/* <span className="logo2">
            <FcLike />
          </span> */}
            <span
              className="count"
              style={{
                display: valeur < 1 ? "none" : "block",
              }}
            >
              {valeur}
            </span>
          </div>
          <div className="post__comments">
            <span className="comment">commentaires</span>
            <span className="valu">8</span>
          </div>
          <span
            className="publish"
            style={{
              opacity: areaContent.length < 1 ? 0.4 : 1,
            }}
          >
            Publier
          </span>
        </div>
        <div className="area">
          <textarea
            value={areaContent}
            onChange={(e) => setAreaContent(e.target.value)}
            className="area__text"
            placeholder="Ajouter un commentaire..."
          ></textarea>
          <span className="smiley">
            <VscSmiley />
          </span>
        </div>
      </div>
      <div className="singlepost__leftpart">
        <Sidebar />
      </div>
    </div>
  );
};

export default Singlepost;
