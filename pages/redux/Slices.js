import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  bookData: [],
  user: null,
};
const fetchUser = createAsyncThunk("user/fetchUser", (token) => {
  return axios
    .post(`http://localhost:5000/api/user/loaduser/${token}`)
    .then((response) => response.data.user);
});
const fetchBooks = createAsyncThunk("user/fetchBooks", (uid) => {
  return axios
    .post(`http://localhost:5000/api/user/loaduser/${uid}`)
    .then((response) => response.data.books);
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.bookData = action.payload;
    });
  },
});
export default userSlice.reducer;
module.exports.userSlice = userSlice.actions;
