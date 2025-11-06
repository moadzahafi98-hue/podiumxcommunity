import { firestore } from '../utils/firebaseAdmin.js'
import mailchimp from 'mailchimp-marketing'

const usersCollection = firestore().collection('users')
const reportsCollection = firestore().collection('reports')

if (process.env.MAILCHIMP_API_KEY) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_KEY.split('-')[1]
  })
}

export const listUsers = async (req, res, next) => {
  try {
    const snapshot = await usersCollection.limit(50).get()
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json({ users })
  } catch (error) {
    next(error)
  }
}

export const listReports = async (req, res, next) => {
  try {
    const snapshot = await reportsCollection.limit(50).get()
    const reports = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json({ reports })
  } catch (error) {
    next(error)
  }
}

export const getAnalytics = async (req, res) => {
  res.json({
    analytics: {
      dailyActiveUsers: 320,
      matchRate: 67,
      revenue: 12450
    }
  })
}

export const banUser = async (req, res, next) => {
  try {
    const { id } = req.params
    await usersCollection.doc(id).set({ status: 'banned' }, { merge: true })
    res.json({ message: 'User banned' })
  } catch (error) {
    next(error)
  }
}

export const broadcastAnnouncement = async (req, res, next) => {
  try {
    const { message } = req.body
    console.log('Broadcasting announcement', message)
    if (process.env.MAILCHIMP_API_KEY) {
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: `announcements+${Date.now()}@podiumx.com`,
        status: 'subscribed',
        merge_fields: {
          FNAME: 'PodiumX',
          LNAME: 'Announcement'
        }
      })
    }
    res.json({ message: 'Announcement sent' })
  } catch (error) {
    next(error)
  }
}
