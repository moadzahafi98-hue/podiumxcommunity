import { Router } from 'express'
import { signup, login, socialLogin, verifyEmail, refreshToken } from '../controllers/authController.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/social', socialLogin)
router.post('/verify-email', verifyEmail)
router.post('/refresh', refreshToken)

export default router
