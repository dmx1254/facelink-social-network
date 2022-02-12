import React from "react";
import { useSelector } from "react-redux";

const LoadingComment = () => {
  const { handleendAffiche } = useSelector((state) => state.toolReducer);
  console.log(handleendAffiche);
  return <div className="loadingcomment" onClick={handleendAffiche}></div>;
};

export default LoadingComment;
