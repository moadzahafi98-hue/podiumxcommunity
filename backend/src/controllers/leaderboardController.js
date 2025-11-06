import { firestore } from '../utils/firebaseAdmin.js'

const usersCollection = firestore().collection('users')

export const getLeaderboard = async (req, res, next) => {
  try {
    const snapshot = await usersCollection.orderBy('xp', 'desc').limit(10).get()
    const leaders = snapshot.docs.map((doc) => ({
      userId: doc.id,
      name: doc.data().name,
      points: doc.data().xp || 0
    }))
    res.json({ leaders })
  } catch (error) {
    next(error)
  }
}
