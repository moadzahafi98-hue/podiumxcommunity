import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../utils/api'

export const createCheckoutSession = createAsyncThunk('payments/createSession', async (payload, thunkAPI) => {
  try {
    const { data } = await apiClient.post('/payments/create-session', payload)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to start checkout' })
  }
})

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    status: 'idle',
    error: null,
    checkoutUrl: null,
    subscription: null
  },
  reducers: {
    setSubscription(state, action) {
      state.subscription = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.checkoutUrl = action.payload.url
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message
      })
  }
})

export const { setSubscription } = paymentSlice.actions

export default paymentSlice.reducer
