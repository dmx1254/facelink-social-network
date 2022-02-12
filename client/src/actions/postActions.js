import axios from "axios";
import * as actionsTypes from "../constants/Constants";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.GET_ALL_POSTS_REQUEST });

    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/api/post",
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.GET_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL_POST}/`,
      withCredentials: true,
      data: postData,
    });

    dispatch({ type: actionsTypes.CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPost = (uid, message) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL_POST}/${uid}`,
      withCredentials: true,
      data: message,
    });

    dispatch({ type: actionsTypes.UPDATE_SINGLE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (posterId, idToLike) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "patch",
      url: `http://localhost:5000/api/post/likepost/${posterId}`,
      withCredentials: true,
      data: idToLike,
    });
    dispatch({ type: actionsTypes.ADD_LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = (posterId, idToUnlike) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "patch",
      url: `http://localhost:5000/api/post/unlikepost/${posterId}`,
      withCredentials: true,
      data: idToUnlike,
    });

    dispatch({ type: actionsTypes.UNLIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (uid) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL_POST}/${uid}`,
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.DELETE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addingComment = (posterId, postData) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_POST}/addcomment/${posterId}`,
      withCredentials: true,
      data: postData,
    });

    dispatch({ type: actionsTypes.ADD_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editComments = (posterId, postData) => async (dispatch) => {
  const { data } = await axios({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL_POST}/editcomment/${posterId}`,
    withCredentials: true,
    data: postData,
  });
  dispatch({ type: actionsTypes.EDIT_COMMENT, payload: data });
};
