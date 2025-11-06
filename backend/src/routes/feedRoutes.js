import { Router } from 'express'
import { listPosts, createPost } from '../controllers/feedController.js'

const router = Router()

router.get('/', listPosts)
router.post('/', createPost)

export default router
