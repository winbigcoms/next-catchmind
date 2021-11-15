import { PayloadAction } from "@reduxjs/toolkit";
import { LoginUser, UserState } from "./model";

export const userReducer = {
  getUserRequest: {
    reducer: (state: UserState) => {
      state.loading = true;
    },
    prepare: (payload: string) => ({ payload }),
  },
  getUserSuccess: (state: UserState, action: PayloadAction<LoginUser>) => {
    state.name = action.payload.name;
    state.nickName = action.payload.nickName;
    state.img = action.payload.img;
    state.loading = false;
  },
  changeUserInfo: (state: UserState, action: PayloadAction<UserState>) => {
    state.name = action.payload.name;
    state.nickName = action.payload.nickName;
    state.img = action.payload.img;
  },
  logoutUser: (state: UserState, action: PayloadAction<LoginUser>) => {
    state.img = "";
    state.loading = false;
    state.name = "";
    state.nickName = "";
  },
};
