import * as actionsTypes from "../constants/Constants";
import axios from "axios";

export const getUser = (uid) => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.GET_USER_REQUEST });

    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL_USER}/${uid}`,
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.GET_ONE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (uid, userData) => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.UPDATE_USER_REQUEST });

    const { data } = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL_USER}/${uid}`,
      withCredentials: true,
      data: userData,
    });

    dispatch({ type: actionsTypes.UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.GET_ALL_USERS_REQUEST });

    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL_USER}`,
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.GET_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (uid) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL_USER}/${uid}`,
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.DELETE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (uid, idToFollow) => async (dispacth) => {
  try {
    const { data } = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_USER}/addtofollow/${uid}`,
      withCredentials: true,
      data: idToFollow,
    });

    dispacth({ type: actionsTypes.FOLLOW_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = (uid, idToUnFollow) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_USER}/rmtofollow/${uid}`,
      withCredentials: true,
      data: idToUnFollow,
    });
    dispatch({ type: actionsTypes.UNFOLLOW_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
