import { firestore, fieldValue } from '../utils/firebaseAdmin.js'

const eventsCollection = firestore().collection('events')

export const listEvents = async (req, res, next) => {
  try {
    const snapshot = await eventsCollection.orderBy('date', 'asc').limit(25).get()
    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json({ events })
  } catch (error) {
    next(error)
  }
}

export const createEvent = async (req, res, next) => {
  try {
    const { uid } = req.user
    const event = {
      ...req.body,
      host: { id: uid, name: req.body.hostName || 'PodiumX Coach' },
      attendees: [],
      createdAt: new Date().toISOString()
    }
    const docRef = await eventsCollection.add(event)
    res.status(201).json({ event: { id: docRef.id, ...event } })
  } catch (error) {
    next(error)
  }
}

export const rsvpEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { uid } = req.user
    await eventsCollection.doc(id).update({
      attendees: fieldValue().arrayUnion(uid)
    })
    res.json({ message: 'RSVP successful' })
  } catch (error) {
    next(error)
  }
}
