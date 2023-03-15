import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../features/userInfo/userInfoSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
