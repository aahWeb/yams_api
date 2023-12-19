import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = import.meta.env.VITE_REACT_APP_API_URL

export const fetchAllPastries = createAsyncThunk("pastries/fetchAllPastries", async () => {
  const response = await axios.get(`${api_url}/pastries`);
  await new Promise(r => setTimeout(r, 1000));

  return response.data;
});

const initialState = {
  pastries: [],
  status: "idle",
  error : null
};

export const pastriesSlice = createSlice({
  name: "pastries",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPastries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPastries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pastries = action.payload ;
      })
      .addCase(fetchAllPastries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
