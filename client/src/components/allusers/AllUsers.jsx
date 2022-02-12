import React, { useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userActions";
import { UidContext } from "../myContext/UidContext";

const AllUsers = ({ searchTerm }) => {
  const uid = useContext(UidContext);
  const [follow, setFollow] = useState(false);
  const [unfollow, setUnFollow] = useState(false);
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userReducer);
  const { user } = useSelector((state) => state.userReducer);

  const handleUserFollow = () => {
    const data = {
      idToFollow: user._id,
    };
    if (uid) {
      dispatch(followUser(uid, data));
    }
    setFollow(true);
  };
  const handleUserUnFollow = () => {
    const data = {
      idToUnFollow: user._id,
    };
    if (uid) {
      dispatch(unFollowUser(uid, data));
    }
    setUnFollow(true);
  };

  return (
    <div className="allusers">
      {users
        .filter((userSearch) => userSearch.pseudo !== user.pseudo)
        .filter((search) => search.pseudo.includes(searchTerm))
        .map((userSearch) => (
          <div className="all_users-mar">
            <div className="allusers_users">
              <img src={userSearch.picture} alt={userSearch.pseudo} />
              <span>{userSearch.pseudo}</span>
            </div>
            {userSearch.followers.includes(uid) ? (
              <p className="allusers_abb" onClick={handleUserUnFollow}>
                abonné(e)
              </p>
            ) : (
              <p className="allusers_pseudo" onClick={handleUserFollow}>
                suivre
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

export default AllUsers;
