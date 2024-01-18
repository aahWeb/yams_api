import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = import.meta.env.VITE_REACT_APP_API_URL

export const fetchAllPastries = createAsyncThunk("pastries/fetchAllPastries", async () => {
  const response = await axios.get(`${api_url}/pastries`, { withCredentials: true });
  await new Promise(r => setTimeout(r, 1000));

  return response.data;
});

const initialState = {
  pastries: [],
  status: "idle",
  error: null
};

export const pastriesSlice = createSlice({
  name: "pastries",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPastries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPastries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pastries = action.payload;
      })
      .addCase(fetchAllPastries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectPastriesStatus = (state) => state.pastries.status

// update
export const fetchUpdate = createAsyncThunk("pastries/fetchUpdate", async (id, credential) => {
  const response = await axios.put(`${api_url}/pastry/${id}`, credential, { withCredentials: true });
  await new Promise(r => setTimeout(r, 1000));

  return response.data;
});

// post
export const fetchPost = createAsyncThunk("pastries/fetchUpdate", async (credential) => {
  const response = await axios.post(`${api_url}/pastry`, credential, { withCredentials: true });

  return response.data;
});

export const fetchPostImage = createAsyncThunk("pastries/fetchUpdate", async (credential) => {
  const response = await axios.post(`${api_url}/pastry`, credential, { withCredentials: true });

  return response.data;
});

const initialStateUpdate = {
  pastry: null,
  status: "idle",
  error: null,
  id : null
};

export const updatePastrySlice = createSlice({
  name: "update",
  initialStateUpdate,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // update
      .addCase(fetchUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pastry = action.payload;
        state.id = action.payload?.id 
      })
      .addCase(fetchUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const postPastrySlice = createSlice({
  name: "post",
  initialState: { pastry : null , status : "idle", id : null },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // post
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pastry = action.payload;
        state.id = action.payload?.id;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});