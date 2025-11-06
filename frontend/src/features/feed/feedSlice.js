import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../utils/api'

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async (_, thunkAPI) => {
  try {
    const { data } = await apiClient.get('/feed')
    return data.posts
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load feed' })
  }
})

export const createPost = createAsyncThunk('feed/createPost', async (payload, thunkAPI) => {
  try {
    const { data } = await apiClient.post('/feed', payload)
    return data.post
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to create post' })
  }
})

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload)
      })
  }
})

export default feedSlice.reducer
