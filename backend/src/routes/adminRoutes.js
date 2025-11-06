import { Router } from 'express'
import { listUsers, listReports, getAnalytics, banUser, broadcastAnnouncement } from '../controllers/adminController.js'

const router = Router()

router.get('/users', listUsers)
router.get('/reports', listReports)
router.get('/analytics', getAnalytics)
router.post('/users/:id/ban', banUser)
router.post('/announce', broadcastAnnouncement)

export default router
