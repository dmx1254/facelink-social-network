import React from "react";
import FileBase from "react-file-base64";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { BsX } from "react-icons/bs";
import { FcStart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UidContext } from "../../components/myContext/UidContext";
import { createPost } from "../../actions/postActions";

const Writepost = () => {
  const { toggle: myToggle } = useSelector((state) => state.toolReducer);
  const [picture, setPicture] = useState("");
  const [toggle, setToggle] = useState(false);
  const [videoToggle, setVideoToggle] = useState(false);
  const [video, setVideo] = useState("");
  const [videoEmbed, setVideoEmbed] = useState("");
  const [message, setMessage] = useState("");
  const area = useRef();
  const uid = useContext(UidContext);
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    myToggle && area.current.focus();
  }, [myToggle]);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch({ type: "ENDTOOGLE", payload: { toggle: toggle } });
  };

  useEffect(() => {
    const handleVideo = () => {
      if (
        video.includes("https://www.yout") ||
        video.includes("https://yout")
      ) {
        let embed = video.replace("watch?v=", "embed/");
        let newEmbed = embed.split("&")[0];
        setVideoEmbed(newEmbed);
      }
    };
    handleVideo();
  }, [video]);

  const handleCreatePost = () => {
    const data = {
      posterId: uid,
      posterPseudo: user.pseudo,
      userPic: user.picture,
      message,
      picture,
      video: videoEmbed,
    };

    dispatch(createPost(data));
    setVideoToggle(true);
  };

  useEffect(() => {
    if (videoToggle) {
      setMessage("");
      setVideo("");
      setPicture("");
    }
  }, [videoToggle]);

  return (
    <div className="writepost">
      <div className="writepost__first">
        <p>Créér une nouvelle publication</p>
        <span className="icon" onClick={handleToggle}>
          <BsX />
        </span>
      </div>
      <div className="post__content">
        <textarea
          className="post__section"
          placeholder="Publier un message..."
          ref={area}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <textarea
          placeholder="copier le lien du video..."
          className="videoarea"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        ></textarea>
      </div>
      <div className="filebase">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setPicture(base64)}
        />
      </div>

      <div className="btnpost" onClick={handleCreatePost}>
        <button className="btn__post">Publier</button>
      </div>
    </div>
  );
};

export default Writepost;
