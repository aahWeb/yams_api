import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios";

const api_url = import.meta.env.VITE_REACT_APP_URL

export const fetchMe = createAsyncThunk('me/fetchme', async () => {
    try{

        const response = await axios.get(`${api_url}/me`, { withCredentials: true }); // il n'y a rien à faire si le token est écrit

        return response.data;

    }catch(err){
      const user =  null

        return user
    }
   
})

export const meSlice = createSlice({
    name: "me",
    initialState : {
      user : null,
      status: "idle",
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMe.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload ;
        })
    },
  });
  