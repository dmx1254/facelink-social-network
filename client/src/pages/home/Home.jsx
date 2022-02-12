import React from "react";
import { useState } from "react";
import { Posts, Sidebar, SidebarRight } from "../../components";

const Home = () => {
  const [toggleVideo, setToggleVideo] = useState(false);

  const handleToggleVideo = () =>{
    setToggleVideo((prevState) => !prevState)
  }

  return (
    <div className="home">
      <Sidebar />
      <Posts toggleVideo={toggleVideo} handleToggleVideo={handleToggleVideo} />
      <SidebarRight />
    </div>
  );
};

export default Home;
