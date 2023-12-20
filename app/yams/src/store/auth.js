import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = import.meta.env.VITE_REACT_APP_URL

export const logout = createAsyncThunk('auth/fetchlogout', async () => {
  const response = await axios.get(`${url}/logout`, { withCredentials: true });

  return response.data
})

export const login = createAsyncThunk('auth/fetchLogin', async (credentials) => {
    const response = await axios.post(`${url}/login`, credentials, { withCredentials: true })

    return response.data
});

export const logoutSlice = createSlice({
  name: "auth/logout",
  initialState: {
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
      })
  }
})

export const loginSlice = createSlice({
  name: 'auth/login',
  initialState: {
    status: 'idle',
    loggedIn : false
  },
  reducers: {
    changeloggedIn : (state, action) => {
      state.loggedIn = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = action.payload 
      })
  },
});

export const { changeloggedIn } =  loginSlice.actions
