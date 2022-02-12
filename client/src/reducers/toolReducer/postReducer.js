import * as actionsTypes from "../../constants/Constants";
const initialState = { posts: [] };

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_ALL_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionsTypes.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case actionsTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    case actionsTypes.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case actionsTypes.UPDATE_SINGLE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              message: action.payload.message,
            };
          } else return post;
        }),
      };
    case actionsTypes.ADD_LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              likers: [...post.likers, ...action.payload.likers],
            };
          } else return post;
        }),
      };
    case actionsTypes.UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              likers: [...action.payload.likers],
            };
          } else return post;
        }),
      };
    case actionsTypes.ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              comments: [
                action.payload.comments[action.payload.comments.length - 1],
                ...post.comments,
              ],
            };
          } else return post;
        }),
      };

    default:
      return state;
  }
};
