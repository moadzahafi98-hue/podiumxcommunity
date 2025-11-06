import { firestore } from '../utils/firebaseAdmin.js'

const feedCollection = firestore().collection('posts')

export const listPosts = async (req, res, next) => {
  try {
    const snapshot = await feedCollection.orderBy('createdAt', 'desc').limit(50).get()
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json({ posts })
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const { uid, email } = req.user
    const post = {
      ...req.body,
      author: { id: uid, name: req.body.authorName || email },
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString()
    }
    const docRef = await feedCollection.add(post)
    res.status(201).json({ post: { id: docRef.id, ...post } })
  } catch (error) {
    next(error)
  }
}
