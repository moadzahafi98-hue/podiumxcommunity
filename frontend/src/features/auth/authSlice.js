import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../utils/api'
import { firebaseAuth } from '../../utils/firebase'
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

const persistAuthState = (state) => {
  if (state?.token) {
    localStorage.setItem('podiumx-auth', JSON.stringify(state))
  } else {
    localStorage.removeItem('podiumx-auth')
  }
}

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const { data } = await authApi.post('/login', credentials)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Login failed' })
  }
})

export const signupUser = createAsyncThunk('auth/signupUser', async (payload, thunkAPI) => {
  try {
    const { data } = await authApi.post('/signup', payload)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Signup failed' })
  }
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await signOut(firebaseAuth)
})

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
  onboardingComplete: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload?.user || null
      state.token = action.payload?.token || null
      state.onboardingComplete = action.payload?.onboardingComplete ?? false
      persistAuthState({ user: state.user, token: state.token, onboardingComplete: state.onboardingComplete })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.onboardingComplete = action.payload.onboardingComplete
        persistAuthState({ user: state.user, token: state.token, onboardingComplete: state.onboardingComplete })
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Unable to login'
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.onboardingComplete = action.payload.onboardingComplete
        persistAuthState({ user: state.user, token: state.token, onboardingComplete: state.onboardingComplete })
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Unable to signup'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, initialState)
        persistAuthState(null)
      })
  }
})

export const initializeAuthListener = () => (dispatch) => {
  const stored = localStorage.getItem('podiumx-auth')
  if (stored) {
    const parsed = JSON.parse(stored)
    dispatch(authSlice.actions.setUser(parsed))
  }

  onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken()
      dispatch(
        authSlice.actions.setUser({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          },
          token,
          onboardingComplete: firebaseUser?.emailVerified
        })
      )
    }
  })
}

export const googleSignIn = () => signInWithPopup(firebaseAuth, new GoogleAuthProvider())
export const appleSignIn = () => {
  const provider = new OAuthProvider('apple.com')
  provider.addScope('email')
  provider.addScope('name')
  return signInWithPopup(firebaseAuth, provider)
}

export const triggerPasswordReset = (email) => sendPasswordResetEmail(firebaseAuth, email)

export const { setUser } = authSlice.actions

export default authSlice.reducer
