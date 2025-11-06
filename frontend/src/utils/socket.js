import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:8080', {
  autoConnect: false,
  transports: ['websocket'],
  withCredentials: true
})

export const connectSocket = (token) => {
  if (!socket.connected) {
    socket.auth = { token }
    socket.connect()
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}
