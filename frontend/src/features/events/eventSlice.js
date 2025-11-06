import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../utils/api'

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, thunkAPI) => {
  try {
    const { data } = await apiClient.get('/events')
    return data.events
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load events' })
  }
})

export const createEvent = createAsyncThunk('events/createEvent', async (payload, thunkAPI) => {
  try {
    const { data } = await apiClient.post('/events', payload)
    return data.event
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to create event' })
  }
})

export const rsvpEvent = createAsyncThunk('events/rsvpEvent', async ({ eventId }, thunkAPI) => {
  try {
    const { data } = await apiClient.post(`/events/${eventId}/rsvp`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to RSVP' })
  }
})

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
  }
})

export default eventSlice.reducer
