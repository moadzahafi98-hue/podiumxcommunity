import { Router } from 'express'
import { listEvents, createEvent, rsvpEvent } from '../controllers/eventController.js'

const router = Router()

router.get('/', listEvents)
router.post('/', createEvent)
router.post('/:id/rsvp', rsvpEvent)

export default router
