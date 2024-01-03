import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

/** http://localhost:3001 */
const url = import.meta.env.VITE_REACT_APP_URL

/**
 * createAsyncThunk() permet l'ajout d'actions asynchrones dans nos slices en manipulant des Promise et leur états (pending, fulfilled, rejected).
 * On export directement logout qui est la fonction pour nous déconnecter.
 * 
 * https://redux.js.org/usage/writing-logic-thunks#using-createasyncthunk
 * https://dev.to/ifeanyichima/what-is-createasyncthunk-in-redux--mhe
 */
export const logout = createAsyncThunk('auth/fetchlogout', async () => {
  const response = await axios.get(`${url}/logout`, { withCredentials: true });

  return response.data
})

/**
 * withCredentials : true => envoie le cookie pour vérifier l'authentification
 */
export const login = createAsyncThunk('auth/fetchLogin', async (credentials) => {
    const response = await axios.post(`${url}/login`, credentials, { withCredentials: true })

    return response.data
});

// Création de notre slice logoutSlice pour les déconnection
export const logoutSlice = createSlice({
  name: "auth/logout",
  initialState: {
    status: "idle",
  },
  // Notre action asynchrone logout doit être défini dans "extraReducers" et non "reducers"
  // Ce qui nous permet d'adapter le state global en fonction de l'état de la Promise (ici quand la Promise est "fulfilled")
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
      })
  }
})

// Création de notre slice loginSlice pour les connections
export const loginSlice = createSlice({
  name: 'auth/login',
  initialState: {
    status: 'idle',
    loggedIn : false
  },
  reducers: {
    /**
     * state représente le state initial (initialState)
     * action.payload représente les arguments passés 
     * EXEMPLE avec la valeur "false" passé en argument:
     *  import { changeloggedIn } from 'store/auth'
     *  const dispatch = useDispatch()
     *  dispatch(changeloggedIn(false))
     */
    changeloggedIn : (state, action) => {
      state.loggedIn = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // dans le cas où dispatch(login()) returne une Promise "fulfilled"
      .addCase(login.fulfilled, (state, action) => {
        // alors changer le state "status" à succeeded
        state.status = 'succeeded';
        // et le state "loggedIn" à la valeur passé en argument dans login()
        state.loggedIn = action.payload 
      })
  },
});

// Export de notre action changeloggedIn défini dans le slice loginSlice
export const { changeloggedIn } =  loginSlice.actions
