import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import matchReducer from '../features/matches/matchSlice'
import chatReducer from '../features/chat/chatSlice'
import eventReducer from '../features/events/eventSlice'
import feedReducer from '../features/feed/feedSlice'
import paymentReducer from '../features/payments/paymentSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchReducer,
    chat: chatReducer,
    events: eventReducer,
    feed: feedReducer,
    payments: paymentReducer
  }
})

export default store
