import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { HeaderBottom, Post } from "..";

const Posts = ({ toggleVideo, handleToggleVideo }) => {
  const { posts, loading } = useSelector((state) => state.postReducer);

  if (loading) return <CircularProgress />;
  return (
    <div className="posts">
      <HeaderBottom
        toggleVideo={toggleVideo}
        handleToggleVideo={handleToggleVideo}
      />
      {posts && posts.length < 1 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        posts &&
        posts
          .filter((post) => (toggleVideo ? post.video : post))
          .map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
