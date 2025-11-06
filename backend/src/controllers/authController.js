import bcrypt from 'bcryptjs'
import { firestore, auth } from '../utils/firebaseAdmin.js'
import { signToken } from '../utils/jwt.js'

const usersCollection = firestore().collection('users')

export const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body
    const existing = await usersCollection.where('email', '==', email).get()
    if (!existing.empty) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const userRecord = await auth().createUser({ email, password })
    await usersCollection.doc(userRecord.uid).set({
      email,
      name,
      password: hashed,
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
      stats: { workoutsCompleted: 0, sessionsJoined: 0 },
      xp: 0,
      level: 'Rookie'
    })

    const token = signToken({ uid: userRecord.uid, email })
    res.status(201).json({ user: { uid: userRecord.uid, email, name }, token, onboardingComplete: false })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const snapshot = await usersCollection.where('email', '==', email).limit(1).get()
    if (snapshot.empty) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const doc = snapshot.docs[0]
    const user = doc.data()
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = signToken({ uid: doc.id, email })
    res.json({ user: { uid: doc.id, email, name: user.name }, token, onboardingComplete: user.onboardingComplete })
  } catch (error) {
    next(error)
  }
}

export const socialLogin = async (req, res, next) => {
  try {
    const { providerToken } = req.body
    const decoded = await auth().verifyIdToken(providerToken)
    const doc = await usersCollection.doc(decoded.uid).get()
    if (!doc.exists) {
      await usersCollection.doc(decoded.uid).set({
        email: decoded.email,
        name: decoded.name || decoded.email?.split('@')[0],
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
        stats: { workoutsCompleted: 0, sessionsJoined: 0 },
        xp: 0,
        level: 'Rookie'
      })
    }
    const updated = await usersCollection.doc(decoded.uid).get()
    const user = updated.data()
    const token = signToken({ uid: decoded.uid, email: decoded.email })
    res.json({ user: { uid: decoded.uid, email: decoded.email, name: user.name }, token, onboardingComplete: user.onboardingComplete })
  } catch (error) {
    next(error)
  }
}

export const verifyEmail = async (req, res) => {
  res.json({ message: 'Verification email sent (mock)' })
}

export const refreshToken = async (req, res) => {
  const { uid, email } = req.body
  const token = signToken({ uid, email })
  res.json({ token })
}
