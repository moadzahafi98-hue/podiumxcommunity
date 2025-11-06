import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../utils/api'

export const fetchPotentialMatches = createAsyncThunk('matches/fetchPotential', async (_, thunkAPI) => {
  try {
    const { data } = await apiClient.get('/match/list')
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to load matches' })
  }
})

export const swipeUser = createAsyncThunk('matches/swipeUser', async (payload, thunkAPI) => {
  try {
    const { data } = await apiClient.post('/match/swipe', payload)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to swipe' })
  }
})

const matchSlice = createSlice({
  name: 'matches',
  initialState: {
    candidates: [],
    matches: [],
    suggestion: null,
    status: 'idle',
    error: null
  },
  reducers: {
    addMatch(state, action) {
      state.matches.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPotentialMatches.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPotentialMatches.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.candidates = action.payload.candidates
        state.matches = action.payload.matches
        state.suggestion = action.payload.suggestion
      })
      .addCase(fetchPotentialMatches.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message
      })
  }
})

export const { addMatch } = matchSlice.actions

export default matchSlice.reducer
