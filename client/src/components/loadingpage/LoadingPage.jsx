import { CircularProgress } from "@material-ui/core";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="loadingpage">
      <CircularProgress className="progress" />
    </div>
  );
};

export default LoadingPage;
