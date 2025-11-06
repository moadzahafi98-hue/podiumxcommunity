import { firestore } from '../utils/firebaseAdmin.js'
import { calculateMatchScore } from '../services/matchService.js'
import { suggestTrainingPartner } from '../services/aiService.js'

const usersCollection = firestore().collection('users')
const swipesCollection = firestore().collection('swipes')
const matchesCollection = firestore().collection('matches')

export const listMatches = async (req, res, next) => {
  try {
    const { uid } = req.user
    const userDoc = await usersCollection.doc(uid).get()
    const user = userDoc.data() || {}

    const candidatesSnapshot = await usersCollection.limit(20).get()
    const candidates = []
    for (const doc of candidatesSnapshot.docs) {
      if (doc.id === uid) continue
      const data = doc.data()
      const matchScore = calculateMatchScore(user, data)
      if (matchScore > 30) {
        candidates.push({ id: doc.id, ...data, matchScore })
      }
    }

    const matchesSnapshot = await matchesCollection.where('participants', 'array-contains', uid).get()
    const matches = []
    for (const doc of matchesSnapshot.docs) {
      const match = doc.data()
      const partnerId = match.participants.find((participant) => participant !== uid)
      if (partnerId) {
        const partnerDoc = await usersCollection.doc(partnerId).get()
        const partner = partnerDoc.data() || {}
        matches.push({
          id: doc.id,
          name: partner.name,
          city: partner.city,
          interests: partner.interests || [],
          matchScore: calculateMatchScore(user, partner),
          participants: match.participants
        })
      }
    }
    const aiSuggestion = await suggestTrainingPartner(user)

    res.json({ candidates, matches, suggestion: aiSuggestion })
  } catch (error) {
    next(error)
  }
}

export const swipe = async (req, res, next) => {
  try {
    const { uid } = req.user
    const { targetUserId, like } = req.body
    await swipesCollection.add({
      userId: uid,
      targetUserId,
      like,
      createdAt: new Date().toISOString()
    })

    if (like) {
      const reciprocal = await swipesCollection
        .where('userId', '==', targetUserId)
        .where('targetUserId', '==', uid)
        .where('like', '==', true)
        .get()
      if (!reciprocal.empty) {
        const matchDoc = await matchesCollection.add({
          participants: [uid, targetUserId],
          createdAt: new Date().toISOString()
        })
        res.json({ match: { id: matchDoc.id, participants: [uid, targetUserId] }, message: "It's a match!" })
        return
      }
    }
    res.json({ message: 'Swipe recorded' })
  } catch (error) {
    next(error)
  }
}

export const confirmMatch = async (req, res, next) => {
  try {
    const { uid } = req.user
    const { targetUserId } = req.body
    const matchDoc = await matchesCollection.add({ participants: [uid, targetUserId], createdAt: new Date().toISOString() })
    res.json({ match: { id: matchDoc.id, participants: [uid, targetUserId] } })
  } catch (error) {
    next(error)
  }
}
