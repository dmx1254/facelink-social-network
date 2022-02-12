import React from "react";

const Notif = ({ userNotif }) => {
  return (
    <div id="notif">
      <img src={userNotif.picture} alt="user notif" />
      <span id="pseudonotif">{userNotif.pseudo}</span>
      <span id="startF"> à commencé à vous suivre</span>
    </div>
  );
};

export default Notif;
