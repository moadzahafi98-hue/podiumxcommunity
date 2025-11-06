import 'dotenv/config'
import { initializeFirebase, firestore } from '../src/utils/firebaseAdmin.js'

const seedUsers = [
  {
    id: 'user_1',
    email: 'athena@podiumx.com',
    name: 'Athena Strong',
    city: 'New York',
    fitnessLevel: 'advanced',
    interests: ['CrossFit', 'Strength', 'Mobility'],
    schedule: ['Morning', 'Evening'],
    stats: { workoutsCompleted: 42, sessionsJoined: 18 },
    xp: 4200,
    level: 'Pro'
  },
  {
    id: 'user_2',
    email: 'miles@podiumx.com',
    name: 'Miles Runner',
    city: 'New York',
    fitnessLevel: 'intermediate',
    interests: ['Running', 'Cardio'],
    schedule: ['Morning'],
    stats: { workoutsCompleted: 30, sessionsJoined: 12 },
    xp: 2800,
    level: 'Intermediate'
  },
  {
    id: 'user_3',
    email: 'zen@podiumx.com',
    name: 'Zen Flow',
    city: 'Boston',
    fitnessLevel: 'beginner',
    interests: ['Yoga', 'Mobility'],
    schedule: ['Evening'],
    stats: { workoutsCompleted: 12, sessionsJoined: 5 },
    xp: 900,
    level: 'Rookie'
  }
]

const seedEvents = [
  {
    title: 'Sunrise HIIT at PodiumX Manhattan',
    description: 'High intensity interval training to kickstart your day.',
    date: new Date().toISOString(),
    location: 'PodiumX Manhattan',
    host: { id: 'coach_1', name: 'Coach Riley' },
    capacity: 20,
    lat: 40.758,
    lng: -73.985,
    attendees: []
  },
  {
    title: 'Brooklyn Bridge Mobility Flow',
    description: 'Sunset mobility class focusing on hips and shoulders.',
    date: new Date(Date.now() + 86400000).toISOString(),
    location: 'Brooklyn Bridge Park',
    host: { id: 'coach_2', name: 'Coach Maya' },
    capacity: 15,
    lat: 40.7003,
    lng: -73.9967,
    attendees: []
  }
]

const seedPosts = [
  {
    content: 'Crushed a double session today! Who wants to join tomorrow?',
    author: { id: 'user_1', name: 'Athena Strong' },
    tag: 'motivation',
    likes: 18,
    comments: 5,
    shares: 2,
    createdAt: new Date().toISOString()
  },
  {
    content: 'Hydration reminder! 3L of water keeps the cramps away.',
    author: { id: 'user_2', name: 'Miles Runner' },
    tag: 'nutrition',
    likes: 9,
    comments: 2,
    shares: 1,
    createdAt: new Date().toISOString()
  }
]

const seedReports = [
  {
    reason: 'Inappropriate language in chat',
    reportedUser: { id: 'user_4', name: 'Spartan Mike' },
    reportedBy: { id: 'user_2', name: 'Miles Runner' },
    createdAt: new Date().toISOString()
  }
]

const runSeed = async () => {
  initializeFirebase()
  const db = firestore()

  const batch = db.batch()
  seedUsers.forEach((user) => {
    const ref = db.collection('users').doc(user.id)
    batch.set(ref, { ...user, onboardingComplete: true })
  })

  seedEvents.forEach((event) => {
    const ref = db.collection('events').doc()
    batch.set(ref, { ...event })
  })

  seedPosts.forEach((post) => {
    const ref = db.collection('posts').doc()
    batch.set(ref, post)
  })

  seedReports.forEach((report) => {
    const ref = db.collection('reports').doc()
    batch.set(ref, report)
  })

  await batch.commit()
  console.log('Seed data successfully written.')
}

runSeed().then(() => process.exit(0))
