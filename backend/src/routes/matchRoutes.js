import { Router } from 'express'
import { listMatches, swipe, confirmMatch } from '../controllers/matchController.js'

const router = Router()

router.get('/list', listMatches)
router.post('/swipe', swipe)
router.post('/confirm', confirmMatch)

export default router
