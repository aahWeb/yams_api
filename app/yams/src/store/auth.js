import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = import.meta.env.VITE_REACT_APP_URL

export const fetchlogout = createAsyncThunk('auth/fetchlogout', async () => {
  const response = await axios.get(`${url}/logout`, { withCredentials: true });

  return response.data
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (credentials) => {
  try {

    const response = await axios.post(`${url}/login`, credentials, { withCredentials: true })

    if (response.statusText !== "OK") {
      const errorMessage = await response.statusText;
      throw new Error(errorMessage);
    }

    const data = response.data

    return data

  } catch (error) {
    // console.error(error)
  }
});

export const logoutSlice = createSlice({
  name: "auth/logout",
  initialState: {
    status: "idle",
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchlogout.fulfilled, (state, action) => {
        state.status = 'loading';
      })

  }
})

export const loginSlice = createSlice({
  name: 'auth/login',
  initialState: {
    status: 'idle',
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

