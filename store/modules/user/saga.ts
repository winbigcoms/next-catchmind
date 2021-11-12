import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { API } from "src/service";
import { getUserRequest, getUserSuccess } from ".";
import { LoginResponse } from "./model";

function* getUserSaga(action: PayloadAction<string>) {
  const id = action.payload;

  try {
    const { imgFile, name, nickName }: LoginResponse = yield call(
      API.post,
      "http://localhost:8000/api/login",
      { name: id },
      undefined
    );
    yield put(
      getUserSuccess({
        name,
        nickName,
        img: imgFile,
      })
    );
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(getUserRequest.type, getUserSaga);
}
