import { firestore } from '../utils/firebaseAdmin.js'

const usersCollection = firestore().collection('users')

export const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params
    const doc = await usersCollection.doc(id).get()
    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ user: { id: doc.id, ...doc.data() } })
  } catch (error) {
    next(error)
  }
}

export const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params
    await usersCollection.doc(id).set(req.body, { merge: true })
    const doc = await usersCollection.doc(id).get()
    res.json({ user: { id: doc.id, ...doc.data() } })
  } catch (error) {
    next(error)
  }
}

export const completeOnboarding = async (req, res, next) => {
  try {
    const { uid } = req.user
    await usersCollection.doc(uid).set({ ...req.body, onboardingComplete: true }, { merge: true })
    res.json({ message: 'Onboarding complete' })
  } catch (error) {
    next(error)
  }
}
