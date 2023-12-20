import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios";

const api_url = import.meta.env.VITE_REACT_APP_URL

export const fetchMe = createAsyncThunk('me/fetchme', async () => {
    try{

        const response = await axios.get(`${api_url}/me`, { withCredentials: true }); // il n'y a rien à faire si le token est écrit

        return response.data;

    }catch(err){
       
        return {
            user : null,
            message : "Mince tu n'es pas connecté ! "
        }
    }
   
})

const initialState = {
    user : null,
    status: "idle",
    error : null,
    message : ""

  };

export const meSlice = createSlice({
    name: "me",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMe.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchMe.fulfilled, (state, action) => {
          state.status = "succeeded";
          const { user, message } =  action.payload ;
          state.message = message
          state.user = user
        })
        .addCase(fetchMe.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
          state.user =  null
        });
    },
  });
  