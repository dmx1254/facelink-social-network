import { combineReducers } from "redux";
import { toolReducer } from "./toolReducer/toolReducer";
import { userReducer } from "./toolReducer/userReducer";
import { postReducer } from "./toolReducer/postReducer";

export default combineReducers({
  toolReducer,
  userReducer,
  postReducer,
});
