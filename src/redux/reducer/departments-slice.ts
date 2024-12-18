"use client";

import RestApi from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (payload, thunkAPI) => {
    try {
      const response = await new RestApi().get(
        `/department?page=${payload.page}&limit=${payload.limit}`
      );
      return response?.data.data;
    } catch (error) {
      console.error("Error occurred while fetching departments:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const saveDepartment = createAsyncThunk(
  "departments/saveDepartment",
  async (payload, thunkAPI) => {
    try {
      await new RestApi().post("/department", payload);
      return payload;
    } catch (error) {
      console.error("Error occurred while saving departments:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async (payload, thunkAPI) => {
    try {
      const response = await new RestApi().patch(
        `/department/${payload?._id}`,
        payload.data
      );
      return response?.data;
    } catch (error) {
      console.error("Error occurred while updating departments:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (payload, thunkAPI) => {
    try {
      await new RestApi().delete(`/department/${payload?._id}`);
      return payload;
    } catch (error) {
      console.error("Error occurred while deleting departments:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    departments: {
      docs: [],
      totalDocs: 0,
      limit: 0,
      totalPages: 0,
      page: 0,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(saveDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(saveDepartment.fulfilled, (state, action) => {
        // state.departments = state.departments.push(action.payload);
        state.loading = false;
      })
      .addCase(saveDepartment.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(deleteDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        // state.departments = state.departments.filter((departments: any) => {
        //   return departments._id !== action.payload._id;
        // });
        state.loading = false;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(updateDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        // state.departments = state.departments.map((departments: any) => {
        //   return departments._id === action.payload._id
        //     ? action.payload
        //     : departments;
        // });
        state.loading = false;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default departmentsSlice.reducer;
