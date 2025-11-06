import { Router } from 'express'
import { getChatMessages, sendMessage } from '../controllers/chatController.js'

const router = Router()

router.get('/:chatId', getChatMessages)
router.post('/send', sendMessage)

export default router
