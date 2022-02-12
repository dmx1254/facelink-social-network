import * as actionsTypes from "../../constants/Constants";
const initialState = { users: [] };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case actionsTypes.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.GET_ONE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case actionsTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        myloading: true,
      };
    case actionsTypes.UPDATE_USER:
      return {
        ...state,
        user: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return {
              ...user,
              bio: action.payload.bio,
              picture: action.payload.picture,
              selectedFile: action.payload.selectedFile,
            };
          } else return user;
        }),
        myloading: false,
      };
    case actionsTypes.DELETE_USER:
      return {
        state,
        users: state.users.filter((user) => user._id !== action.payload._id),
      };

    case actionsTypes.ADD_LIKE_POST:
      return {
        ...state,
        users: state.users.map((user) => {
          if (action.payload.likers.includes(user._id)) {
            return {
              ...user,
              likes: [...user.likes, action.payload._id],
            };
          } else return user;
        }),
      };
    case actionsTypes.UNLIKE_POST:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return {
              ...user,
              likes: [...user.likes],
            };
          } else return user;
        }),
      };
    case actionsTypes.FOLLOW_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return {
              ...user,
              following: [
                ...user.following,
                action.payload.following[action.payload.following.length - 1],
              ],
            };
          } else return user;
        }),
      };

    case actionsTypes.UNFOLLOW_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return {
              ...user,
              following: [...action.payload.following],
            };
          } else return user;
        }),
      };
    case actionsTypes.EDIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if (action.payload.includes(comment._id)) {
                  return {
                    ...comment,
                  };
                } else return comment;
              }),
            };
          } else return post;
        }),
      };

    default:
      return state;
  }
};
