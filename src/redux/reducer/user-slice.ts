"use client";

import RestApi from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const response = await new RestApi().post("/auth/login", payload);
      Cookies.set("auth-token", response.token);
      return response?.data;
    } catch (error) {
      console.error("Error occurred during login:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (payload, thunkAPI) => {
    try {
      const response = await new RestApi().post("/auth/signup", payload);
      return response?.data;
    } catch (error) {
      console.error("Error occurred during signup:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
