import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./modules/index";
import { userSaga } from "./modules/user/saga";

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([fork(userSaga)]);
}

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const warpper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export default warpper;
