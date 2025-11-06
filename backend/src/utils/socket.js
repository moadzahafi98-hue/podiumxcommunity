import { firestore } from './firebaseAdmin.js'

export const registerSocketHandlers = (io) => {
  io.use((socket, next) => {
    const { token } = socket.handshake.auth
    if (!token) {
      return next(new Error('Unauthorized'))
    }
    socket.user = { token }
    next()
  })

  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id)

    socket.on('chat:send', async (payload) => {
      const { chatId, content, senderId } = payload
      const message = {
        chatId,
        content,
        senderId,
        sentAt: new Date().toISOString()
      }
      await firestore().collection('chats').doc(chatId).collection('messages').add(message)
      io.to(chatId).emit('chat:message', { chatId, message })
    })

    socket.on('chat:join', (chatId) => {
      socket.join(chatId)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id)
    })
  })
}
