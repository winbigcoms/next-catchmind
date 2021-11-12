import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }

  return combineReducers({ user })(state, action);
};

export default rootReducer;
