import { Router } from 'express'
import { getUserProfile, updateUserProfile, completeOnboarding } from '../controllers/userController.js'

const router = Router()

router.get('/:id', getUserProfile)
router.put('/:id', updateUserProfile)
router.post('/onboarding', completeOnboarding)

export default router
