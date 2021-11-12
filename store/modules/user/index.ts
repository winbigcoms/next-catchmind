import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./model";
import { userReducer } from "./reducer";

const initialState: UserState = {
  name: "",
  nickName: "",
  img: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducer,
});

export const { getUserRequest, getUserSuccess, changeUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
