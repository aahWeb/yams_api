import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const api_url = import.meta.env.VITE_REACT_APP_API_URL

export const fetchLogin = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
  
    const response = await axios.post(`${api_url}/login`, credentials,  { withCredentials: true })

    if (response.statusText !== "OK") {
      const errorMessage = await response.statusText;
      throw new Error(errorMessage);
    }

    const data = response.data

    return data

  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchMe = createAsyncThunk('auth/me', async () => {
  const response = await axios.get(`${api_url}/api/me`, { withCredentials : true }); // il n'y a rien à faire si le token est écrit

  return response.data;
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    account : null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = 'succeeded';
        state.account = 'online'
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});