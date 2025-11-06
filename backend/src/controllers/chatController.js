import { firestore } from '../utils/firebaseAdmin.js'

const chatsCollection = firestore().collection('chats')

export const getChatMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params
    const snapshot = await chatsCollection.doc(chatId).collection('messages').orderBy('sentAt').get()
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json({ messages })
  } catch (error) {
    next(error)
  }
}

export const sendMessage = async (req, res, next) => {
  try {
    const { chatId, content } = req.body
    const { uid } = req.user
    const message = {
      chatId,
      content,
      senderId: uid,
      sentAt: new Date().toISOString(),
      isOwn: true
    }
    const docRef = await chatsCollection.doc(chatId).collection('messages').add(message)
    res.json({ message: { id: docRef.id, ...message } })
  } catch (error) {
    next(error)
  }
}
