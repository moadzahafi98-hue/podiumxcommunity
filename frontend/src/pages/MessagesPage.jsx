import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChatMessages, sendMessage, setActiveChat, registerChatListeners } from '../features/chat/chatSlice'
import { connectSocket, socket } from '../utils/socket'

const MessagesPage = () => {
  const dispatch = useDispatch()
  const { matches } = useSelector((state) => state.matches)
  const { conversations, activeChatId } = useSelector((state) => state.chat)
  const { token, user } = useSelector((state) => state.auth)
  const [text, setText] = useState('')

  useEffect(() => {
    if (token) {
      connectSocket(token)
      registerChatListeners(dispatch)
    }
  }, [token, dispatch])

  const openChat = async (match) => {
    dispatch(setActiveChat(match.id))
    socket.emit('chat:join', match.id)
    await dispatch(fetchChatMessages(match.id))
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim() || !activeChatId) return
    await dispatch(
      sendMessage({
        chatId: activeChatId,
        content: text
      })
    )
    socket.emit('chat:send', { chatId: activeChatId, content: text, senderId: user?.uid })
    setText('')
  }

  const messages = activeChatId ? conversations[activeChatId] || [] : []

  return (
    <div className="grid md:grid-cols-3 gap-4 h-full">
      <aside className="bg-surface/80 rounded-3xl p-4 space-y-2">
        <h2 className="text-xl font-semibold mb-3">Chats</h2>
        {matches.map((match) => (
          <button
            key={match.id}
            onClick={() => openChat(match)}
            className={`w-full text-left px-4 py-2 rounded-2xl ${activeChatId === match.id ? 'bg-electric text-black' : 'bg-background/60'}`}
          >
            {match.name}
          </button>
        ))}
      </aside>
      <section className="md:col-span-2 bg-surface/80 rounded-3xl p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-xs ${message.isOwn ? 'bg-electric text-black' : 'bg-background/70'}`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-[10px] text-electric/80 mt-1">{message.sentAt}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={handleSend}>
          <input
            className="flex-1 px-4 py-2 rounded-2xl text-black"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Send a message"
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  )
}

export default MessagesPage
