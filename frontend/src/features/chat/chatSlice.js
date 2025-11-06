import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../utils/api'
import { socket } from '../../utils/socket'

export const fetchChatMessages = createAsyncThunk('chat/fetchMessages', async (chatId, thunkAPI) => {
  try {
    const { data } = await apiClient.get(`/chat/${chatId}`)
    return { chatId, messages: data.messages }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to load messages' })
  }
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async (payload, thunkAPI) => {
  try {
    const { data } = await apiClient.post('/chat/send', payload)
    return data.message
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to send message' })
  }
})

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: {},
    activeChatId: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setActiveChat(state, action) {
      state.activeChatId = action.payload
    },
    receiveSocketMessage(state, action) {
      const { chatId, message } = action.payload
      if (!state.conversations[chatId]) {
        state.conversations[chatId] = []
      }
      state.conversations[chatId].push(message)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.conversations[action.payload.chatId] = action.payload.messages
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId } = action.payload
        if (!state.conversations[chatId]) {
          state.conversations[chatId] = []
        }
        state.conversations[chatId].push(action.payload)
      })
  }
})

let listenersRegistered = false

export const registerChatListeners = (dispatch) => {
  if (listenersRegistered) return
  socket.on('chat:message', (message) => {
    dispatch(chatSlice.actions.receiveSocketMessage(message))
  })
  listenersRegistered = true
}

export const { setActiveChat, receiveSocketMessage } = chatSlice.actions

export default chatSlice.reducer
