import admin from 'firebase-admin'

let initialized = false

export const initializeFirebase = () => {
  if (initialized) return admin

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

  initialized = true
  return admin
}

export const getAdmin = () => {
  if (!initialized) {
    initializeFirebase()
  }
  return admin
}

export const firestore = () => getAdmin().firestore()

export const auth = () => getAdmin().auth()

export const fieldValue = () => getAdmin().firestore.FieldValue
