import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

const initialState = {
  id: 0,
  name: "",
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async ({ id, token }) => {
    const response = await api.get(`/users/${id}`, {
      headers: {
        authorization: `token ${token}`,
      },
    });
    return { id, name: response.data.name };
  }
);

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, { payload: userInfo }) => {
      return { ...state, ...userInfo };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.id = action.payload.id;
        state.name = action.payload.name;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
