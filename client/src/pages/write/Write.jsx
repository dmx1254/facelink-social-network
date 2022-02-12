import React from "react";
import { useSelector } from "react-redux";
import Writepost from "../witepost/Writepost";

const Write = () => {
  const { toggle } = useSelector((state) => state.toolReducer);
  return (
    <div
      className="write"
      style={{
        display: toggle ? "block" : "none",
      }}
    >
      <Writepost />
    </div>
  );
};

export default Write;
